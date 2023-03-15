import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer";
import { Pie } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
// import { Line } from 'react-chartjs-2'


import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import provincias from '../helpers/provincias'
import getRotulos from '../helpers/rotulos'



export default function Diario() {
  const [rotulos, setRotulos] = useState([]);

  useEffect(() => {
    async function fetchRotulos() {
      const rotulosArray = await getRotulos();
      setRotulos(rotulosArray);
      console.log(rotulos)
    }
    fetchRotulos();
  }, []);

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
    <Container disableGutters sx={{ minWidth: "100%", height: "100%" }}>

      <Header />
      <Box>Provincia dia rangoDePrecios </Box>


      <Box>
        <Paper>
          <Typography sx={{ fontSize: "20px" }}>
            Seleccione una gasolinera
          </Typography>
          <Box>
            <Typography>Seleccione una provincia:</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={provincias}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Provincia" />}
            />
          </Box>
          <Box>
            <Typography>Seleccione un rótulo</Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rotulos}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Provincia" />}
            />
          </Box>
        </Paper>
      </Box>

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

