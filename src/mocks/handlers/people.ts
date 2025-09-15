// src/mocks/handlers/people.ts
import { delay, HttpResponse, http } from 'msw';
import {
  peopleDatasetEmpty,
  peopleDatasetError,
  peopleDatasetHappy,
  peopleDatasetMalformed,
} from '../data/people/people.datasets';

const PEOPLE_URL = '/data/people.json';

export const peopleHappy = http.get(PEOPLE_URL, () =>
  HttpResponse.json(peopleDatasetHappy, { status: 200 }),
);

export const peopleEmpty = http.get(PEOPLE_URL, () =>
  HttpResponse.json(peopleDatasetEmpty, { status: 200 }),
);

export const peopleError = http.get(PEOPLE_URL, () =>
  HttpResponse.json(peopleDatasetError, { status: 500 }),
);

export const peopleSlow = http.get(PEOPLE_URL, async () => {
  await delay(1500); // en tests: vi.useFakeTimers() pour accélérer
  return HttpResponse.json(peopleDatasetHappy, { status: 200 });
});

export const peopleMalformed = http.get(PEOPLE_URL, () =>
  HttpResponse.json(peopleDatasetMalformed, { status: 200 }),
);
