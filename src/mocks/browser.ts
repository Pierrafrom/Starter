import * as msw from 'msw';

// access setupWorker via namespace and cast to any to avoid type export mismatches
const setupWorker = (msw as unknown as { setupWorker: (...handlers: unknown[]) => unknown })
  .setupWorker;

import { scenarios } from './scenarios';

type MSWWorker = { start: (...args: unknown[]) => Promise<void> };

// Create a worker with default (happy) scenario handlers
const worker = setupWorker(...scenarios.happy) as MSWWorker;

export function startWorker() {
  return worker.start();
}

export default worker;
