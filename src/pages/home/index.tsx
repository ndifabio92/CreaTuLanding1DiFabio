import { useEffect, useState } from "react";
import CardComponent from "../../components/cards";
import { getAllProductsFromFirestore } from "../../services/products.services";
import { Product } from "../../types/products/products";
import { Container, Typography, Box } from "@mui/material";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

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
      <Container>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography color="error" variant="h5">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        py: 4,
      }}
    >
      {products.map((product) => (
        <CardComponent
          key={product.id}
          id={product.id}
          name={product.name}
          path={`/products/${product.id}`}
          image={product.urls[0]}
          stock={product.stock}
          isNew={product.isNew}
        />
      ))}
    </Container>
  );
};

export default Home;
