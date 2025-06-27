import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

const BackBreadcrumb = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}
      sx={{
        width: 100,
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        color: 'black',
      }}
    >
      Volver
    </Button>
  );
};

export default BackBreadcrumb;