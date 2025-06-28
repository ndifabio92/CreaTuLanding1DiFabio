import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Typography, Stack, Link, IconButton } from "@mui/material";
import { footerStyles } from "./footer.styles";

const phone = "1111111111";
const email = "test@gmail.com";
const instagram1 = "test";
const instagramUrl1 = "https://www.instagram.com";
const whatsappNumber = "1111111111";

const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles.footer}>
      {/* Desktop Layout */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={footerStyles.desktopStack}
      >
        {/* WhatsApp */}
        <Box sx={footerStyles.contactBox}>
          <WhatsAppIcon sx={footerStyles.whatsappIcon} />
          <Link
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            color="inherit"
            fontWeight={500}
          >
            {phone}
          </Link>
        </Box>
        {/* Email */}
        <Box sx={footerStyles.contactBox}>
          <EmailIcon sx={footerStyles.emailIcon} />
          <Link
            href={`mailto:${email}`}
            underline="none"
            color="inherit"
            fontWeight={500}
          >
            {email || "Email"}
          </Link>
        </Box>
        {/* Instagram */}
        <Box sx={footerStyles.contactBox}>
          <InstagramIcon sx={footerStyles.instagramIcon} />
          <Link
            href={instagramUrl1}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            color="inherit"
            fontWeight={500}
          >
            @{instagram1}
          </Link>
        </Box>
      </Stack>

      {/* Mobile Layout - Only Icons */}
      <Box sx={footerStyles.mobileBox}>
        <IconButton
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={footerStyles.mobileIconButton}
        >
          <WhatsAppIcon sx={footerStyles.whatsappIcon} />
        </IconButton>
        <IconButton href={`mailto:${email}`} sx={footerStyles.mobileIconButton}>
          <EmailIcon sx={footerStyles.emailIcon} />
        </IconButton>
        <IconButton
          href={instagramUrl1}
          target="_blank"
          rel="noopener noreferrer"
          sx={footerStyles.mobileIconButton}
        >
          <InstagramIcon sx={footerStyles.instagramIcon} />
        </IconButton>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={footerStyles.copyright}
      >
        © {new Date().getFullYear()} Nicolas Di Fabio. Todos los derechos
        reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
