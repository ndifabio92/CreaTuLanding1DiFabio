import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6BBC87",
      light: "#006989",
      dark: "#006989",
      "100": "#649575",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#79D7BE",
      light: "#5df2d6",
      dark: "#008e76",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fd",
      paper: "#ffffff",
    },
    error: {
      main: "#ff3d71",
      light: "#ff7a9e",
      dark: "#c60055",
    },
    divider: "rgba(143, 155, 179, 0.2)",
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      textTransform: "capitalize",
      textAlign: "left",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0 0 0 0",
          "@media (min-width:600px)": {
            padding: "0 0 0 0",
          },
          "@media (min-width:960px)": {
            padding: "0 0 0 0",
          },
          "@media (min-width:1280px)": {
            padding: "0 0 0 0",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          padding: "10px 20px",
          transition: "all 0.2s ease-in-out",
          fontWeight: 600,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #649575 30%, #649575 90%)",
          boxShadow: "0 3px 10px rgb(0, 105, 137, 0.5)",
        },

        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        outlinedError: {
          borderColor: "#ff3d71",
          color: "#ff3d71",
          "&:hover": {
            borderColor: "#ff3d71",
            borderWidth: "2px",
            backgroundColor: "rgba(158, 158, 158, 0.04)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {},
        elevation1: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0 7px 30px rgba(0, 0, 0, 0.07)",
        },
        elevation3: {
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover fieldset": {
              borderColor: "#006989",
              borderWidth: "2px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#005C78",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#005C78",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          overflow: "visible",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          // backgroundImage: '#6BBC87',
          background: "black",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: "0 15px 50px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          boxShadow: "5px 0 20px rgba(0, 0, 0, 0.08)",
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fd 100%)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(143, 155, 179, 0.2)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          width: "100% !important",
          justifyContent: "center",
          borderRadius: 8,
          marginTop: 4,
          marginBottom: 4,
          "&.Mui-selected": {
            backgroundColor: "rgba(0, 105, 137, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 105, 137, 0.5)",
            },
          },
        },
        padding: {
          "@media (min-width:300px)": {
            padding: "16px 0 16px 0",
          },
        },
      },
    },
  },
});

export default theme;
