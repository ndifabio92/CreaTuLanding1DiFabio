import { Button, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import theme from "../../styles/theme";

const BackBreadcrumb = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isMobile ? null : (
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            width: 100,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            color: "black",
          }}
        >
          Volver
        </Button>
      )}
    </>
  );
};

export default BackBreadcrumb;
