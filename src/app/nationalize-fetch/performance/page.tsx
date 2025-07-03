import {
  NativeFetcher,
  AxiosFetcher,
  HttpsFetcher,
  FetchResult,
} from '@/lib/nationalizeFetchers';

// Supported fetch methods
type FetchMethod = 'native' | 'axios' | 'https';

// Each method will query the API with a distinct name
const names: Record<FetchMethod, string> = {
  native: 'nathaniel',
  axios: 'elizabeth',
  https: 'michael',
};

export default async function NationalizePerformancePage() {
  const native = new NativeFetcher();
  const axiosF = new AxiosFetcher();
  const httpsF = new HttpsFetcher();

  const fetchers: Record<FetchMethod, (name: string) => Promise<FetchResult>> =
    {
      native: (name) => native.fetch(name),
      axios: (name) => axiosF.fetch(name),
      https: (name) => httpsF.fetch(name),
    };

  // Execute all fetchers concurrently
  const entries = await Promise.all(
    (Object.keys(fetchers) as FetchMethod[]).map(async (method) => {
      const { data, ms } = await fetchers[method](names[method]);
      return {
        method,
        name: names[method],
        data,
        ms: ms.toFixed(2),
      };
    })
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">
        Nationalize API – Fetch Approaches with Performance
      </h1>

      {entries.map(({ method, name, data, ms }) => (
        <div key={method} className="border rounded p-4 space-y-2">
          <h2 className="text-xl font-medium capitalize">
            {method} (name: {name}) – {ms} ms
          </h2>
          <pre className="bg-gray-50 dark:bg-neutral-800/40 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
