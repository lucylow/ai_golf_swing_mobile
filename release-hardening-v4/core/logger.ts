import { redact } from './redact';
import { toAppError } from './AppError';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogEvent = {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: unknown;
};

const isProduction = process.env.EXPO_PUBLIC_ENVIRONMENT === 'production';

class ReleaseLogger {
  private sink?: (event: LogEvent) => void;
  private breadcrumbs: LogEvent[] = [];

  setSink(sink: (event: LogEvent) => void): () => void {
    this.sink = sink;
    return () => {
      this.sink = undefined;
    };
  }

  private write(level: LogLevel, message: string, context?: unknown) {
    const event: LogEvent = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: redact(context),
    };
    this.breadcrumbs = [...this.breadcrumbs.slice(-49), event];
    this.sink?.(event);
    if (!isProduction || level === 'error') {
      const payload = event.context === undefined ? '' : event.context;
      if (level === 'error') console.error(`[release] ${message}`, payload);
      else if (level === 'warn') console.warn(`[release] ${message}`, payload);
      else if (level === 'info') console.info(`[release] ${message}`, payload);
      else console.debug(`[release] ${message}`, payload);
    }
  }

  debug(message: string, context?: unknown) { this.write('debug', message, context); }
  info(message: string, context?: unknown) { this.write('info', message, context); }
  warn(message: string, context?: unknown) { this.write('warn', message, context); }
  error(error: unknown, context?: unknown) {
    const appError = toAppError(error);
    const safeContext = context && typeof context === 'object' ? context : {};
    this.write('error', appError.message, { ...safeContext, code: appError.code, cause: appError.causeValue });
  }
  getBreadcrumbs() { return [...this.breadcrumbs]; }
}

export const releaseLogger = new ReleaseLogger();
