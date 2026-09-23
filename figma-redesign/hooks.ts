import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { HOME_TREND, SCORE_HISTORY } from "./data";

export function useWindowMetrics() {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => setWidth(window.width));
    return () => sub.remove();
  }, []);
  return useMemo(() => ({ width, isCompact: width < 375, horizontalPad: width < 375 ? 12 : 15 }), [width]);
}

export function useAnimatedToggle(initial = false) {
  const [value, setValue] = useState(initial);
  return { value, toggle: () => setValue((v) => !v), setValue };
}

export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  const running = useRef(false);
  useEffect(() => {
    if (!running.current) return;
    const id = setInterval(() => setRemaining((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [running.current]);
  return { remaining, progress: seconds ? 1 - remaining / seconds : 0, start: () => { running.current = true; setRemaining(seconds); }, stop: () => { running.current = false; } };
}

export function useScoreTrend(points = HOME_TREND) {
  return useMemo(() => {
    const values = points.map((p) => p.value);
    const current = values[values.length - 1] ?? 0;
    const previous = values[values.length - 2] ?? current;
    const delta = current - previous;
    const high = Math.max(...values, 0);
    const low = Math.min(...values, 0);
    return { points, current, previous, delta, high, low, range: Math.max(1, high - low) };
  }, [points]);
}

export function useMetricFilter() {
  const [query, setQuery] = useState("");
  const [tone, setTone] = useState<"ALL" | "GOOD" | "WATCH">("ALL");
  const filteredHistory = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCORE_HISTORY.filter((point) => !q || point.label.toLowerCase().includes(q));
  }, [query]);
  return { query, setQuery, tone, setTone, filteredHistory };
}
