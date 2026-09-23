import { useEffect, useState } from 'react';
export function useCountdown(initial = 60) { const [seconds, setSeconds] = useState(initial); useEffect(() => { const id = setInterval(() => setSeconds(s => s <= 0 ? initial : s - 1), 1000); return () => clearInterval(id); }, [initial]); return seconds; }
