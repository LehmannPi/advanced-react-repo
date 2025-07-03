import axios from 'axios';
import https from 'node:https';

// Define the API response shape
interface NationalizeResponse {
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
}

// Supported fetch methods
type FetchMethod = 'native' | 'axios' | 'https';

// Each method will query the API with a distinct name
const names: Record<FetchMethod, string> = {
  native: 'nathaniel',
  axios: 'elizabeth',
  https: 'michael',
};

// Map each method to its concrete fetch implementation
const fetchers: Record<FetchMethod, () => Promise<NationalizeResponse>> = {
  native: async () => {
    const res = await fetch(`https://api.nationalize.io/?name=${names.native}`);
    return res.json();
  },

  axios: async () => {
    const { data } = await axios.get<NationalizeResponse>(
      `https://api.nationalize.io/?name=${names.axios}`
    );
    return data;
  },

  https: () =>
    new Promise<NationalizeResponse>((resolve, reject) => {
      https
        .get(`https://api.nationalize.io/?name=${names.https}`, (res) => {
          let raw = '';
          res.on('data', (chunk) => (raw += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(raw));
            } catch (err) {
              reject(err);
            }
          });
        })
        .on('error', reject);
    }),
};

export default async function NationalizeFetchPage() {
  // Execute all fetchers concurrently
  const entries = await Promise.all(
    (Object.keys(fetchers) as FetchMethod[]).map(async (method) => ({
      method,
      name: names[method],
      data: await fetchers[method](),
    }))
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">
        Nationalize API – Multiple Fetch Approaches
      </h1>

      {entries.map(({ method, name, data }) => (
        <div key={method} className="border rounded p-4 space-y-2">
          <h2 className="text-xl font-medium capitalize">
            {method} (name: {name})
          </h2>
          <pre className="bg-gray-50 dark:bg-neutral-800/40 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
