import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Typography, Stack, Link } from "@mui/material";
import { contactStyles } from "./contact.styles";

const phone = "1111111";
const email = "email";
const instagram1 = "instagram";
const instagramUrl1 = "isntagram";
const whatsappNumber = "11111";

const Contact = () => {
  return (
    <Box sx={contactStyles.mainBox}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Datos
      </Typography>
      <Typography mb={1}>Ventas:</Typography>
      <Typography fontWeight={500}>Nando</Typography>
      <Typography mb={1}>{phone}</Typography>

      <Typography mb={2}>
        Direccion del showroom con previa coordinacion:
        <br />
      </Typography>

      <Stack spacing={3} mt={4}>
        {/* WhatsApp */}
        <Box sx={contactStyles.contactItemBox}>
          <Box sx={contactStyles.whatsappIconBox}>
            <WhatsAppIcon sx={contactStyles.whatsappIcon} />
          </Box>
          <Box>
            <Typography fontWeight={600}>Teléfono</Typography>
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="inherit"
            >
              {phone}
            </Link>
          </Box>
        </Box>
        {/* Email */}
        <Box sx={contactStyles.contactItemBox}>
          <Box sx={contactStyles.emailIconBox}>
            <EmailIcon sx={contactStyles.emailIcon} />
          </Box>
          <Box>
            <Typography fontWeight={600}>Correo electrónico</Typography>
            <Link href={`mailto:${email}`} underline="none" color="inherit">
              {email}
            </Link>
          </Box>
        </Box>
        {/* Instagram */}
        <Box sx={contactStyles.contactItemBox}>
          <Box sx={contactStyles.instagramIconBox}>
            <InstagramIcon sx={contactStyles.instagramIcon} />
          </Box>
          <Box>
            <Typography fontWeight={600}>Instagram</Typography>
            <Link
              href={instagramUrl1}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="inherit"
            >
              @{instagram1}
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Contact;
