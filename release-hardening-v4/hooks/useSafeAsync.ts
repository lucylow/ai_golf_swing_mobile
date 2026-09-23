import { useCallback, useEffect, useRef, useState } from 'react';
import { AppError, toAppError } from '../core/AppError';
import { releaseLogger } from '../core/logger';

export function useSafeAsync<T>(operation: (signal: AbortSignal) => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{ data?: T; error?: AppError; loading: boolean }>({ loading: false });
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);
  const run = useCallback(async () => {
    const controller = new AbortController();
    if (mountedRef.current) setState((current) => ({ ...current, loading: true, error: undefined }));
    try {
      const data = await operation(controller.signal);
      if (mountedRef.current) setState({ data, loading: false });
      return data;
    } catch (error) {
      const appError = toAppError(error);
      releaseLogger.error(appError);
      if (mountedRef.current) setState((current) => ({ ...current, loading: false, error: appError }));
      throw appError;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { ...state, run };
}
