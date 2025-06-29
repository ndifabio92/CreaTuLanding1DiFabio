import { Box, Container, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import WhatsAppButton from "../../components/whastApp/WhatsAppButton";
import Cart from "../cart";
import { useCart } from "../../hooks/useCart";
import { generateWhatsAppMessage } from "../../shared/whatsappUtils";
import {
  calculateCartTotalWithExchangeRate,
  getCartItemDetails,
} from "../../shared/cartUtils";
import { useState, useEffect } from "react";
import { CartProductWithQuantity } from "../../types/externals/whatsAppMessage";
import { checkoutStyles } from "./checkout.styles";

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
  const [exchange, setExchange] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products: CartProductWithQuantity[] = [];
      const getExchangeRate = await calculateCartTotalWithExchangeRate();

      for (const item of cartItems) {
        const product = await getCartItemDetails(item.id);
        if (product) {
          products.push({ product, quantity: item.quantity });
        }
      }
      setCartProducts(products);
      setExchange(getExchangeRate);
    };
    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setCartProducts([]);
    }
    setLoading(false);
  }, [cartItems]);

  return (
    <Container sx={checkoutStyles.container}>
      <Box sx={checkoutStyles.mainBox}>
        <Box sx={checkoutStyles.formBox}>
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
                  <Box sx={checkoutStyles.whatsappButtonBox}>
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

        <Box sx={checkoutStyles.cartBox}>
          <Cart
            isCheckout
            externalCartProducts={Object.fromEntries(
              cartProducts.map(({ product }) => [product.id, product])
            )}
            externalLoading={loading}
            exchangeRate={exchange}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
