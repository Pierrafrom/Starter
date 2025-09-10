import { PersonServerSchema } from './people.schema';

it('accepts snake_case and keeps normalized snake shape', () => {
  const data = {
    id: 1,
    full_name: 'Alice',
    age: 28,
    role: 'admin',
    active: true,
    created_at: '2025-09-01T12:34:56Z',
    score: null,
    tags: [],
  };
  const parsed = PersonServerSchema.parse(data);
  expect(parsed.full_name).toBe('Alice');
  expect(parsed.role).toBe('admin');
  expect(parsed.active).toBe(true);
  expect(parsed.created_at).toBe('2025-09-01T12:34:56Z');
});
