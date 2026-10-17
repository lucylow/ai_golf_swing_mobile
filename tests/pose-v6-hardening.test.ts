import { describe, expect, it, vi } from 'vitest';
import { MediaPipePoseAdapter } from '../src/services/ml/pose-intelligence-v5/adapters/mediaPipeAdapter';
import { mapNativePoseResult } from '../src/services/ml/pose-intelligence-v5/adapters/nativePoseResultMapper';
import { PoseStreamBuffer } from '../src/services/ml/pose-intelligence-v5/pipeline/streamBuffer';
import { PoseSwingAnalyzer } from '../src/services/ml/pose-intelligence-v5/pipeline/analyzer';
import { DemoController } from '../src/services/demo-mode-v6/src/engine/controller';

const validLandmarks = Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.5, z: 0, visibility: 1, presence: 1 }));

describe('pose and demo error handling', () => {
  it('normalizes partial native results to 33 landmarks and marks invalid coordinates invisible', () => {
    const mapped = mapNativePoseResult({ landmarks: [{ x: Number.NaN, y: 0.2 }] });
    expect(mapped?.landmarks).toHaveLength(33);
    expect(mapped?.landmarks[0].visibility).toBe(0);
    expect(mapped?.landmarks[32].presence).toBe(0);
    expect(mapNativePoseResult(null)).toBeNull();
  });

  it('rejects invalid frame metadata and safely maps a partial MediaPipe result', async () => {
    const adapter = new MediaPipePoseAdapter();
    await adapter.initialize();
    await expect(adapter.infer({ landmarks: validLandmarks }, 0, 0, 0, 480)).resolves.toBeNull();
    const result = await adapter.infer({ landmarks: [{ x: 0.1, y: 0.2 }] }, 10, 1, 640, 480);
    expect(result?.landmarks).toHaveLength(33);
    expect(result?.landmarks[1].confidence).toBe(0);
    await adapter.dispose();
  });

  it('bounds pose history, rejects corrupt frames, and deep-copies snapshots', async () => {
    const adapter = new MediaPipePoseAdapter();
    await adapter.initialize();
    const frame = await adapter.infer({ landmarks: validLandmarks }, 10, 1, 640, 480);
    expect(frame).not.toBeNull();
    const buffer = new PoseStreamBuffer(1);
    expect(buffer.push(frame!)).toBe(true);
    expect(buffer.push({ ...frame!, timestampMs: Number.NaN })).toBe(false);
    const snapshot = buffer.snapshot();
    snapshot[0].landmarks[0].x = 99;
    expect(buffer.snapshot()[0].landmarks[0].x).not.toBe(99);
    expect(buffer.length).toBe(1);
    await adapter.dispose();
  });

  it('does not throw for null analyzer input and marks malformed frames as dropped', () => {
    const analyzer = new PoseSwingAnalyzer();
    const empty = analyzer.analyze(null as never, 'unknown');
    expect(empty.frames).toHaveLength(0);
    expect(empty.quality.usable).toBe(false);
    const result = analyzer.analyze([null] as never, 'invalid-view' as never);
    expect(result.frames).toHaveLength(0);
    expect(result.quality.reasons).toContain('Malformed pose frames were dropped before analysis');
    expect(result.signature.cameraView).toBe('unknown');
  });

  it('isolates subscriber exceptions and returns controlled errors for invalid demo actions', () => {
    const controller = new DemoController(73194);
    const observer = vi.fn();
    controller.subscribe(() => { throw new Error('test listener failure'); });
    controller.subscribe(observer);
    expect(controller.setActiveUser('missing-user')).toBe(false);
    expect(controller.setScenario({ id: 'missing' } as never)).toBe(false);
    const result = controller.simulate('success');
    expect(result).not.toBeNull();
    expect(observer).toHaveBeenCalled();
    expect(controller.subscriberErrorCount).toBeGreaterThan(0);
    expect(controller.simulate('failure')).toBeNull();
    expect(controller.snapshot.state.analysis).toBe('failed');
    expect(controller.snapshot.state.lastError).toContain('No live request');
  });
});
