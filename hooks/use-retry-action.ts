import { useCallback, useEffect, useRef, useState } from "react";
import { createSafeRetryAction, isCurrentRetryGeneration, type RetryAction } from "@/lib/retry-action";

export function useRetryAction() {
  const [retryAction, setRetryActionState] = useState<RetryAction>(null);
  const isActiveRef = useRef(true);
  const generationRef = useRef(0);

  useEffect(() => () => {
    isActiveRef.current = false;
    generationRef.current += 1;
    setRetryActionState(null);
  }, []);

  const setRetryAction = useCallback((action: RetryAction) => {
    if (!isActiveRef.current) return;
    generationRef.current += 1;
    const generation = generationRef.current;
    setRetryActionState(() => createSafeRetryAction(action, () => isCurrentRetryGeneration(generation, generationRef.current, isActiveRef.current)));
  }, []);

  const clearRetryAction = useCallback(() => {
    generationRef.current += 1;
    setRetryActionState(null);
  }, []);

  return { retryAction, setRetryAction, clearRetryAction };
}
