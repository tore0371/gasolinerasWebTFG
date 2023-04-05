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
import getProvincias from '../helpers/provincias'
import getRotulos from '../helpers/rotulos'
import BarGraph from '../components/graphs/barGraph';
import LineGraph from '../components/graphs/lineGraph';
import PieGraph from '../components/graphs/pieGraph';




export default function Diario() {
  const [listaProvincias, setListaProvincias] = useState([])

  const [provinciaBar, setProvinciaBar] = useState("");
  const [rotulosBar, setRotulosBar] = useState([]);
  const [startDateBar, setStartDateBar] = useState(null);
  const [endDateBar, setEndDateBar] = useState(null);

  const [provinciaLine, setProvinciaLine] = useState("");
  const [rotulosLine, setRotulosLine] = useState([]);
  const [startDateLine, setStartDateLine] = useState(null);
  const [endDateLine, setEndDateLine] = useState(null);


  const [provinciaPie, setProvinciaPie] = useState("");
  const [rotulosPie, setRotulosPie] = useState([]);
  const [startDatePie, setStartDatePie] = useState(null);
  const [endDatePie, setEndDatePie] = useState(null);


  useEffect(() => {
    async function fetchProvincias() {
      const provinciasArray = await getProvincias();
      console.log("entre")
      console.log(provinciasArray)
      setListaProvincias(provinciasArray);
      // console.log(rotulos)
    }
    fetchProvincias();
  }, []);



  async function getRotulosFunctBar(provincia) {
    const rotulosArrayBar = await getRotulos(provincia);
    setRotulosBar(rotulosArrayBar);
  }
  async function getRotulosFunctLine(provincia) {
    const rotulosArrayLine = await getRotulos(provincia);
    setRotulosLine(rotulosArrayLine);
  }
  async function getRotulosFunctPie(provincia) {
    const rotulosArrayPie = await getRotulos(provincia);
    setRotulosPie(rotulosArrayPie);
  }



  const handleStartDateChangeBar = (date) => {
    setStartDateBar(date);
  };

  const handleEndDateChangeBar = (date) => {
    setEndDateBar(date);
  };

  const handleStartDateChangeLine = (date) => {
    setStartDateLine(date);
  };

  const handleEndDateChangeLine = (date) => {
    setEndDateLine(date);
  };
  const handleStartDateChangePie = (date) => {
    setStartDatePie(date);
  };

  const handleEndDateChangePie = (date) => {
    setEndDatePie(date);
  };


  const handleChangeProvinciaBar = (provincia) => {
    setProvinciaBar(provincia);
    console.log(provincia)
    getRotulosFunctBar(provincia)
  }

  return (
    <Container disableGutters sx={{ minWidth: "100%", height: "100%" }}>

      <Header />
      <Typography
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1%", fontWeight: "bold", fontSize: "180%" }}>
        Precios mensuales filtrados por estación
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', justifyContent: "center", marginTop: "1%" }}>
        <Box>
          <Typography>Seleccione una provincia</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaProvincias}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
            onChange={(event, value) => handleChangeProvinciaBar(value)}
          />
        </Box>
        <Box>
          <Typography>Seleccione un rótulo</Typography>
          <Autocomplete
            disablePortal
            disabled={!provinciaBar}
            id="combo-box-demo"
            options={rotulosBar}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Rótulo" />}
          />
        </Box>
        <Box>
          <Typography>Mes inicio</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={startDateBar}
              onChange={handleStartDateChangeBar}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Mes fin</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={endDateBar}
              onChange={handleEndDateChangeBar}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained">Filtrar</Button>
        </Box>
      </Box>
      <BarGraph />
      <Typography
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1%", fontWeight: "bold", fontSize: "180%" }}>
        Precios diarios filtrados por estación
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', justifyContent: "center", marginTop: "1%" }}>
        <Box>
          <Typography>Seleccione una provincia</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaProvincias}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
            onChange={(event, value) => handleChangeProvinciaBar(value)}
          />
        </Box>
        <Box>
          <Typography>Seleccione un rótulo</Typography>
          <Autocomplete
            disablePortal
            disabled={!provinciaBar}
            id="combo-box-demo"
            options={rotulosBar}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Rótulo" />}
          />
        </Box>
        <Box>
          <Typography>Mes inicio</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={startDateBar}
              onChange={handleStartDateChangeBar}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Mes fin</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={endDateBar}
              onChange={handleEndDateChangeBar}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained">Filtrar</Button>
        </Box>
      </Box>

      <LineGraph />
      <Typography
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1%", fontWeight: "bold", fontSize: "180%" }}>
        Número de estaciones por provincia
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', justifyContent: "center", marginTop: "1%" }}>
        <Box>
          <Typography>Seleccione una provincia</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listaProvincias}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
            onChange={(event, value) => handleChangeProvinciaBar(value)}
          />
        </Box>
        <Box>
          <Typography>Seleccione un rótulo</Typography>
          <Autocomplete
            disablePortal
            disabled={!provinciaBar}
            id="combo-box-demo"
            options={rotulosBar}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Rótulo" />}
          />
        </Box>
        <Box>
          <Typography>Mes inicio</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={startDateBar}
              onChange={handleStartDateChangeBar}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Mes fin</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              value={endDateBar}
              onChange={handleEndDateChangeBar}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained">Filtrar</Button>
        </Box>
      </Box>
      <PieGraph />


      <Box sx={{ marginTop: "60px", position: "relative" }}>
        <Footer />
      </Box>
    </Container>

  );
};

