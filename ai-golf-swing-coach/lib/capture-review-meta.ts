import { mediaSourceLabel, type MediaSourceKind } from "./media-source";
import type { SwingSession } from "./golf-data";

function mediaSourceLabelForKind(kind: MediaSourceKind) { return kind === "native-video" ? "Native video ready" : kind === "uploaded-preview" ? "Uploaded preview ready" : kind === "captured-preview" ? "Preview capture ready" : kind === "unresolved-video" ? "Playback unavailable" : "Media preview ready"; }

export function formatCaptureReviewMeta(input: { uri: string; club: string; duration: number; slowMotion: boolean }) { return `${mediaSourceLabel(input.uri)} · ${input.club} · ${input.duration}s${input.slowMotion ? " · Slow-mo" : ""}`; }
export function formatSavedCaptureMeta(session: Pick<SwingSession, "videoUri" | "captureMode" | "mediaSource" | "duration" | "slowMotion">) { const source = session.mediaSource ? mediaSourceLabelForKind(session.mediaSource) : session.videoUri ? mediaSourceLabel(session.videoUri) : session.captureMode === "native" ? "Native video ready" : "Preview capture"; return `${source} · ${session.duration}${session.slowMotion ? " · Slow-mo" : ""}`; }
export function formatShareSummary(input: { club: string; score: number; session: Pick<SwingSession, "videoUri" | "captureMode" | "mediaSource" | "duration" | "slowMotion"> }) { return `AI Golf Swing Coach · ${input.club} · Score ${input.score}/100 · ${formatSavedCaptureMeta(input.session)}`; }
