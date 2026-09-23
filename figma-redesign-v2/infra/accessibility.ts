export const pressLabel = (label: string, action = 'Open') => `${action} ${label}`;
export const valueLabel = (label: string, value: string, delta?: string) => `${label}: ${value}${delta ? `, ${delta}` : ''}`;
export const statusLabel = (tone: string) => ({ positive: 'On target', warning: 'Needs attention', danger: 'Priority fix', info: 'Informational', neutral: 'Neutral' }[tone] || tone);
