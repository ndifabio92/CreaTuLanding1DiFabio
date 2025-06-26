import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Typography, Stack, Link } from '@mui/material';

const phone = '111111';
const email = '';
const instagram1 = 'instagram';
const instagramUrl1 = 'isntagram';
const whatsappNumber = '11111';

const Contact = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6, p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Datos
      </Typography>
      <Typography mb={1}>Ventas:</Typography>
      <Typography fontWeight={500}>Nando</Typography>
      <Typography mb={1}>{phone}</Typography>
      
      <Typography mb={2}>
        Direccion del showroom con previa coordinacion:<br />
      </Typography>

      <Stack spacing={3} mt={4}>
        {/* WhatsApp */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ bgcolor: '#25D366', borderRadius: 2, p: 1 }}>
            <WhatsAppIcon sx={{ color: 'white', fontSize: 48 }} />
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ bgcolor: '#f5c542', borderRadius: 2, p: 1 }}>
            <EmailIcon sx={{ color: '#333', fontSize: 48 }} />
          </Box>
          <Box>
            <Typography fontWeight={600}>Correo electrónico</Typography>
            <Link href={`mailto:${email}`} underline="none" color="inherit">
              {email}
            </Link>
          </Box>
        </Box>
        {/* Instagram */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
              borderRadius: 2,
              p: 1,
            }}
          >
            <InstagramIcon sx={{ color: 'white', fontSize: 48 }} />
          </Box>
          <Box>
            <Typography fontWeight={600}>Instagram</Typography>
            <Link href={instagramUrl1} target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
              @{instagram1}
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Contact;
