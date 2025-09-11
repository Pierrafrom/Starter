import * as msw from 'msw';
import {
  peopleDatasetEmpty,
  peopleDatasetError,
  peopleDatasetHappy,
  peopleDatasetMalformed,
} from '../data/people/people.datasets';
// Handlers for the /data/people.json endpoint
export const peopleHappy = msw.http.get('/data/people.json', () => {
  return msw.HttpResponse.json(peopleDatasetHappy, { status: 200 });
});

export const peopleEmpty = msw.http.get('/data/people.json', () =>
  msw.HttpResponse.json(peopleDatasetEmpty),
);

export const peopleError = msw.http.get('/data/people.json', () =>
  msw.HttpResponse.json(peopleDatasetError, { status: 500 }),
);

export const peopleSlow = msw.http.get('/data/people.json', async () => {
  await new Promise((r) => setTimeout(r, 2000));
  return msw.HttpResponse.json(peopleDatasetHappy, { status: 200 });
});

export const peopleMalformed = msw.http.get('/data/people.json', () =>
  msw.HttpResponse.json(peopleDatasetMalformed, { status: 200 }),
);
