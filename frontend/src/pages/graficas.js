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
import axios from "axios";
import dayjs from 'dayjs';
import esLocale from 'dayjs/locale/es';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function createDataGasolineras(name, numero) {
  return {
    name, numero
  };
}

function createDataGasolinerasBar(mes_y_anio, gasolina95_e5, gasolina95e5, gasoleoA, gasoleoB, gasoleoPremium) {
  return {
    mes_y_anio, gasolina95_e5, gasolina95e5, gasoleoA, gasoleoB, gasoleoPremium
  };
}


export default function Diario() {

  dayjs.locale('es')
  const [openBar, setOpenBar] = React.useState(false);


  const [listaProvincias, setListaProvincias] = useState([])
  const [rotulosBarList, setRotulosBarList] = useState([]);

  const [provinciaBar, setProvinciaBar] = useState("CASTELLÓN");
  const [rotulosBar, setRotulosBar] = useState("CEPSA")

  const [startDateBar, setStartDateBar] = useState(null);
  const [endDateBar, setEndDateBar] = useState(null);





  const [provinciaLine, setProvinciaLine] = useState("");
  const [rotulosLine, setRotulosLine] = useState([]);
  const [startDateLine, setStartDateLine] = useState(null);
  const [endDateLine, setEndDateLine] = useState(null);


  const [provinciaPie, setProvinciaPie] = useState("CASTELLÓN"); // valor por defecto
  const [rotulosPie, setRotulosPie] = useState([]);
  const [startDatePie, setStartDatePie] = useState(null);
  const [endDatePie, setEndDatePie] = useState(null);


  const [dataGraphLine, setDataGraphLine] = useState([])


  const [numGasolineras1, setNumGasolineras1] = useState([])
  const [numGasolineras2, setNumGasolineras2] = useState([])
  const [numGasolineras3, setNumGasolineras3] = useState([])
  const [numGasolineras4, setNumGasolineras4] = useState([])
  const [numGasolineras5, setNumGasolineras5] = useState([])

  const [rowsGasolineras, setRowsGasolineras] = useState([])
  const [rowsBarGraph, setRowsBarGraph] = useState([])



  useEffect(() => {
    async function fetchProvincias() {
      const provinciasArray = await getProvincias();

      setListaProvincias(provinciasArray);
    }
    fetchProvincias();
  }, []);

  useEffect(() => {
    async function fetchPieData() {
      let res = null;
      if (provinciaPie != "") {
        res = await axios.get('http://localhost:3002/graficas/getPieData/' + provinciaPie);
      } else {
        res = await axios.get('http://localhost:3002/graficas/getPieData/' + 'CASTELLÓN');
      }

      setNumGasolineras1(res.data[0]);
      setNumGasolineras2(res.data[1]);
      setNumGasolineras3(res.data[2]);
      setNumGasolineras4(res.data[3]);
      setNumGasolineras5(res.data[4]);

    }
    fetchPieData();
  }, [provinciaPie]);


  useEffect(() => {
    async function fetchBarData() {
      console.log(provinciaBar)
      console.log(rotulosBar)
      console.log(startDateBar)
      console.log(endDateBar)

      if (provinciaBar == "" || rotulosBar == "" || startDateBar == null || endDateBar == null) {
        console.log("+")

        axios.post('http://localhost:3002/graficas/getBarData', {
          provincia: "CASTELLÓN",
          rotulosBar: "CEPSA",
          startDate: '2022-12-31T23:00:00.000Z',
          endDate: '2023-03-31T22:00:00.000Z'
        })
          .then(function (res) {
            console.log(res.data);
            const newRowsGasolineras = [];
            // Aquí iteramos a través de res
            for (let i = 0; i < res.data.length; i++) {
              console.log("************")
              console.log(i)
              console.log(res.data[i]["MES_Y_ANIO"])
              const dateStart = new Date('2022-12-31T00:00:00');
              const objDateStart = {
                $D: dateStart.getDate(),
                $H: dateStart.getHours(),
                $L: 'es',
                $M: dateStart.getMonth(),
                $W: dateStart.getDay(),
                $d: dateStart,
                $m: dateStart.getMinutes(),
                $ms: dateStart.getMilliseconds(),
                $s: dateStart.getSeconds(),
                $u: undefined,
                $x: {},
                $y: dateStart.getFullYear()
              };
              setStartDateBar(objDateStart);

              const dateEnd = new Date('2022-12-31T00:00:00');
              const objDateEnd = {
                $D: dateEnd.getDate(),
                $H: dateEnd.getHours(),
                $L: 'es',
                $M: dateEnd.getMonth(),
                $W: dateEnd.getDay(),
                $d: dateStart,
                $m: dateEnd.getMinutes(),
                $ms: dateEnd.getMilliseconds(),
                $s: dateEnd.getSeconds(),
                $u: undefined,
                $x: {},
                $y: dateEnd.getFullYear()
              };
              setEndDateBar(objDateEnd);
              // setEndDateBar('2023-03-31T22:00:00.000Z');
              newRowsGasolineras.push([res.data[i]["MES_Y_ANIO"], res.data[i]["PRECIO_MEDIO_GASOLINA95_E5"], res.data[i]["PRECIO_MEDIO_GASOLINA98_E5"], res.data[i]["PRECIO_GASOLEO_A"], res.data[i]["PRECIO_GASOLEO_B"], res.data[i]["PRECIO_GASOLEO_PREMIUM"]])
            }
            setRowsBarGraph(newRowsGasolineras)
            console.log("A ver que pasa")
            console.log(newRowsGasolineras)
            console.log("Esto paso")


          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    fetchBarData();
  }, [])






  useEffect(() => {
    const newRowsGasolineras = [
      createDataGasolineras(numGasolineras1["ROTULO"], numGasolineras1["NUMERO_DE_GASOLINERAS"]),
      createDataGasolineras(numGasolineras2["ROTULO"], numGasolineras2["NUMERO_DE_GASOLINERAS"]),
      createDataGasolineras(numGasolineras3["ROTULO"], numGasolineras3["NUMERO_DE_GASOLINERAS"]),
      createDataGasolineras(numGasolineras4["ROTULO"], numGasolineras4["NUMERO_DE_GASOLINERAS"]),
      createDataGasolineras(numGasolineras5["ROTULO"], numGasolineras5["NUMERO_DE_GASOLINERAS"]),
    ];
    setRowsGasolineras(newRowsGasolineras);
  }, [numGasolineras1]);




  async function getRotulosFunctBar(provincia) {
    const rotulosArrayBar = await getRotulos(provincia);
    setRotulosBarList(rotulosArrayBar);
  }


  const minSelectableDate = dayjs("2022-12-01");


  const maxSelectableDate = dayjs().startOf('month');

  const handleStartDateChangeBar = (newDate) => {
    // Establecer la nueva fecha de inicio y validar que sea anterior a la fecha de finalización
    console.log(newDate)

    setStartDateBar(newDate);
    if (endDateBar && newDate > endDateBar) {
      setEndDateBar(newDate);
    }
  };

  const handleEndDateChangeBar = (newDate) => {
    // Establecer la nueva fecha de finalización y validar que sea posterior a la fecha de inicio
    setEndDateBar(newDate);
    if (startDateBar && newDate < startDateBar) {
      setEndDateBar(newDate);
    }
  };



  const handleChangeProvinciaBar = (provincia) => {
    setProvinciaBar(provincia);
    getRotulosFunctBar(provincia);
    setRotulosBar("")
  }

  const handleChangeRotuloBar = (rotulo) => {
    setRotulosBar(rotulo);
  }

  const handleChangeProvinciaPie = (provincia) => {
    setProvinciaPie(provincia);
  }

  const handleFiltrarBar = () => {
    // console.log(provinciaBarList)
    console.log("********")
    console.log(provinciaBar)
    console.log(rotulosBar)
    console.log(startDateBar)
    console.log(endDateBar)
    // console.log(endDateBar)
    console.log("********")
    if (provinciaBar != "" && rotulosBar != "" && startDateBar != null && endDateBar != null) {
      //aqui realizamos la accion
      setOpenBar(false);
      //hacemos la peticion axios
      async function fetchPieData() {
        let res = null;
        axios.post('http://localhost:3002/graficas/getBarData', {
          provincia: provinciaBar,
          rotulosBar: rotulosBar,
          startDate: startDateBar["$d"],
          endDate: endDateBar["$d"]
        })
          .then(function (res) {
            console.log(res.data);
            const newRowsGasolineras = [];
            // Aquí iteramos a través de res
            for (let i = 0; i < res.data.length; i++) {
              console.log("************")
              console.log(i)
              console.log(res.data[i]["MES_Y_ANIO"])
              newRowsGasolineras.push([res.data[i]["MES_Y_ANIO"], res.data[i]["PRECIO_MEDIO_GASOLINA95_E5"], res.data[i]["PRECIO_MEDIO_GASOLINA98_E5"], res.data[i]["PRECIO_GASOLEO_A"], res.data[i]["PRECIO_GASOLEO_B"], res.data[i]["PRECIO_GASOLEO_PREMIUM"]])
            }
            setRowsBarGraph(newRowsGasolineras)
            console.log("A ver que pasa")
            console.log(newRowsGasolineras)
            console.log("Esto paso")


          })
          .catch(function (error) {
            console.log(error);
          });

      }
      fetchPieData()
    } else {
      //sacamos error
      setOpenBar(true);
      console.log("error")
    }
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
            value={provinciaBar} // valor inicial

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
            options={rotulosBarList}
            value={rotulosBar}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Rótulo" />}
            onChange={(event, value) => handleChangeRotuloBar(value)}



          />
        </Box>
        <Box>
          <Typography>Mes inicio</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              disableFuture
              views={['year', 'month']}
              defaultValue={dayjs('2022-12-17')}
              // value={startDateBar}

              onChange={handleStartDateChangeBar}
              minDate={minSelectableDate}
              maxDate={maxSelectableDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Mes fin</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              disableFuture
              views={['year', 'month']}
              defaultValue={dayjs('2023-03-17')}
              onChange={handleEndDateChangeBar}
              minDate={minSelectableDate}
              maxDate={maxSelectableDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained"
            onClick={handleFiltrarBar}>
            Filtrar
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", mt: "0.8%" }}>
        <Collapse in={openBar}>

          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenBar(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Es obligatorio rellenar todos los campos
          </Alert>
        </Collapse>
      </Box>
      <BarGraph rows={rowsBarGraph} />
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
            options={rotulosBarList}
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
            value={provinciaPie} // valor inicial
            onChange={(event, value) => handleChangeProvinciaPie(value)}
          />
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained">Filtrar</Button>
        </Box>
      </Box>
      <PieGraph rows={rowsGasolineras} />


      <Box sx={{ marginTop: "60px", position: "relative" }}>
        <Footer />
      </Box>
    </Container>

  );
};

