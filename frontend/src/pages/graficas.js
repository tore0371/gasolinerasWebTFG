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
  const [openLine, setOpenLine] = React.useState(false);


  const [listaProvincias, setListaProvincias] = useState([])
  const [rotulosBarList, setRotulosBarList] = useState([]);

  const [provinciaBar, setProvinciaBar] = useState("CASTELLÓN");
  const [rotulosBar, setRotulosBar] = useState("CEPSA")

  const [startDateBar, setStartDateBar] = useState(null);
  const [endDateBar, setEndDateBar] = useState(null);




  const [rotulosLineList, setRotulosLineList] = useState([]);

  const [provinciaLine, setProvinciaLine] = useState("CASTELLÓN");
  const [rotulosLine, setRotulosLine] = useState("CEPSA");
  const [startDateLine, setStartDateLine] = useState(null);
  const [endDateLine, setEndDateLine] = useState(null);


  const [provinciaPie, setProvinciaPie] = useState("CASTELLÓN"); // valor por defecto



  const [dataGraphLine, setDataGraphLine] = useState([])


  const [numGasolineras1, setNumGasolineras1] = useState([])
  const [numGasolineras2, setNumGasolineras2] = useState([])
  const [numGasolineras3, setNumGasolineras3] = useState([])
  const [numGasolineras4, setNumGasolineras4] = useState([])
  const [numGasolineras5, setNumGasolineras5] = useState([])

  const [rowsGasolineras, setRowsGasolineras] = useState([])
  const [rowsBarGraph, setRowsBarGraph] = useState([])
  const [rowsLineGraph, setRowsLineGraph] = useState([])




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

  // cargar datos graph graph
  useEffect(() => {
    async function fetchBarData() {
      const dateStart = new Date('2022-12-01T00:00:00');
      const dateEnd = new Date('2023-03-01T00:00:00');
      setStartDateBar(dateStart);
      setEndDateBar(dateEnd);

      axios.post('http://localhost:3002/graficas/getBarData', {
        provincia: "CASTELLÓN",
        rotulosBar: "CEPSA",
        startDate: dateStart,
        endDate: dateEnd
      })
        .then(function (res) {
          const newRowsGasolineras = [];
          // Aquí iteramos a través de res
          for (let i = 0; i < res.data.length; i++) {

            newRowsGasolineras.push([res.data[i]["MES_Y_ANIO"], res.data[i]["PRECIO_MEDIO_GASOLINA95_E5"], res.data[i]["PRECIO_MEDIO_GASOLINA98_E5"], res.data[i]["PRECIO_GASOLEO_A"], res.data[i]["PRECIO_GASOLEO_B"], res.data[i]["PRECIO_GASOLEO_PREMIUM"]])
          }
          setRowsBarGraph(newRowsGasolineras)
        })
        .catch(function (error) {
        });

    }
    fetchBarData();
  }, [])

  //cargar datos line graph
  useEffect(() => {
    async function fetchLineData() {
      const dateStart = new Date('2022-12-17T00:00:00');
      setStartDateLine(dateStart);

      const dateEnd = new Date('2023-03-17T00:00:00');
      setEndDateLine(dateEnd);

      axios.post('http://localhost:3002/graficas/getLineData', {
        provincia: "CASTELLÓN",
        rotulosBar: "CEPSA",
        startDate: dateStart,
        endDate: dateEnd
      })
        .then(function (res) {
          const newRowsGasolineras = [];
          // Aquí iteramos a través de res
          for (let i = 0; i < res.data.length; i++) {
            newRowsGasolineras.push([res.data[i]["FECHA_FORMATO"], res.data[i]["PRECIO_MEDIO_GASOLINA95_E5"], res.data[i]["PRECIO_MEDIO_GASOLINA98_E5"], res.data[i]["PRECIO_GASOLEO_A"], res.data[i]["PRECIO_GASOLEO_B"], res.data[i]["PRECIO_GASOLEO_PREMIUM"]])
          }
          setRowsLineGraph(newRowsGasolineras)
        })
        .catch(function (error) {
          console.log("ERROR PETICION -> " + error)
        });


    }
    fetchLineData();
  }, []);




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


  async function getRotulosFunctLine(provincia) {
    const rotulosArrayLine = await getRotulos(provincia);
    setRotulosLineList(rotulosArrayLine);
  }


  const minSelectableDate = dayjs("2022-12-01");


  const maxSelectableDate = dayjs().startOf('month');

  const handleStartDateChangeBar = (newDate) => {
    // Establecer la nueva fecha de inicio y validar que sea anterior a la fecha de finalización

    setStartDateBar(newDate["$d"]);
    if (endDateBar && newDate > endDateBar) {
      setEndDateBar(newDate["$d"]);
    }
  };


  const handleStartDateChangeLine = (newDate) => {
    // Establecer la nueva fecha de inicio y validar que sea anterior a la fecha de finalización

    setStartDateLine(newDate["$d"]);
    if (endDateLine && newDate > endDateLine) {
      setEndDateLine(newDate["$d"]);
    }
  };

  const handleEndDateChangeBar = (newDate) => {
    // Establecer la nueva fecha de finalización y validar que sea posterior a la fecha de inicio
    setEndDateBar(newDate["$d"]);
    if (startDateBar && newDate < startDateBar) {
      setEndDateBar(newDate["$d"]);
    }
  };


  const handleEndDateChangeLine = (newDate) => {
    // Establecer la nueva fecha de finalización y validar que sea posterior a la fecha de inicio
    setEndDateLine(newDate["$d"]);
    if (startDateLine && newDate < startDateLine) {
      setEndDateLine(newDate["$d"]);
    }
  };



  const handleChangeProvinciaBar = (provincia) => {
    setProvinciaBar(provincia);
    getRotulosFunctBar(provincia);
    setRotulosBar("")
  }

  const handleChangeProvinciaLine = (provincia) => {
    setProvinciaLine(provincia);
    getRotulosFunctLine(provincia);
    setRotulosLine("")
  }

  const handleChangeRotuloBar = (rotulo) => {
    setRotulosBar(rotulo);
  }

  const handleChangeRotuloLine = (rotulo) => {
    setRotulosLine(rotulo);
  }




  const handleChangeProvinciaPie = (provincia) => {
    setProvinciaPie(provincia);
  }

  const handleFiltrarBar = () => {
    console.log(provinciaBar)
    console.log(rotulosBar)
    console.log(startDateBar)
    console.log(endDateBar)
    if (provinciaBar != "" && rotulosBar != "" && startDateBar != null && endDateBar != null) {
      //aqui realizamos la accion
      setOpenBar(false);
      //hacemos la peticion axios
      async function fetchPieData() {
        let res = null;
        axios.post('http://localhost:3002/graficas/getBarData', {
          provincia: provinciaBar,
          rotulosBar: rotulosBar,
          startDate: startDateBar,
          endDate: endDateBar
        })
          .then(function (res) {
            const newRowsGasolineras = [];
            // Aquí iteramos a través de res
            for (let i = 0; i < res.data.length; i++) {
              newRowsGasolineras.push([res.data[i]["MES_Y_ANIO"], res.data[i]["PRECIO_MEDIO_GASOLINA95_E5"], res.data[i]["PRECIO_MEDIO_GASOLINA98_E5"], res.data[i]["PRECIO_GASOLEO_A"], res.data[i]["PRECIO_GASOLEO_B"], res.data[i]["PRECIO_GASOLEO_PREMIUM"]])
            }
            setRowsBarGraph(newRowsGasolineras)
          })
          .catch(function (error) {
          });

      }
      fetchPieData()
    } else {
      //sacamos error
      setOpenBar(true);
    }
  }

  const handleFiltrarLine = () => {
    console.log(provinciaLine)
    console.log(rotulosLine)
    console.log(startDateLine)
    console.log(endDateLine)
    if (provinciaLine != "" && rotulosLine != "" && startDateLine != null && endDateLine != null) {
      console.log("hola 1")
      async function fetchLineData() {
        axios.post('http://localhost:3002/graficas/getLineData', {
          provincia: provinciaLine,
          rotulosBar: rotulosLine,
          startDate: startDateLine,
          endDate: endDateLine
        })
          .then(function (res) {
            const newRowsGasolineras = [];

            console.log("A VER QUE ESTA PASANDO")
            console.log(res.data)
            console.log("A VER QUE HA DEJADO DE PASAR")

            // Aquí iteramos a través de res
            for (let i = 0; i < res.data.length; i++) {
              newRowsGasolineras.push([res.data[i]["FECHA_FORMATO"], res.data[i]["PRECIO_MEDIO_GASOLINA95_E5"], res.data[i]["PRECIO_MEDIO_GASOLINA98_E5"], res.data[i]["PRECIO_GASOLEO_A"], res.data[i]["PRECIO_GASOLEO_B"], res.data[i]["PRECIO_GASOLEO_PREMIUM"]])
            }
            console.log(newRowsGasolineras)


            setRowsLineGraph(newRowsGasolineras)
          })
          .catch(function (error) {
            console.log("ERROR PETICION -> " + error)
          });


      }
      fetchLineData();

    } else {
      setOpenLine(true)
      console.log("hola 2")

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
              defaultValue={dayjs('2022-12-01')}
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
              defaultValue={dayjs('2023-03-01')}
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
            value={provinciaLine} // valor inicial
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
            onChange={(event, value) => handleChangeProvinciaLine(value)}
          />
        </Box>
        <Box>
          <Typography>Seleccione un rótulo</Typography>
          <Autocomplete
            disablePortal
            disabled={!provinciaLine}
            id="combo-box-demo"
            options={rotulosLineList}
            value={rotulosLine}
            sx={{ width: 300, marginTop: '3%' }}
            renderInput={(params) => <TextField {...params} label="Rótulo" />}
            onChange={(event, value) => handleChangeRotuloLine(value)}

          />
        </Box>
        <Box>
          <Typography>Mes inicio</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              // value={startDateBar}
              defaultValue={dayjs('2022-12-17')}

              onChange={handleStartDateChangeLine}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>Mes fin</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginTop: '3%' }}
              // value={endDateBar}
              defaultValue={dayjs('2023-03-17')}

              onChange={handleEndDateChangeLine}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "1%" }}>
          <Button variant="contained"
            onClick={handleFiltrarLine}>
            Filtrar
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", mt: "0.8%" }}>
        <Collapse in={openLine}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenLine(false);
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

      <LineGraph rows={rowsLineGraph} />

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

