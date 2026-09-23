import { analyzeLocalSwing, PoseLandmark } from "./golf-domain";

export type SwingPhases = { start: number; end: number; address: number; top: number; impact: number; finish: number };
export type AnalysisFault = { type: string; confidence: number; severity: "low" | "medium" | "high"; description: string };
export type DrillRecommendation = { id: string; title: string; description: string; difficulty: "beginner" | "intermediate" | "advanced"; steps: string[] };
export type SimilarityScore = { proId: string; proName: string; overall: number; metrics: Record<string, number> };

const point = (frame: PoseLandmark[], index: number): PoseLandmark => frame[index] ?? { x: 0, y: 0, z: 0, visibility: 0 };
const distance = (a: PoseLandmark, b: PoseLandmark) => Math.hypot(a.x - b.x, a.y - b.y);
const lineAngle = (a: PoseLandmark, b: PoseLandmark) => Math.abs(Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI));
const jointAngle = (a: PoseLandmark, b: PoseLandmark, c: PoseLandmark) => {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const denominator = Math.hypot(ab.x, ab.y) * Math.hypot(cb.x, cb.y);
  if (!denominator) return 0;
  return Math.acos(Math.min(1, Math.max(-1, (ab.x * cb.x + ab.y * cb.y) / denominator))) * (180 / Math.PI);
};

export function detectSwingPhases(frames: PoseLandmark[][]): SwingPhases {
  const total = frames.length;
  if (total < 5) return { start: 0, end: Math.max(0, total - 1), address: 0, top: Math.floor(total / 3), impact: Math.floor((total * 2) / 3), finish: Math.max(0, total - 1) };
  const velocities = frames.map((frame, index) => index === 0 ? 0 : distance(point(frame, 15), point(frames[index - 1], 15)));
  const threshold = 0.02;
  const start = Math.max(0, velocities.findIndex((velocity, index) => index > 0 && velocity > threshold && velocities[index - 1] <= threshold));
  const end = Math.max(start, [...velocities].reverse().findIndex((velocity, reverseIndex) => velocity > threshold && velocities[total - reverseIndex] <= threshold) >= 0 ? total - 1 : total - 1);
  const range = Math.max(1, end - start);
  return { start, end, address: start, top: start + Math.floor(range * 0.3), impact: start + Math.floor(range * 0.6), finish: end };
}

export function calculateGolfMetrics(frames: PoseLandmark[][]) {
  if (!frames.length) throw new Error("No frames provided for metric calculation.");
  const phases = detectSwingPhases(frames);
  const address = frames[phases.address];
  const top = frames[phases.top];
  const impact = frames[phases.impact];
  const confidence = Math.min(0.98, 0.72 + frames.length / 1000);
  const metric = (value: number, status: "good" | "moderate" | "needs-improvement") => ({ value: Number(value.toFixed(2)), confidence, status });
  const hipRotation = lineAngle(point(impact, 23), point(impact, 24));
  const shoulderRotation = lineAngle(point(impact, 11), point(impact, 12));
  const spineAngle = lineAngle({ ...point(address, 11), x: (point(address, 11).x + point(address, 12).x) / 2 }, { ...point(address, 23), x: (point(address, 23).x + point(address, 24).x) / 2 });
  const kneeFlex = jointAngle(point(address, 23), point(address, 25), point(address, 27));
  const speed = distance(point(impact, 16), point(frames[Math.max(0, phases.impact - 1)], 16)) * 1000;
  const plane = lineAngle(point(top, 12), point(top, 16));
  const tempo = (phases.top - phases.address) / Math.max(1, phases.impact - phases.top);
  const headMovement = distance(point(address, 0), point(impact, 0));
  return {
    hipRotation: metric(hipRotation, hipRotation < 30 ? "good" : hipRotation < 45 ? "moderate" : "needs-improvement"),
    shoulderRotation: metric(shoulderRotation, shoulderRotation < 25 ? "good" : shoulderRotation < 40 ? "moderate" : "needs-improvement"),
    spineAngle: metric(spineAngle, spineAngle < 15 ? "good" : spineAngle < 25 ? "moderate" : "needs-improvement"),
    kneeFlex: metric(kneeFlex, kneeFlex > 130 ? "good" : kneeFlex > 110 ? "moderate" : "needs-improvement"),
    clubHeadSpeed: metric(speed, speed > 80 ? "good" : speed > 60 ? "moderate" : "needs-improvement"),
    swingPlane: metric(plane, plane > 45 && plane < 60 ? "good" : plane > 35 && plane < 70 ? "moderate" : "needs-improvement"),
    tempo: metric(tempo, tempo > 1.5 && tempo < 2.5 ? "good" : tempo > 1.2 && tempo < 3 ? "moderate" : "needs-improvement"),
    headMovement: metric(headMovement, headMovement < 0.05 ? "good" : headMovement < 0.1 ? "moderate" : "needs-improvement"),
  };
}

