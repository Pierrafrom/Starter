import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Person } from '@/features/people/types/people.schema';
import { getPeople } from './people.api';

export const PEOPLE_QK = ['people'] as const;

export function usePeopleQuery(): UseQueryResult<Person[], Error> {
  return useQuery({
    queryKey: PEOPLE_QK,
    queryFn: getPeople,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
