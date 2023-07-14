import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Dashboard.css";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListofPlayers() {
  const [APIData, setAPIData] = useState([]);
  const baseUrl = "https://64abc1ba9edb4181202e7800.mockapi.io/staffManagement";
  // Lay DATA base API
  useEffect(() => {
    fetch("https://64abc1ba9edb4181202e7800.mockapi.io/staffManagement")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const getListPlayers = async () => {
    const res = await axios.get(`${baseUrl}`);
    if (res.status === 200) {
      setAPIData(res.data);
    }
  };
  useEffect(() => {
    getListPlayers();
  }, []);

  // handel Delete
  const handleDelete = async (id) => {
    if (
      window.confirm(
        // `Are you sure that you want to delete a player: ${id}`
        `Delete this staff?`
      )
    ) {
      const res = await axios.delete(`${baseUrl}/${id}`);
      if (res.status === 200) {
        getListPlayers();
        alert("Deleted successfully");
      }
    }
  };

  //  END Lay DATA base API
  return (
    <TableContainer component={Paper} style={{ marginTop: "10px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Avatar</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Age</StyledTableCell>
            <StyledTableCell align="left">Address</StyledTableCell>
            <StyledTableCell align="left">Create date</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {APIData.map((data) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell component="th" scope="row">
                {data.id}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Avatar alt="Best Players" src={data.avatar} />
              </StyledTableCell>
              <StyledTableCell align="left">{data.name}</StyledTableCell>
              <StyledTableCell align="left">{data.age}</StyledTableCell>
              <StyledTableCell align="left">{data.address}</StyledTableCell>
              <StyledTableCell align="left">{data.createdAt}</StyledTableCell>
              <StyledTableCell align="left">
                <Link to={`/update/${data.id}`}>
                  <Button variant="outlined">Edit</Button>
                </Link>
                <IconButton
                  style={{ color: "red" }}
                  onClick={() => handleDelete(data.id)}
                >
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
