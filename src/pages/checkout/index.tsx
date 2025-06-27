import { Box, Container, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import WhatsAppButton from "../../components/whastApp/WhatsAppButton";
import Cart from "../cart";
import { useCart } from "../../context/hooks/useCart";
import { generateWhatsAppMessage } from "../../shared/whatsappUtils";
import { getCartItemDetails } from "../../shared/cartUtils";
// import { Product } from '../../types/products/products';
import { CartProductWithQuantity } from "../../shared/whatsappUtils";
import { useState, useEffect } from "react";

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  phoneNumber: Yup.string().required("Requerido"),
});

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const Checkout = () => {
  const { cartItems } = useCart();
  const [cartProducts, setCartProducts] = useState<CartProductWithQuantity[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products: CartProductWithQuantity[] = [];
      for (const item of cartItems) {
        const product = await getCartItemDetails(item.id);
        if (product) {
          products.push({ product, quantity: item.quantity });
        }
      }
      setCartProducts(products);
      setLoading(false);
    };
    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setCartProducts([]);
    }
  }, [cartItems]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          // py: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
            mb: { xs: 2, md: 0 },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Datos de contacto
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {}}
            validateOnMount
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              isValid,
            }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Nombre"
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Apellido"
                  name="lastName"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Teléfono"
                  name="phoneNumber"
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {cartItems.length > 0 && !loading && (
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                  >
                    <WhatsAppButton
                      message={generateWhatsAppMessage(values, cartProducts)}
                      disabled={!isValid}
                    >
                      Envía tu Pedido por WhatsApp
                    </WhatsAppButton>
                  </Box>
                )}
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: "24px",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Cart
            isCheckout
            externalCartProducts={Object.fromEntries(
              cartProducts.map(({ product }) => [product.id, product])
            )}
            externalLoading={loading}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
