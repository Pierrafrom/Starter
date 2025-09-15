import { screen, waitFor } from '@testing-library/react';
import { useScenario } from '@/test/setup/setupTests';
import { renderWithProviders } from '@/test/setup/test-utils';
import { PeoplePage } from './PeoplePage';

it('shows Loading… then renders people', async () => {
  useScenario('happy');

  renderWithProviders(<PeoplePage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Alice Martin')).toBeInTheDocument();
  });
});
