import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./Tabulation.css";
function StudentReports() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(location.state);
  let data1 = data.allData.flat();
  const [filterData, setFilterData] = useState(
    data1.map((item, index) => ({ ...item, id: index + 1 }))
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleButtonClick = (item) => {
    navigate("/studentChart", { state: item });
    //console.log(`Button clicked for row with ID: ${id}`);
  };

  const handleFilter = () => {
    const filtered = data1.filter((item) => {
      const itemDate = new Date(item.Timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Added one day to the end date
      return itemDate >= start && itemDate <= end;
    });
    setFilterData(filtered);
  };
  const filteredData = filterData.filter((i) =>
    i.Email_Address.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "Timestamp", headerName: "CompletedOn", width: 100 },
    { field: "Name", headerName: "Name", width: 100 },
    { field: "Email_Address", headerName: "Email Address", width: 180 },
    { field: "Phone_Number", headerName: "PhoneNumber", width: 100 },
    { field: "Score", headerName: "Total Score", width: 100 },
    { field: "aptitude_score", headerName: "AptitudeScore", width: 100 },
    { field: "technical_score", headerName: "TechnicalScore", width: 100 },
    { field: "fullstack_java_score", headerName: "JavaScore", width: 100 },
    { field: "fullstack_react_score", headerName: "ReactScore", width: 100 },
    { field: "reasoning_score", headerName: "ReasoningScore", width: 100 },
    { field: "testType", headerName: "TestType", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <button onClick={() => handleButtonClick(params.row)}>Action</button>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          paddingLeft: "30px",
          paddingTop: "10px",
          backgroundColor: "#0047AB",
          color: "white",
          height: "65px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            onClick={() => navigate("/")}
            style={{
              fontSize: "20px",
              marginRight: "30px",
              fontWeight: "bold",
            }}
          >
            ASSESSMENTS MADE SIMPLE{" "}
          </p>
          <p
            onClick={() => navigate("/dashboard", { state: data })}
            style={{ fontSize: "18px", marginRight: "20px" }}
          >
            Dashboard
          </p>
          <p
            onClick={() => navigate("/sendAssessments", { state: data })}
            style={{ fontSize: "18px", marginRight: "20px" }}
          >
            Assessments
          </p>
          <p
            onClick={() => navigate("/testReports", { state: data })}
            style={{ fontSize: "18px", marginRight: "20px" }}
          >
            Test Reports
          </p>
          <p
            onClick={() => navigate("/studentReports", { state: data })}
            style={{ fontSize: "18px" }}
          >
            Student Reports
          </p>
        </div>
        <div style={{ marginRight: "30px" }}>
          <p style={{ color: "white" }} onClick={() => navigate("/adminLogin")}>
            Admin
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          paddingTop: "30px",
          paddingBottom: "20px",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ marginBottom: "15px" }}>Student Data</h1>
        <label htmlFor='search'>
          Search by Student Email :
          <input
            id='search'
            value={search}
            type='text'
            onChange={handleSearch}
            style={{ marginBottom: "20px", marginLeft: "20px" }}
          />
        </label>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div className='display-between'>
              Start Date:{"   "}
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              End Date:{" "}
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            </div>
            <button
              style={{ marginLeft: "20px", padding: "2px", width: "60px" }}
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          {filteredData.length > 0 ? (
            <div className='table-container'>
              <table border='2px'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Completed On</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Total Score</th>
                    <th>Aptitude Score</th>
                    <th>Technical Score</th>
                    <th>Java Score</th>
                    <th>React Score</th>
                    <th>Reasoning Score</th>
                    <th>Test Type</th>
                    <th>View Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.Timestamp}</td>
                      <td>{item.Name}</td>
                      <td>{item.Email_Address}</td>
                      <td>{item.Phone_Number}</td>
                      <td>{item.Score}</td>
                      <td>
                        {item.aptitude_score === undefined
                          ? "NA"
                          : item.aptitude_score}
                      </td>
                      <td>
                        {item.technical_score === undefined
                          ? "NA"
                          : item.technical_score}
                      </td>
                      <td>
                        {item.fullstack_java_score === undefined
                          ? "NA"
                          : item.fullstack_java_score}
                      </td>
                      <td>
                        {item.fullstack_react_score === undefined
                          ? "NA"
                          : item.fullstack_react_score}
                      </td>
                      <td>
                        {item.reasoning_score === undefined
                          ? "NA"
                          : item.reasoning_score}
                      </td>
                      <td>{item.testType}</td>
                      <td>
                        <button
                          onClick={() =>
                            navigate("/studentChart", { state: item })
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // <div style={{ minHeight: 100, width: "100%" }}>
            //   <DataGrid
            //     rows={filterData}
            //     columns={columns}
            //     initialState={{
            //       pagination: {
            //         paginationModel: { page: 0, pageSize: 5 },
            //       },
            //     }}
            //     pageSizeOptions={[5, 10, 15, 20]}
            //   />
            // </div>
            "No Data Found"
          )}
        </div>
      </div>
    </>
  );
}

export default StudentReports;
