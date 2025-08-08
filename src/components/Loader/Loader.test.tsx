
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
  it('renders with proper ARIA attributes', () => {
    render(<Loader />);
    
    // Check if the container has proper ARIA attributes
    const container = screen.getByRole('status');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Loading content');

    // Check if the progress element exists and has proper attributes
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-valuetext', 'Loading...');
  });
});
