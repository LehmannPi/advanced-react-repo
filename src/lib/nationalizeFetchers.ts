import axios from 'axios';
import https from 'node:https';
import { logPerformance, TimedResult } from '@/decorators/performance';

export interface NationalizeResponse {
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
}

export type FetchResult = TimedResult<NationalizeResponse>;

export class NativeFetcher {
  @logPerformance
  async fetch(name: string): Promise<FetchResult> {
    const res = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data: NationalizeResponse = await res.json();
    return { data, ms: 0 } as unknown as FetchResult; // ms will be overwritten by decorator
  }
}

export class AxiosFetcher {
  @logPerformance
  async fetch(name: string): Promise<FetchResult> {
    const { data } = await axios.get<NationalizeResponse>(
      `https://api.nationalize.io/?name=${name}`
    );
    return { data, ms: 0 } as unknown as FetchResult;
  }
}

export class HttpsFetcher {
  @logPerformance
  fetch(name: string): Promise<FetchResult> {
    return new Promise((resolve, reject) => {
      https
        .get(`https://api.nationalize.io/?name=${name}`, (res) => {
          let raw = '';
          res.on('data', (chunk) => (raw += chunk));
          res.on('end', () => {
            try {
              const data: NationalizeResponse = JSON.parse(raw);
              resolve({ data, ms: 0 } as unknown as FetchResult);
            } catch (err) {
              reject(err);
            }
          });
        })
        .on('error', reject);
    });
  }
}
