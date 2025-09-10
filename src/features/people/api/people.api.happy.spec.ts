import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup/setupTests';

import { getPeople } from './people.api';

it('returns domain Person[] with mapped fields', async () => {
  const dataset = [
    {
      id: 1,
      full_name: 'Alice',
      age: 28,
      role: 'admin',
      active: true,
      created_at: '2025-09-01T12:34:56Z',
      score: 92.5,
      tags: ['a'],
    },
  ];
  server.use(http.get('/data/people.json', () => HttpResponse.json(dataset)));
  const res = await getPeople();
  expect(res[0]).toMatchObject({ name: 'Alice', role: 'Admin', isActive: true });
  expect(res[0]?.createdAt instanceof Date).toBe(true);
});
