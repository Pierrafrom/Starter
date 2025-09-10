import type { Person, PersonServer } from '@/features/people/types/people.schema';
import { PersonSchema } from '@/features/people/types/people.schema';

const roleMap: Record<PersonServer['role'], Person['role']> = {
  admin: 'Admin',
  user: 'User',
  manager: 'Manager',
};

export function toPersonDomain(input: PersonServer): Person {
  const domain: Person = {
    id: input.id,
    name: input.full_name,
    age: input.age,
    role: roleMap[input.role],
    isActive: input.active,
    createdAt: new Date(input.created_at),
    score: input.score ?? null,
    tags: input.tags ?? [],
  };

  // Validate and return the domain object
  return PersonSchema.parse(domain);
}
