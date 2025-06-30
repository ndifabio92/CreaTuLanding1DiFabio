import { Box, Typography } from "@mui/material";
import { ContactForm } from "./ContactForm";
import { contactStyles } from "./contact.styles";

const Contact = () => {
  return (
    <Box sx={contactStyles.mainBox}>
      <Typography variant="h5" fontWeight={600} mb={2}>
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
