import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer";
import { Pie } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
// import { Line } from 'react-chartjs-2'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import provincias from '../helpers/provincias'
import getRotulos from '../helpers/rotulos'
import BarGraph from '../components/graphs/barGraph';
import LineGraph from '../components/graphs/lineGraph';
import PieGraph from '../components/graphs/pieGraph';




export default function Diario() {
  const [provincia, setProvincia] = useState("");
  const [rotulos, setRotulos] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  useEffect(() => {
    async function fetchRotulos() {
      const rotulosArray = await getRotulos();
      setRotulos(rotulosArray);
      // console.log(rotulos)
    }
    fetchRotulos();
  }, []);





  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Container disableGutters sx={{ minWidth: "100%", height: "100%" }}>

      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', justifyContent: "center", marginTop: "2%" }}>
        <Box>
          <Typography>Seleccione una provincia</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={provincias}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
            onChange={(event, value) => setProvincia(value) && console.log(value)}
          />
        </Box>
        <Box>
          <Typography>Seleccione un rótulo</Typography>
          <Autocomplete
            disablePortal
            disabled={!provincia}
            id="combo-box-demo"
            options={rotulos}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Rótulo" />}
          />
        </Box>
        <Box>
          <Typography>Fecha inicio</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={startDate}
              onChange={handleStartDateChange}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Fecha fin</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained">Filtrar</Button>
        </Box>
      </Box>

      <BarGraph />
      <LineGraph />
      <PieGraph />


      <Box sx={{ marginTop: "60px", position: "relative" }}>
        <Footer />
      </Box>
    </Container>

  );
};

