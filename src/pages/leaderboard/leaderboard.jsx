import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import formatDate from "../../utils/formatDate";

const headers = ["First Name", "Last Name", "Email", "Score"];

function Leaderboard() {
  const sessionUsers = JSON.parse(window.sessionStorage.getItem('users'));
  const users = useSelector((state) => state.dashboard.users);

  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  // ];

  const rows = users.map((item) => {
    return [item.firstName, item.lastName, item.email, item.score];
  });

  const csvData = [headers, ...rows];

  return (
    <>
      <Typography
        variant="h3"
        noWrap
        component="h2"
        sx={{ textAlign: "center", marginBottom: 5 }}
      >
        Leaderboard
      </Typography>

      <Box sx={{ textAlign: "right", marginBottom: 5 }}>
        <CSVLink data={csvData} filename={formatDate("report")}>
          <Button
            size="small"
            variant="contained"
            startIcon={<InsertDriveFileIcon />}
          >
            Export CSV
          </Button>
        </CSVLink>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(sessionUsers || users).map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Leaderboard;
