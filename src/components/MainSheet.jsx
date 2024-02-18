import React, { useState, useCallback } from "react";
import SpreadSheet from "./SpreadSheet";
import * as XLSX from "xlsx";
import '../styles/mainSheet.css';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';

const MainSheet = () => {
  const rowCount = 30;

  const initialData = Array.from({ length: rowCount }, (_, index) => ({
    "S.No": index + 1,
    Date: "",
    "Customer Name": "",
    Country: "",
    "Phone number": "",
    "Order Status": "",
  }));

  const [data, setData] = useState(initialData);

  const handleDataChange = useCallback((newData) => {
    setData(newData);
    localStorage.setItem("spreadsheetData", JSON.stringify(newData));
  }, []);

  const handleDownload = () => {
    const savedData = localStorage.getItem("spreadsheetData");
    if (savedData) {
      const dataFromLocalStorage = JSON.parse(savedData);
      const worksheet = XLSX.utils.json_to_sheet(dataFromLocalStorage);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "spreadsheet.xlsx");
    }
  };

  return (
    <div className="mainSheet"

    >
      <div>
        
        <h1 className="topDiv">
          Spreadsheet{" "}
          <button
          className="downloadButton"
          onClick={handleDownload}
        >
  <FileDownloadSharpIcon style={{ fontSize:40 }} />
        </button>
         
        </h1>
        <SpreadSheet data={data} onDataChange={handleDataChange} />
      </div>
    </div>
  );
};

export default MainSheet;
