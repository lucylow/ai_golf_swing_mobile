import AVFoundation

final class AIGolfCaptureV10 {
    enum CaptureError: Error { case noCamera; case noSupportedFormat; case configurationFailed(Error) }

    struct Preference {
        let targetFPS: Double
        let targetWidth: Int32
        let targetHeight: Int32
        let preferHEVC: Bool
    }

    func selectHighFPSFormat(device: AVCaptureDevice, preference: Preference) throws -> AVCaptureDevice.Format {
        var candidates: [(AVCaptureDevice.Format, Double, Int)] = []
        for format in device.formats {
            let desc = format.formatDescription
            let dims = CMVideoFormatDescriptionGetDimensions(desc)
            guard dims.width >= preference.targetWidth || dims.height >= preference.targetHeight else { continue }
            for range in format.videoSupportedFrameRateRanges where range.maxFrameRate >= preference.targetFPS {
                let resolutionPenalty = abs(Int(dims.width) - Int(preference.targetWidth)) + abs(Int(dims.height) - Int(preference.targetHeight))
                let fpsPenalty = abs(range.maxFrameRate - preference.targetFPS) * 10
                candidates.append((format, fpsPenalty, resolutionPenalty))
            }
        }
        guard let selected = candidates.sorted(by: { ($0.1 + Double($0.2) / 1000) < ($1.1 + Double($1.2) / 1000) }).first?.0 else {
            throw CaptureError.noSupportedFormat
        }
        return selected
    }

    func configure(device: AVCaptureDevice, preference: Preference) throws {
        let format = try selectHighFPSFormat(device: device, preference: preference)
        do {
            try device.lockForConfiguration()
            defer { device.unlockForConfiguration() }
            device.activeFormat = format
            let range = format.videoSupportedFrameRateRanges.max(by: { $0.maxFrameRate < $1.maxFrameRate })
            let fps = min(preference.targetFPS, range?.maxFrameRate ?? preference.targetFPS)
            let duration = CMTimeMake(value: 1, timescale: CMTimeScale(max(1, Int32(round(fps)))))
            device.activeVideoMinFrameDuration = duration
            device.activeVideoMaxFrameDuration = duration
            if device.isExposureModeSupported(.locked) {
                let frameDurationSeconds = 1.0 / max(fps, 1.0)
                let shutter = CMTimeMakeWithSeconds(min(frameDurationSeconds * 0.5, 1.0 / 2000.0), preferredTimescale: 1_000_000)
                if device.isExposureModeSupported(.custom) {
                    let iso = min(max(device.activeFormat.minISO, device.iso), device.activeFormat.maxISO)
                    device.setExposureModeCustom(duration: shutter, iso: iso, completionHandler: nil)
                }
            }
        } catch {
            throw CaptureError.configurationFailed(error)
        }
    }
}
