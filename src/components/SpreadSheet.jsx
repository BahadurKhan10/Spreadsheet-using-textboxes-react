import React, { useState, useEffect } from "react";
import '../styles/spreadSheet.css';

const SpreadSheet = ({ data, onDataChange }) => {
  const [filters, setFilters] = useState({});
  const [originalData, setOriginalData] = useState([]);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("spreadsheetData");
    if (savedData) {
      setOriginalData(JSON.parse(savedData));
    } else {
      const emptyRowCount = Math.max(30 - data.length, 0);
      const emptyRows = Array.from({ length: emptyRowCount }, () => ({
        "S.No": "",
        Date: "",
        "Customer Name": "",
        Country: "",
        "Phone number": "",
        "Order Status": "",
      }));
      setOriginalData([...data, ...emptyRows]);
    }
  }, [data]);

  useEffect(() => {
    let filteredRows = [...originalData];
    Object.keys(filters).forEach((columnName) => {
      const value = filters[columnName];
      if (columnName === "Date" && value) {
        // Filter logic for date column
        filteredRows = filteredRows.filter((row) => {
          const rowDate = row[columnName];
          if (!rowDate) return false; // Skip rows with empty date
          const [rowYear, rowMonth, rowDay] = rowDate.split("-");
          const [filterMonth, filterDay, filterYear] = value.split("/");
          return (
            (filterMonth ? rowMonth?.includes(filterMonth) : true) &&
            (filterDay ? rowDay?.includes(filterDay) : true) &&
            (filterYear ? rowYear?.includes(filterYear) : true)
          );
        });
      } else {
        // Regular filtering for other columns
        filteredRows = filteredRows.filter((row) =>
          row[columnName].toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setRowData(filteredRows);
  }, [filters, originalData]);

  useEffect(() => {
    if (originalData.length > 0) {
      setRowData(originalData);
    }
  }, [originalData]);

  const handleFilterChange = (e, columnName) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      [columnName]: value,
    });
  };

  const handleRowInputChange = (e, rowIndex, columnName) => {
    const { value } = e.target;
    const updatedRowData = [...rowData];
    updatedRowData[rowIndex] = {
      ...updatedRowData[rowIndex],
      [columnName]: value,
    };
    setRowData(updatedRowData);
    onDataChange(updatedRowData);
    localStorage.setItem("spreadsheetData", JSON.stringify(updatedRowData));
  };

  const addNewRow = () => {
    const lastSNo =
      originalData.length > 0
        ? parseInt(originalData[originalData.length - 1]["S.No"])
        : 0;
    const newSNo = lastSNo + 1;
    const newRow = {
      "S.No": newSNo,
      Date: "",
      "Customer Name": "",
      Country: "",
      "Phone number": "",
      "Order Status": "",
    };
    const updatedData = [...originalData, newRow];
    setOriginalData(updatedData);
    onDataChange(updatedData);
    localStorage.setItem("spreadsheetData", JSON.stringify(updatedData));
  };

  return (
    // Main Table Div
    <div className="mainTableDiv">
      {/* Labels Row*/}
      <div className="table">
      <div className="labelRow">
        {Object.keys(data[0]).map((key, index) => (
          <div
            key={index}
            className="label"
            style={{
              width:
                key === "Date"
                  ? "101px"
                  : key === "S.No"
                  ? "29px"
                  : key === "Customer Name"
                  ? "340px"
                  : key === "Country"
                  ? "342px"
                  : key === "Phone number"
                  ? "341px"
                  : key === "Order Status"
                  ? "222px"
                  : "338px",
            }}
          >
            {key}
          </div>
        ))}
      </div>

      {/* Filter Row */}
      <div className="filterRow">
        {Object.keys(data[0]).map((key, index) => (
          <input
            key={index}
            type="text"
            placeholder={key === "S.No" ? "Filter" : `Filter by ${key}`}
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(e, key)}
            className={`filterInput ${key === "S.No" ? "filter-plus" : ""}`}

            style={{
              width:
                key === "Date"
                  ? "112px"
                  : key === "S.No"
                  ? "40px"
                  : key === "Country"
                  ? "354px"
                  : key === "Customer Name"
                  ? "354px"
                  : key === "Phone number"
                  ? "353px"
                  : key === "Order Status"
                  ? "233px"
                  : "352px",
            
            }}
          />
        ))}
      </div>

      {/* Data Row */}
      <div className="dataRow">
        {rowData.map((row, rowIndex) => (
          <div
          className="row-plus"
            key={rowIndex}
            style={{
              marginBottom: `${
                rowIndex > 0 && rowIndex % 5 === 1 ? "0px" : "0px"
              }`,
            }}
          >
            {Object.keys(row).map((value, colIndex) => (
              <input
                key={colIndex}
                type={value === "Date" ? "date" : "text"}
                value={row[value]}
                onChange={(e) => handleRowInputChange(e, rowIndex, value)}
                className={`dataInput ${value === "S.No" ? "input-plus" : ""}`}
                style={{
                  width:
                    value === "S.No"
                      ? "37px"
                      : value === "Date"
                      ? "auto"
                      : value === "Order Status"
                      ? "230px"
                      : "352px",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      </div>
      {/* Add Row Button */}
      <div className="buttonDiv">
        <button onClick={addNewRow} className="rowButton">
          Add Row
        </button>
      </div>
    </div>
  );
};

export default SpreadSheet;
