import { peopleEmpty, peopleError, peopleHappy, peopleMalformed, peopleSlow } from './handlers';

export const scenarios = {
  happy: [peopleHappy],
  empty: [peopleEmpty],
  error: [peopleError],
  slow: [peopleSlow],
  malformed: [peopleMalformed],
};

export type ScenarioName = keyof typeof scenarios;
