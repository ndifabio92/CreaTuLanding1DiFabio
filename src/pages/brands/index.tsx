import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { getAllBrandsFromFirestore } from "../../services/brands.service";
import { getProductsByBrandName } from "../../services/products.service";
import { Brands } from "../../types/brands";
import { Product } from "../../types/products";
import CardComponent from "../../components/cards/CardComponent";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { useSearchParams } from "react-router";
import { brandsStyles } from "./brands.styles";
import BackBreadcrumb from "../../components/navigation/BackBreadcrumb";
import theme from "../../styles/theme";

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brands[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrandsFromFirestore();
      setBrands(data.filter((b) => b.active));
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const brand = searchParams.get("brand");

      setSelectedBrand(brand ?? "Helikon");
      const data = await getProductsByBrandName(brand ?? "Helikon");
      setProducts(data);

      setLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  const handleBrandClick = (brandName: string) => {
    setSearchParams({ brand: brandName });
  };

  return (
    <Container sx={brandsStyles.container}>
      {!isMobile && <BackBreadcrumb />}
      <Typography variant="h5" sx={brandsStyles.title}>
        Marcas
      </Typography>
      <Box sx={brandsStyles.brandsBox}>
        {brands.map((brand) => (
          <Button
            key={brand.id}
            variant={selectedBrand === brand.name ? "contained" : "outlined"}
            onClick={() => handleBrandClick(brand.name)}
            sx={brandsStyles.brandButton}
          >
            {brand.name}
          </Button>
        ))}
      </Box>
      <Divider sx={brandsStyles.divider} />
      {loading ? (
        <LoadingScreen />
      ) : products.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No hay productos para esta marca.
        </Typography>
      ) : (
        <Container sx={brandsStyles.productsContainer}>
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
      )}
    </Container>
  );
};

export default BrandsPage;
