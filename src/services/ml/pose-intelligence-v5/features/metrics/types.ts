import { PoseFrame } from '../../types/landmarks';

export type SwingFeatureContext = {
  frames: PoseFrame[];
  sequenceConfidence: number;
  metricValues: Record<string, number>;
  metricConfidence: Record<string, number>;
};
