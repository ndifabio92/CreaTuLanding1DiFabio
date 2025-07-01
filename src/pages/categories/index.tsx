import { useEffect, useState } from "react";
import { Categories } from "../../types/categories";
import { Product } from "../../types/products";
import { useSearchParams } from "react-router";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../../styles/theme";
import { getAllCategoriesFromFirestore } from "../../services/categories.service";
import { getProductsByCategoriesName } from "../../services/products.service";
import BackBreadcrumb from "../../components/navigation/BackBreadcrumb";
import CardComponent from "../../components/cards/CardComponent";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { categoriesStyles } from "./categories.styles";

const Category = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategoriesFromFirestore();
      setCategories(data.filter((b) => b.active));
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const category = searchParams.get("category");

      setSelectedCategory(category ?? "Helikon");
      const data = await getProductsByCategoriesName(category ?? "");
      setProducts(data);

      setLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  const handleCategoryClick = (categoryName: string) => {
    setSearchParams({ category: categoryName });
  };

  return (
    <Container sx={categoriesStyles.container}>
      {!isMobile && <BackBreadcrumb />}
      <Typography variant="h5" sx={categoriesStyles.title}>
        Categorias
      </Typography>
      <Box sx={categoriesStyles.brandsBox}>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.name ? "contained" : "outlined"
            }
            onClick={() => handleCategoryClick(category.name)}
            sx={categoriesStyles.brandButton}
          >
            {category.name}
          </Button>
        ))}
      </Box>
      <Divider sx={categoriesStyles.divider} />
      {loading ? (
        <LoadingScreen />
      ) : products.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No hay productos para esta marca.
        </Typography>
      ) : (
        <Container sx={categoriesStyles.productsContainer}>
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

export default Category;
