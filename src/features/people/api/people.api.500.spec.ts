import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup/setupTests';

import { getPeople } from './people.api';

it('throws on HTTP 500', async () => {
  server.use(
    http.get('/data/people.json', () => HttpResponse.json({ ok: false }, { status: 500 })),
  );
  await expect(getPeople()).rejects.toThrow(/Fetch failed 500/);
});
