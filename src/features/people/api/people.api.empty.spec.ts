import { useScenario } from '@/test/setup/setupTests';

import { getPeople } from './people.api';

it('returns [] for an empty dataset', async () => {
  useScenario('empty');
  const res = await getPeople();
  expect(res).toEqual([]);
});
