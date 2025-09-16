import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';

import '@/styles/index.css';
import { App } from './App';

// start MSW worker in dev for local mocking
if (import.meta.env.DEV) {
  // dynamic import to avoid loading worker in test/node environment
  import('@/mocks/browser').then((m) => m.startWorker());
}

const el = document.getElementById('root');
if (!el) throw new Error("Missing <div id='root' /> in index.html");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, refetchOnWindowFocus: false },
  },
});

createRoot(el).render(
  <QueryClientProvider client={queryClient}>
    <App />
    {import.meta.env.DEV ? <ReactQueryDevtools buttonPosition="bottom-right" /> : null}
  </QueryClientProvider>,
);
