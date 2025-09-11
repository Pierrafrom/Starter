import { useScenario } from '@/test/setup/setupTests';

import { getPeople } from './people.api';

it('throws on HTTP 500', async () => {
  useScenario('error');
  await expect(getPeople()).rejects.toThrow(/Fetch failed 500/);
});
