import * as React from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ImagenGasolinera from "../imagenes/gasolinera.jpg";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header"
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


const styles = {
  paperContainer: {
    backgroundImage: `url(${ImagenGasolinera})`,
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};

const theme = createTheme({
  typography: {
    titulo: {
      color: "white",
      fontSize: "50px",
      fontWeight: "bold",
    },
    texto: {
      color: "white",
      fontSize: "20px",
    },
  },
});

export default function Inicio() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);


  return (
    <Box>
      <Paper style={styles.paperContainer}>

        <Header />
        <Collapse in={open}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            En esta página web no se recopila ningun tipo de dato del usuario
          </Alert>
        </Collapse>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "86vh",
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 10, mb: 2 }} maxWidth="sm">
            <ThemeProvider theme={theme}>
              <Typography variant="titulo">Gasolineras</Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Typography variant="texto" component="h2" gutterBottom>
                {"Tramiento de datos de gasolineras a nivel Nacional."}
              </Typography>
            </ThemeProvider>
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: 20,
                marginTop: "2%"
              }}
              onClick={(e) => navigate("/graficas")}
              variant="contained"
            >
              Comencemos
            </Button>
          </Container>

        </Box>
      </Paper>
      <Footer />
    </Box>
  );
}
