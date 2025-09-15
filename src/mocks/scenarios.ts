// src/mocks/scenarios.ts
import { peopleEmpty, peopleError, peopleHappy, peopleMalformed, peopleSlow } from './handlers';

export const scenarios = {
  happy: [peopleHappy],
  empty: [peopleEmpty],
  error: [peopleError],
  slow: [peopleSlow],
  malformed: [peopleMalformed],
} as const;

export type ScenarioName = keyof typeof scenarios;
