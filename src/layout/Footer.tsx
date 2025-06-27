import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Typography, Stack, Link, IconButton } from "@mui/material";

const phone = "1111111111";
const email = "test@gmail.com";
const instagram1 = "test";
const instagramUrl1 = "https://www.instagram.com";
const whatsappNumber = "1111111111";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: 6,
        py: 3,
        px: { xs: 2, sm: 6 },
        bgcolor: "background.paper",
        borderTop: "1px solid #eee",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
      }}
    >
      {/* Desktop Layout */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {/* WhatsApp */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WhatsAppIcon sx={{ color: "#25D366", fontSize: 32 }} />
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon sx={{ color: "#f5c542", fontSize: 32 }} />
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InstagramIcon sx={{ color: "#ee2a7b", fontSize: 32 }} />
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
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <IconButton
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ p: 1 }}
        >
          <WhatsAppIcon sx={{ color: "#25D366", fontSize: 32 }} />
        </IconButton>
        <IconButton
          href={`mailto:${email}`}
          sx={{ p: 1 }}
        >
          <EmailIcon sx={{ color: "#f5c542", fontSize: 32 }} />
        </IconButton>
        <IconButton
          href={instagramUrl1}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ p: 1 }}
        >
          <InstagramIcon sx={{ color: "#ee2a7b", fontSize: 32 }} />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" align="center" mt={3}>
        © {new Date().getFullYear()} Nicolas Di Fabio. Todos los derechos
        reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
