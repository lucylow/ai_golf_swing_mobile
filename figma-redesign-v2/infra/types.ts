export type MetricTone = 'positive' | 'warning' | 'danger' | 'neutral' | 'info';
export type TrendDirection = 'up' | 'down' | 'flat';
export type Metric = { id: string; label: string; score: number; value: string; delta: string; direction: TrendDirection; tone: MetricTone; note: string; };
export type Session = { id: string; date: string; club: string; score: number; swings: number; focus: string; duration: string; quality: string; };
export type Drill = { id: string; title: string; focus: string; minutes: number; level: string; cue: string; steps: string[]; favorite?: boolean; };
export type Goal = { id: string; title: string; current: number; target: number; unit: string; due: string; color: MetricTone; };
export type FeedItem = { id: string; title: string; body: string; time: string; tone: MetricTone; unread?: boolean; };
export type NavCard = { id: string; title: string; subtitle: string; route: string; badge?: string; };
