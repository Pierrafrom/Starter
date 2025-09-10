import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup/setupTests';
import { renderWithProviders } from '@/test/setup/test-utils';
import { screen, waitFor } from '@testing-library/react';

import { PeoplePage } from './PeoplePage';

it('shows Loading… then renders people', async () => {
  const dataset = [
    {
      id: 1,
      full_name: 'Alice',
      age: 28,
      role: 'admin',
      active: true,
      created_at: '2025-09-01T12:34:56Z',
    },
  ];
  server.use(http.get('/data/people.json', () => HttpResponse.json(dataset)));

  renderWithProviders(<PeoplePage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
