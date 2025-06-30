import { Box, Typography } from "@mui/material";

import { contactStyles } from "./contact.styles";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <Box sx={contactStyles.mainBox}>
      <Typography variant="h4" sx={contactStyles.title}>
        Contacto
      </Typography>
      <Typography mb={2}>
        Complete el formulario para enviar su consulta por WhatsApp o Email.
      </Typography>
      <ContactForm />
    </Box>
  );
};

export default Contact;
