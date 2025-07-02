import { useEffect, useState } from "react";
import CardComponent from "../../components/cards/CardComponent";
import { getAllProductsFromFirestore } from "../../services/products.service";
import { Product } from "../../types/products";
import { Container, Typography, Box } from "@mui/material";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { homeStyles } from "./home.styles";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsFromFirestore();
        setProducts(data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={homeStyles.errorContainer}>
        <Box sx={homeStyles.errorBox}>
          <Typography color="error" variant="h5">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={homeStyles.mainContainer}>
      <Box sx={homeStyles.productsGrid}>
        {products.map((product) => (
          <CardComponent
            key={product.id}
            id={product.id}
            name={product.name}
            path={`/products/${product.id}`}
            image={product.urls[0]}
            stock={product.stock}
            isNew={product.isNew}
            price={product.price}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
