import React from 'react'
import Footer from '../components/footer'
import Typography from "@mui/material/Typography";
import { Box } from '@mui/material';

export default function FooterContainer() {
  return (
    <Footer>
      <Box display="flex" justifyContent="center" >
        <Typography variant="caption" align="center">
          TFG realizado por Salvador Rodriguez Abad y tutorizado por Francisco
          Favier Fodríguez Lera.
        </Typography>
      </Box>
    </Footer>
  )
}