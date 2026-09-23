export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let value: ReturnType<T>;
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      value = fn(...args);
    }
    return value;
  }) as T;
}

export class AsyncOnce<T> {
  private promise?: Promise<T>;
  constructor(private readonly factory: () => Promise<T>) {}
  get(): Promise<T> {
    if (!this.promise) this.promise = this.factory();
    return this.promise;
  }
  reset() { this.promise = undefined; }
}
