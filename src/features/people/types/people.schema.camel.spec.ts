import { PersonServerSchema } from './people.schema';

it('accepts camelCase and normalizes to snake_case server shape', () => {
  const data = {
    id: 2,
    name: 'Bob',
    age: 30,
    role: 'User',
    isActive: true,
    createdAt: '2025-09-01T12:00:00Z',
  };
  const parsed = PersonServerSchema.parse(data);
  expect(parsed.full_name).toBe('Bob');
  expect(parsed.role).toBe('user');
  expect(parsed.active).toBe(true);
  expect(parsed.created_at).toBe('2025-09-01T12:00:00Z');
});
