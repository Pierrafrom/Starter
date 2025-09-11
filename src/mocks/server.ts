import { setupServer } from 'msw/node';
import { scenarios } from './scenarios';

// default server with no handlers; tests can call use() with scenario handlers
export const server = setupServer();

// helper to apply a named scenario
export function useScenario(name: keyof typeof scenarios) {
  const handlers = scenarios[name] || [];
  server.use(...handlers);
}

export default server;
