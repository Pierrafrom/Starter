import '@testing-library/jest-dom/vitest';
import { server } from '@/mocks/server';

// server is created in src/mocks/server.ts (empty by default)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// re-export helper and server for tests
export { server, useScenario } from '@/mocks/server';
