import { toPersonDomain } from '@/features/people/adapters/people.adapter';
import type { Person } from '@/features/people/types/people.schema';
import { PeopleServerSchema } from '@/features/people/types/people.schema';
import { fetchJson } from '@/lib/fetcher';
import { parseOrThrow } from '@/lib/zod-helpers';

/** Get, validate and adapt server response to Person[] domain */
export async function getPeople(): Promise<Person[]> {
  const raw = await fetchJson<unknown>('/data/people.json');
  const serverPeople = parseOrThrow(PeopleServerSchema, raw, 'people.json');
  return serverPeople.map(toPersonDomain);
}
