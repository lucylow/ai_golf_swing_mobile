import { safeFetch } from './safeFetch';
import { parseJson } from '../core/safeJson';
import { redactUrl } from '../core/redact';
import { releaseLogger } from '../core/logger';

export type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => Promise<string | undefined>;
};

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  private async url(path: string): Promise<string> {
    const base = this.options.baseUrl.replace(/\/$/, '');
    return `${base}/${path.replace(/^\//, '')}`;
  }

  async get<T>(path: string): Promise<T> {
    const url = await this.url(path);
    const token = await this.options.getToken?.();
    releaseLogger.debug('api get', { url: redactUrl(url) });
    const response = await safeFetch(url, { method: 'GET', headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return parseJson<T>(await response.text(), path);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const url = await this.url(path);
    const token = await this.options.getToken?.();
    const response = await safeFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });
    return parseJson<T>(await response.text(), path);
  }
}
