import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from '@/mocks/server';

// server is created in src/mocks/server.ts (empty by default)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  vi.useRealTimers();
});
afterAll(() => server.close());

// re-export helper and server for convenience
export { server, useScenario } from '@/mocks/server';
