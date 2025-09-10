import { PersonServerSchema } from './people.schema';

it('rejects non-ISO created_at', () => {
  const bad = {
    id: 3,
    full_name: 'X',
    age: 1,
    role: 'admin',
    active: true,
    created_at: '01/09/2025',
  };
  expect(() => PersonServerSchema.parse(bad)).toThrow();
});
