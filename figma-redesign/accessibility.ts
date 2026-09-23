export function scoreA11y(score: number, label = "swing score") { return `${label}, ${Math.round(score)} out of 100`; }
export function progressA11y(value: number, label = "progress") { return `${label}, ${Math.round(value)} percent`; }
export function toggleA11y(value: boolean, label: string) { return `${label}, ${value ? "on" : "off"}`; }
export function buttonA11y(label: string, hint?: string) { return hint ? `${label}. ${hint}` : label; }
