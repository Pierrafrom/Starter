import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';

// empty default server; each test will .use(...) its own handlers
export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
