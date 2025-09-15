import { setupWorker } from 'msw/browser';
import { scenarios } from './scenarios';

export const worker = setupWorker(...scenarios.happy);

export function startWorker() {
  return worker.start({ onUnhandledRequest: 'bypass' });
}

export default worker;
