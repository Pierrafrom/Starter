import type { PersonServer } from '@/features/people/types/people.schema';
import { toPersonDomain } from './people.adapter';

describe('toPersonDomain (adapter)', () => {
  it('maps all fields and converts date/role', () => {
    const input: PersonServer = {
      id: 1,
      full_name: 'Alice',
      age: 28,
      role: 'admin',
      active: true,
      created_at: '2025-09-01T12:34:56Z',
      score: 92.5,
      tags: ['a'],
    };
    const out = toPersonDomain(input);
    expect(out).toMatchObject({
      id: 1,
      name: 'Alice',
      age: 28,
      role: 'Admin',
      isActive: true,
      score: 92.5,
      tags: ['a'],
    });
    expect(out.createdAt instanceof Date).toBe(true);
  });

  it('applies defaults (score null, tags []) when missing', () => {
    const input = {
      id: 2,
      full_name: 'Bob',
      age: 30,
      role: 'user',
      active: false,
      created_at: '2025-09-01T00:00:00Z',
    } as unknown as PersonServer;
    const out = toPersonDomain(input);
    expect(out.score).toBeNull();
    expect(out.tags).toEqual([]);
  });
});
