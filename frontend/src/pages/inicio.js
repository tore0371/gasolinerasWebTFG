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

  return (
    <Box>
      <Paper style={styles.paperContainer}>

        <Header />
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
              }}
              onClick={(e) => navigate("/diario")}
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
