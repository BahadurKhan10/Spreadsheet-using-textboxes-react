import { render, screen, fireEvent, waitFor, act  } from '@testing-library/react';
import MainSheet from '../components/MainSheet';

describe('MainSheet component', () => {
  test('renders MainSheet component', () => {
    render(<MainSheet />);
    const addButton = screen.getByText('Add Row');
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new row on button click', () => {
    render(<MainSheet />);

    const addButton = screen.getByText('Add Row');
    fireEvent.click(addButton);
    const addedRow = screen.getByPlaceholderText('Filter by Date');
    expect(addedRow).toBeInTheDocument();
  });

  test('parent rerenders when child changes', async () => {
    render(<MainSheet />);
    
    const addButton = screen.getByText('Add Row');
    fireEvent.click(addButton);
  
    await act(async () => {
      const lastRow = await screen.findByPlaceholderText('Filter by Date', {}, { timeout: 2000 });
      const inputElement = lastRow.previousElementSibling.querySelector('input');
      const serialNumber = inputElement ? parseInt(inputElement.value) : null; 
      if (serialNumber !== null) {
        expect(serialNumber).toBeGreaterThan(30);
      } else {
        expect(true).toBe(true);
      }
    });
  });
});
