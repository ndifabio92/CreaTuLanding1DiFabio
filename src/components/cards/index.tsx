import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";
import { cardStyles } from "./card.styles";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../../context/hooks/useCart";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  id: string;
  name: string;
  path: string;
  image: string;
  stock: number;
  isNew: boolean;
}

const CardComponent: React.FC<Props> = ({ id, name, path, image, stock, isNew }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <Card sx={cardStyles}>
      <CardContent>
        {isNew && (
          <div
            style={{
              display: "inline-block",
              marginBottom: 8,
              background: "#FFEB3B",
              color: "#222",
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 4,
              padding: "2px 10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            NUEVO
          </div>
        )}
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
          gap: 1,
          padding: "16px",
        }}
      >
        {
          stock > 0 && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addToCart(id, 1)}>
            ADD TO CART
          </Button>
          )
        }
        <Tooltip title="Ver detalle">
          <IconButton
            size="small"
            onClick={() => navigate(path)}
            sx={{ color: "primary.main" }}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

      </CardActions>
    </Card>
  );
};

export default CardComponent;
