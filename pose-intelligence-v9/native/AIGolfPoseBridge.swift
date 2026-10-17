import Foundation

/// Native bridge contract. The concrete MediaPipe Tasks dependency is intentionally
/// injected by the iOS project so this source layer remains runtime-agnostic.
public struct AIGolfPosePoint {
    public let x: Float
    public let y: Float
    public let z: Float
    public let visibility: Float
    public let presence: Float
}

public struct AIGolfPosePacket {
    public let timestampMs: Int64
    public let width: Int
    public let height: Int
    public let landmarks: [AIGolfPosePoint]
}

public protocol AIGolfPoseEngine {
    func start() throws
    func submit(pixelBuffer: Any, timestampMs: Int64) throws
    func stop()
}

/// Adapter boundary for MediaPipe Pose Landmarker live-stream mode.
/// MediaPipe's live stream API is asynchronous; the host bridge should keep timestamps
/// monotonic and may drop frames under load while preserving the latest usable output.
public final class AIGolfPoseBridge {
    public init() {}
}