export function detectGolfFaults(metrics: ReturnType<typeof calculateGolfMetrics>): AnalysisFault[] {
  const faults: AnalysisFault[] = [];
  if (metrics.hipRotation.value > 40 && metrics.spineAngle.value > 20) faults.push({ type: "Early Extension", confidence: 0.7, severity: "medium", description: "Hips move toward the ball too early, costing posture and space." });
  if (metrics.shoulderRotation.value > 35) faults.push({ type: "Over-the-Top", confidence: 0.6, severity: "medium", description: "Shoulders rotate too steeply, encouraging an outside-in path." });
  if (metrics.clubHeadSpeed.value < 60 && metrics.shoulderRotation.value > 30) faults.push({ type: "Casting", confidence: 0.65, severity: "high", description: "The release starts too early, reducing power and control." });
  if (metrics.headMovement.value > 0.08) faults.push({ type: "Swaying", confidence: 0.8, severity: "low", description: "Lateral movement during the backswing reduces consistency." });
  if (metrics.tempo.value < 1.2 || metrics.tempo.value > 3) faults.push({ type: "Poor Tempo", confidence: 0.75, severity: "medium", description: "The backswing-to-downswing ratio is outside a repeatable rhythm." });
  return faults;
}

const drillLibrary: Record<string, DrillRecommendation> = {
  "Early Extension": { id: "drill-early-extension", title: "Hip Stability Drill", description: "Keep your hips back through impact.", difficulty: "intermediate", steps: ["Place a chair lightly behind your glutes.", "Maintain contact through impact.", "Swing slowly and rotate without moving toward the ball."] },
  "Over-the-Top": { id: "drill-over-the-top", title: "Inside-Out Swing Path", description: "Promote an inside-out delivery.", difficulty: "intermediate", steps: ["Place a headcover inside the target line.", "Swing outside the headcover.", "Keep the club moving from the inside."] },
  Casting: { id: "drill-casting", title: "Lag Drill", description: "Hold wrist angle longer in transition.", difficulty: "advanced", steps: ["Pause briefly at the top.", "Fire the hips first.", "Let the wrists release late."] },
  Swaying: { id: "drill-swaying", title: "Stability Drill", description: "Reduce lateral movement.", difficulty: "beginner", steps: ["Set a stick outside your trail foot.", "Swing without touching it.", "Keep your head centered."] },
  "Poor Tempo": { id: "drill-tempo", title: "Tempo Training", description: "Develop a repeatable rhythm.", difficulty: "beginner", steps: ["Use a steady metronome.", "Count through the backswing and downswing.", "Practice without a ball first."] },
};

export function recommendGolfDrills(faults: AnalysisFault[]) { return faults.map((fault) => drillLibrary[fault.type]).filter(Boolean).filter((drill, index, list) => list.findIndex((item) => item.id === drill.id) === index); }

const proTemplates: Record<string, { name: string; vector: Record<string, number> }> = { tiger_woods: { name: "Tiger Woods", vector: { hipRotation: 25, shoulderRotation: 20, spineAngle: 18, clubHeadSpeed: 85, tempo: 2 } }, n_elly_korda: { name: "Nelly Korda", vector: { hipRotation: 23, shoulderRotation: 19, spineAngle: 17, clubHeadSpeed: 78, tempo: 2.1 } } };
export function compareToPro(metrics: Record<string, { value: number }>, proId: string): SimilarityScore { const pro = proTemplates[proId]; if (!pro) throw new Error(`Pro template ${proId} not found.`); const similarities: Record<string, number> = {}; let total = 0; let count = 0; Object.entries(pro.vector).forEach(([key, target]) => { const value = metrics[key]?.value; if (typeof value !== "number") return; const score = Math.max(0, Math.min(1, 1 - Math.abs(value - target) / Math.max(value, target, 1))); similarities[key] = Number(score.toFixed(3)); total += score; count += 1; }); return { proId, proName: pro.name, overall: count ? Number((total / count).toFixed(3)) : 0, metrics: similarities }; }

export async function analyzeSwing(frames: PoseLandmark[][], proId?: string) { const metrics = calculateGolfMetrics(frames); const faults = detectGolfFaults(metrics); const drills = recommendGolfDrills(faults); return { phases: detectSwingPhases(frames), metrics, faults, drills, comparison: proId ? compareToPro(metrics, proId) : undefined, localSummary: analyzeLocalSwing(frames) }; }
