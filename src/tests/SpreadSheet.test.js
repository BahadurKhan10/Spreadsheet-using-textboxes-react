import { render, screen, fireEvent } from '@testing-library/react';
import SpreadSheet from '../components/SpreadSheet';

describe('SpreadSheet component', () => {
    test('renders SpreadSheet component', () => {
      const data = [
        { "S.No": 1, Date: "2024-02-20", "Customer Name": "John", Country: "USA", "Phone number": "123456789", "Order Status": "Pending" }
      ];
      render(<SpreadSheet data={data} onDataChange={() => {}} />);
      const filterInput = screen.getByPlaceholderText('Filter');
      expect(filterInput).toBeInTheDocument();
    });
  

    test('renders SpreadSheet component with data', () => {
        const testData = [
          { "S.No": 1, Date: "2024-02-20", "Customer Name": "John Doe", Country: "USA", "Phone number": "1234567890", "Order Status": "Pending" }
        ];
        render(<SpreadSheet data={testData} onDataChange={() => {}} />);
        const filterInput = screen.getByPlaceholderText('Filter');
        expect(filterInput).toBeInTheDocument();
        const rowLabel = screen.getByText('S.No');
        expect(rowLabel).toBeInTheDocument();
        const rowData = screen.getByDisplayValue('John Doe');
        expect(rowData).toBeInTheDocument();
      });
      

});
