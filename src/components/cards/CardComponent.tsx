import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router";
import { cardStyles } from "./card.styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { formatPrice } from "../../shared/cartUtils";

interface Props {
  id?: string;
  name: string;
  path: string;
  image: string;
  stock?: number;
  isNew: boolean;
  price: number;
}

const CardComponent: React.FC<Props> = ({
  // id,
  name,
  path,
  image,
  // stock,
  isNew,
  price,
}) => {
  const navigate = useNavigate();
  // const { addToCart } = useCart();
  return (
    <Card sx={cardStyles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name.toLowerCase()}
        </Typography>
      </CardContent>
      {isNew && <Chip label="NUEVO" size="small" sx={cardStyles.newBadge} />}
      <CardMedia
        onClick={() => navigate(path)}
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
        {/* {stock > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={() => addToCart(id, 1)}
          >
            Add To Cart
          </Button>
        )} */}
        <Typography
          variant="body1"
          color="text.main"
          sx={{ fontWeight: 600, fontSize: "1.2rem" }}
          >
          {formatPrice(price)}
        </Typography>
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
