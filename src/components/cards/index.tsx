import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router";
import { cardStyles } from "./card.styles";

interface Props {
  name: string;
  path: string;
  image: string;
  textButton: string;
}

const CardComponent: React.FC<Props> = ({ name, path, image, textButton }) => {
  const navigate = useNavigate();
  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={image}
        title={name}
        sx={{
          height: 200,
          objectFit: "cover",
          width: "100%",
        }}
      />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(path)}
        >
          {textButton}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
