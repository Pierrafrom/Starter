// Minimal MSW-compatible types to satisfy TypeScript in this project.
// These are intentionally minimal and can be expanded if needed.
export type MSWRestRequest = {
  // URL, params, headers etc. kept loose for tests
  url?: URL | string;
  params?: Record<string, string>;
  json?: () => unknown;
};

export type MSWResponseResolver = (...transformers: unknown[]) => unknown;

export type MSWRestContext = {
  json: (body: unknown) => unknown;
  status: (code: number) => unknown;
  delay: (ms: number) => unknown;
};
