import React, { useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Alert,
  AlertTitle,
  DialogActions,
} from "@mui/material";
import { Switch } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Add() {
  // FETCH URL API
  const baseUrl = "https://64abc1ba9edb4181202e7800.mockapi.io/staffManagement";
  //  CREATE initialState

  const initialState = {
    name: "",
    address: "",
    age: 0,
    avatar: "",
    createdAt: "",
  };

  const [state, setState] = useState(initialState);
  const { name, address, age, avatar, createdAt} = state;
  const { id } = useParams();
  const navigate = useNavigate();

  const getInfoPlayer = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    if (res.status === 200) {
      setState(res.data);
    }
  };

  useEffect(() => {
    if (id) getInfoPlayer(id);
  }, [id]);

  const addNewPlayer = async (data) => {
    const res = await axios.post(`${baseUrl}`, data);
    // if (res.status === 200) {
    //   alert("New film has been added sucessfully ~");
    // }
  };
  const updatePlayer = async (playerID, data) => {
    const res = await axios.put(`${baseUrl}/${playerID}`, data);
    if (res.status === 200) {
      // alert(`A film with id = ${playerID} successfully`);
      alert(`Update successfully`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name.trim() === "" || name.trim().length <= 2 ||
      age.trim() === "" ||
      address.trim() === "" ||
      avatar.trim() === "" ||
      createdAt.trim() === ""
    ) {
      alert("Please provide value into each input field");
    } else {
      if (!id) {
        addNewPlayer(state);
        navigate("/dashboard");
      } else {
        updatePlayer(id, state);
        navigate("/dashboard");
      }
    }
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <Card
      container
      spacing={2}
      style={{ marginTop: "10px", marginLeft: "40px" }}
    >
      <Typography fontSize="30px" align="center" fontWeight={500}>
        {id ? "UPDATE" : "ADD A NEW"} STAFF
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={state.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="age"
          label="Age"
          type="text"
          fullWidth
          variant="standard"
          value={state.age}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="standard"
          value={state.address}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="avatar"
          label="URL of avatar"
          type="text"
          fullWidth
          variant="standard"
          value={state.avatar}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="createdAt"
          label="Created date"
          type="date"
          fullWidth
          variant="standard"
          value={state.createdAt}
          onChange={handleInputChange}
        />
        <br />
        <Button variant="contained" size="small" type="submit">
          {id ? "Update" : "Add"}
        </Button>
      </form>
    </Card>

    //•	Using the POST method in onSubmit:
  );
}
