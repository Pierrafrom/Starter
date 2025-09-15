import { setupServer } from 'msw/node';
import { type ScenarioName, scenarios } from './scenarios';

// default server with no handlers; tests can call use() with scenario handlers
export const server = setupServer();

// helper to apply a named scenario
export function useScenario(name: ScenarioName) {
  const handlers = scenarios[name] || [];
  server.use(...handlers);
}

export default server;
