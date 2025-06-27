import { useEffect, useState } from "react";
import { Container, Typography, Divider, Button, Box } from "@mui/material";
import { getAllBrandsFromFirestore } from "../../services/brands.service";
import { getProductsByBrandName } from "../../services/products.service";
import { Brands } from "../../types/brands";
import { Product } from "../../types/products";
import CardComponent from "../../components/cards/CardComponent";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { useSearchParams } from "react-router";

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brands[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrandsFromFirestore();
      setBrands(data.filter(b => b.active));
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const brand = searchParams.get("brand");
    //   if (brand) {
        setSelectedBrand(brand ?? 'Helikon');
        const data = await getProductsByBrandName(brand ?? 'Helikon');
        setProducts(data);
    //   } 
      setLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  const handleBrandClick = (brandName: string) => {
    setSearchParams({ brand: brandName });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Marcas
      </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', pb: 2}}>
          {brands.map((brand) => (
            // <ListItem key={brand.id} disablePadding>
              <Button
                variant={selectedBrand === brand.name ? "contained" : "outlined"}
                onClick={() => handleBrandClick(brand.name)}
                sx={{ minWidth: 120 }}
              >
                {brand.name}
              </Button>
            // </ListItem>
          ))}
        </Box>
      <Divider sx={{ mb: 4 }} />
      {loading ? (
        <LoadingScreen />
      ) : products.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No hay productos para esta marca.
        </Typography>
      ) : (
        <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
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