import {
  DemoAnalysisResult,
  DemoMetric,
  DemoPoseFrame,
  DemoSession,
  DemoSwing,
  DemoTone,
} from '../types';
import { clamp, round } from '../seed';

function isValidPoseFrame(frame: DemoPoseFrame): boolean {
  return Boolean(
    frame && Number.isFinite(frame.frame) && Number.isFinite(frame.timestampMs) &&
    Number.isFinite(frame.quality) && Array.isArray(frame.points) && frame.points.length > 0 &&
    frame.points.every((point) => point && Number.isFinite(point.x) && Number.isFinite(point.y) &&
      Number.isFinite(point.z) && Number.isFinite(point.confidence) && typeof point.visible === 'boolean'),
  );
}

function isValidMetric(metric: DemoMetric): boolean {
  return Boolean(
    metric && typeof metric.id === 'string' && metric.id.length > 0 &&
    typeof metric.label === 'string' && typeof metric.display === 'string' &&
    Number.isFinite(metric.value) && Number.isFinite(metric.score),
  );
}

export function poseQuality(frames: DemoPoseFrame[]): number {
  if (!Array.isArray(frames) || frames.length === 0) return 0;
  let qualityTotal = 0;
  let visibilityTotal = 0;
  let validFrames = 0;

  for (const frame of frames) {
    if (!frame || !Number.isFinite(frame.quality) || !Array.isArray(frame.points)) continue;
    const quality = clamp(frame.quality, 0, 1);
    const visible = frame.points.filter((point) => point?.visible === true).length;
    const visibility = frame.points.length ? visible / frame.points.length : 0;
    qualityTotal += quality;
    visibilityTotal += visibility;
    validFrames += 1;
  }

  if (!validFrames) return 0;
  return round(clamp(((qualityTotal / validFrames) * 0.6 + (visibilityTotal / validFrames) * 0.4) * 100, 0, 100), 1);
}

export function analyze(
  session: DemoSession,
  swing: DemoSwing,
  metrics: DemoMetric[],
  poses: DemoPoseFrame[],
  latency = 650,
): DemoAnalysisResult {
  if (!session || !swing) throw new Error('A session and swing are required for demo analysis');
  if (!Array.isArray(metrics) || metrics.length === 0) throw new Error('No demo metrics are available');
  if (!Array.isArray(poses) || poses.length === 0) throw new Error('No demo pose frames are available');

  const safeMetrics = metrics.filter(isValidMetric);
  const safePoses = poses.filter(isValidPoseFrame);
  if (!safeMetrics.length) throw new Error('Demo metrics are malformed');
  if (!safePoses.length) throw new Error('Demo pose frames are malformed');

  const metric = safeMetrics.find((item) => item.label === 'Club Path') ?? safeMetrics[0];
  if (!metric?.id) throw new Error('Demo metrics are malformed');

  const quality = poseQuality(safePoses);
  const title = typeof swing.primaryPattern === 'string' && swing.primaryPattern.length
    ? swing.primaryPattern.replace(/-/g, ' ')
    : 'swing pattern';
  const tone: DemoTone = quality > 86 ? 'warning' : 'info';
  const insight = {
    id: `derived-${swing.id}`,
    title,
    body: `The demo engine found a repeatable ${title} signal around transition and impact.`,
    confidence: round(clamp(quality / 100 * 0.9 + 0.08, 0, 0.99), 2),
    tone,
    evidence: [
      `Pose quality ${quality}%`,
      `Club path ${Number.isFinite(swing.clubPath) ? swing.clubPath : 0}°`,
      `Session score ${Number.isFinite(session.score) ? session.score : 0}`,
    ],
    action: typeof swing.coachCue === 'string' ? swing.coachCue : 'Review the swing and retry the demo analysis.',
    metricIds: [metric.id],
  };
  const safeLatency = Number.isFinite(latency) && latency >= 0 ? latency : 650;
  const poseIndex = Math.min(120, safePoses.length - 1);

  return {
    session,
    swing,
    metrics: safeMetrics,
    insight,
    pose: safePoses[poseIndex],
    processingMs: Math.max(250, Math.round(safeLatency + (100 - quality) * 11)),
    quality,
  };
}
