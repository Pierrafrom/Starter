import { useScenario } from '@/test/setup/setupTests';
import { getPeople } from './people.api';

it('returns domain Person[] with mapped fields', async () => {
  // use the predefined happy scenario (which returns a dataset including Alice)
  useScenario('happy');
  const res = await getPeople();
  expect(res[0]).toMatchObject({ name: 'Alice Martin', role: 'Admin', isActive: true });
  expect(res[0]?.createdAt instanceof Date).toBe(true);
});
