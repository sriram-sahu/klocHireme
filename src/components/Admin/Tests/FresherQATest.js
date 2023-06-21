import React, { useContext } from "react";
import TestContext from "../../../TestContext";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import SendIcon from "@mui/icons-material/Send";

export default function FresherQATest(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { reports } = useContext(TestContext);
  console.log(reports, "yu");
  const data = location.state;
  console.log(data);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Timestamp", headerName: "Completed On", width: 200 },
    { field: "Email", headerName: "Email", width: 300 },
    {
      field: "Score",
      headerName: "Score (20)",
      width: 150,
    },
    {
      field: "View Profile",
      headerName: "View Profile",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant='outlined'
          color='primary'
          onClick={() => {
            navigate("/studentProfile", { state: params.row });
            // updateScore(params.row);
          }}
        >
          View Profile
        </Button>
      ),
    },
    {
      field: "Send Mail",
      headerName: "Send Mail",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant='outlined'
          color='primary'
          endIcon={<SendIcon />}
          onClick={() => {
            // handleSendMail(params.row);
          }}
        >
          Send Mail
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
