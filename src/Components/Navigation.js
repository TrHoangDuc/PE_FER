import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button variant="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          DashBoard
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>
        <Button color="inherit" component={Link} to="/add">
          Add Staff
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;