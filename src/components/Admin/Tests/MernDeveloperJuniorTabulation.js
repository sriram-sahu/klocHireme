import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "../Tabulation.css";

function MernDeveloperJuniorTest() {
  const location = useLocation();
  const [data, setData] = useState(
    location.state.map((item, index) => ({ ...item, id: index + 1 }))
  );
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "Timestamp", headerName: "Completed On", width: 160 },
    { field: "Name", headerName: "Name", width: 220 },
    {
      field: "Email_Address",
      headerName: "Email Address",
      width: 220,
    },
    {
      field: "Phone_Number",
      headerName: "Phone Number",
      sortable: false,
      width: 120,
    },
    {
      field: "total_score",
      headerName: "Total Score",
      sortable: false,
      width: 120,
    },
    {
      field: "aptitude_score",
      headerName: "Aptitude Score",
      sortable: false,
      width: 120,
    },
    {
      field: "technical_score",
      headerName: "Technical Score",
      sortable: false,
      width: 120,
    },
    {
      field: "View Score",
      headerName: "View Score",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => navigate("/studentChart", { state: params.row })}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        paddingTop: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        MERN Developer Junior Test Tabulation Data
      </h1>
      {data.length > 0 ? (
        // <table border='2px' style={{ margin: "auto" }}>
        //   <thead>
        //     <tr>
        //       <th>Id</th>
        //       <th>Completed On</th>
        //       <th>Name</th>
        //       <th>Email Address</th>
        //       <th>Phone Number</th>
        //       <th>Total Score</th>
        //       <th>Aptitude Score</th>
        //       <th>Technical Score</th>
        //       <th>View Score</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {data.map((item, index) => (
        //       <tr>
        //         <td>{index}</td>
        //         <td>{item.Timestamp}</td>
        //         <td>{item.Name}</td>
        //         <td>{item.Email_Address}</td>
        //         <td>{item.Phone_Number}</td>
        //         <td>{item.Score}</td>
        //         <td>{item.aptitude_score}</td>
        //         <td>{item.technical_score}</td>
        //         <td>
        //           <button
        //             onClick={() => navigate("/studentChart", { state: item })}
        //           >
        //             View
        //           </button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        <div style={{ minHeight: 100, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      ) : (
        "No Data Found"
      )}
    </div>
  );
}

export default MernDeveloperJuniorTest;
