import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
export default function Players() {
  const navigate = useNavigate();
  const [APIData, setAPIData] = useState([]);

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

  return (
    <Grid container spacing={2} style={{ marginTop: "10px" }}>
      {APIData.map((data) => (
        <Grid item xs={12} sm={6} md={4} key={data.id}>
          <Card>
            <CardMedia
              component="img"
              height="290"
              image={data.avatar}
              alt={data.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name: {data.name}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Age: {data.age}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Adress: {data.address}
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">{data.nation}</Button> */}
              <Button
                size="small"
                onClick={() => navigate(`/detail/${data.id}`)}
              >
                Detail
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
