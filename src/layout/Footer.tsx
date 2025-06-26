import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Typography, Stack, Link } from '@mui/material';

const phone = '111111';
const email = '';
const instagram1 = 'instagram';
const instagramUrl1 = 'isntagram';
const whatsappNumber = '11111';

const Footer = () => {
  return (
    <Box component="footer" sx={{
      width: '100%',
      mt: 6,
      py: 3,
      px: { xs: 2, sm: 6 },
      bgcolor: 'background.paper',
      borderTop: '1px solid #eee',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.03)',
    }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        {/* WhatsApp */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WhatsAppIcon sx={{ color: '#25D366', fontSize: 32 }} />
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ color: '#f5c542', fontSize: 32 }} />
          <Link href={`mailto:${email}`} underline="none" color="inherit" fontWeight={500}>
            {email || 'Email'}
          </Link>
        </Box>
        {/* Instagram */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InstagramIcon sx={{ color: '#ee2a7b', fontSize: 32 }} />
          <Link href={instagramUrl1} target="_blank" rel="noopener noreferrer" underline="none" color="inherit" fontWeight={500}>
            @{instagram1}
          </Link>
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center" mt={3}>
        © {new Date().getFullYear()} CreaTuLanding1DiFabio. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer; 