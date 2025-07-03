import { performance } from 'node:perf_hooks';

export interface TimedResult<T> {
  data: T;
  ms: number;
}

/**
 * Method decorator that measures async execution time and logs it.
 * It returns the original result wrapped with the elapsed time in ms.
 */
export function logPerformance(
  _target: unknown,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
) {
  const originalMethod = descriptor.value!;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();
    const data = await originalMethod.apply(this, args);
    const ms = performance.now() - start;
    console.log(`[Performance] ${propertyKey} executed in ${ms.toFixed(2)} ms`);
    return { data, ms } as TimedResult<any>;
  };
}
