import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup/setupTests';

import { getPeople } from './people.api';

it('returns [] for an empty dataset', async () => {
  server.use(http.get('/data/people.json', () => HttpResponse.json([])));
  const res = await getPeople();
  expect(res).toEqual([]);
});
