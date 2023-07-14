import React from "react";
// import ModalCase from "./ModalCase";
import {
  CardContent,
  Grid,
  CardMedia,
  Button,
  Card,
  Typography,
  CardActions,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import SlideshowIcon from "@mui/icons-material/Slideshow";

export default function DetailPlayer() {
  const [APIData, setAPIData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  let params = useParams();
  let player = APIData.find((e) => {
    return e.id == params.id;
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "30px",
      }}
    >
      <Card
        sx={{
          maxWidth: 1000,
          maxHeight: 1000,
          margin: "5%",
        }}
      >
        <CardMedia
          component="img"
          height="800"
          image={player && player.avatar}
          alt={player && player.name}
          style={{ objectFit: "cover", height: "70vh" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" maxWidth={300}>
            {player && player.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            <b>Age: </b>{player && player.age}
          </Typography>
          <Typography variant="h5" color="text.secondary">
          <b>Adress: </b>{player && player.address}
          </Typography>
          <Typography variant="h5" color="text.secondary">
          <b>Created date: </b>{player && player.createdAt}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <SlideshowIcon />
          </Button>
        </CardActions> */}
        {/* {isOpen && <ModalCase setIsOpen={setIsOpen} player={player} />} */}
      </Card>
    </div>
  );
}
