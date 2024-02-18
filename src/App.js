import logo from './logo.svg';
import './App.css';
import SpreadSheet from './components/SpreadSheet';
import MainSheet from './components/MainSheet';

const data = [
  {
    "S.No": 1,
    "Date": "2024-02-17",
    "Customer Name": "John Doe",
    "Country": "USA",
    "Phone number": "123-456-7890"
  },
  {
    "S.No": 1,
    "Date": "2024-02-17",
    "Customer Name": "John Doe",
    "Country": "USA",
    "Phone number": "123-456-7890"
  },
  {
    "S.No": 1,
    "Date": "2024-02-17",
    "Customer Name": "John Doe",
    "Country": "USA",
    "Phone number": "123-456-7890"
  },
  {
    "S.No": 1,
    "Date": "2024-02-17",
    "Customer Name": "John Doe",
    "Country": "USA",
    "Phone number": "123-456-7890"
  },
    {
    "S.No": 1,
    "Date": "2024-02-17",
    "Customer Name": "John Doe",
    "Country": "USA",
    "Phone number": "123-456-7890"
  },

];
function App() {
  return (
    <div className='main'>
<MainSheet></MainSheet>
    </div>
  );
}

export default App;
