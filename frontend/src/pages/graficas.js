import * as React from 'react';
import Paper from '@mui/material/Paper';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer";
import { Pie } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Diario() {
  const data = {
    labels: ['Estados Unidos', 'Mexico', 'Italia', 'Colombia', 'España'],
    datasets: [
      {
        label: 'Habitantes',
        backgroundColor: ['red', 'blue', 'green', 'yellow', 'pink'],
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(24,118,210,0.2)',
        hoverBorderColor: 'white',
        data: [327.16, 126.19, 60.43, 49.64, 46.72]
      },
      {
        label: 'precios',
        backgroundColor: ['red', 'blue', 'green', 'yellow', 'pink'],
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(24,118,210,0.2)',
        hoverBorderColor: 'white',
        data: [123, 112, 323, 123, 213]
      },


    ]
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }

  return (
    <Container disableGutters sx={{minWidth:"100%", height:"100%"}}>

      <Header />
      <Box>Provincia dia rangoDePrecios </Box>

      <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
        <Bar data={data} options={opciones} />
      </Box>
      <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
        <Bar data={data} options={opciones} />
      </Box>
      <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
        <Bar data={data} options={opciones} />
      </Box>
      <Box sx={{ marginTop: "60px", position: "relative" }}>
        <Footer />
      </Box>
      </Container>

  );
};

