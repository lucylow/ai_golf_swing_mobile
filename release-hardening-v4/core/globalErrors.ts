import { releaseLogger } from './logger';
import { toAppError } from './AppError';

let installed = false;
let previousErrorHandler: ((error: Error, isFatal?: boolean) => void) | undefined;

export function installGlobalErrorHandlers(): () => void {
  if (installed) return () => undefined;
  installed = true;
  const handlerApi = (globalThis as typeof globalThis & { ErrorUtils?: any }).ErrorUtils;
  if (handlerApi?.getGlobalHandler && handlerApi?.setGlobalHandler) {
    previousErrorHandler = handlerApi.getGlobalHandler();
    handlerApi.setGlobalHandler((error: Error, isFatal?: boolean) => {
      releaseLogger.error(toAppError(error, { severity: isFatal ? 'fatal' : 'error' }), { fatal: Boolean(isFatal) });
      previousErrorHandler?.(error, isFatal);
    });
  }
  return uninstallGlobalErrorHandlers;
}

export function uninstallGlobalErrorHandlers() {
  if (!installed) return;
  const handlerApi = (globalThis as typeof globalThis & { ErrorUtils?: any }).ErrorUtils;
  if (handlerApi?.setGlobalHandler && previousErrorHandler) handlerApi.setGlobalHandler(previousErrorHandler);
  previousErrorHandler = undefined;
  installed = false;
}
