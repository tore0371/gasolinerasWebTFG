import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[200],
        position: 'fixed',
        bottom: 0,
        width: '100%'   
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="caption">
          TFG realizado por Salvador Rodriguez Abad y tutorizado por Francisco
          Favier Fodríguez Lera.
        </Typography>
      </Container>
    </Box>
  );
}
