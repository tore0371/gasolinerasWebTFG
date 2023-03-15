import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import CustomTablePrecios from "../components/muiTablePrecios"
import CustomTableGasolineras from '../components/muiTableNumGasolineras';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';




function createDataPrecios(name, provincia, municipio, localidad, direccion, cp, rotulo, gasoleoA,
    gasoleoB, gasoleoPremium, gasolina95_E5, gasolina98_E5, fecha) {
    return {
        name, provincia, municipio, localidad, direccion, cp, rotulo,
        gasoleoA, gasoleoB, gasoleoPremium, gasolina95_E5, gasolina98_E5, fecha
    };
}

function createDataGasolineras(name, precio) {
    return {
        name, precio
    };
}

export default function BasicTable() {

    // gasoleo A
    const [minGasoilAToday, setminGasoilAToday] = useState([])
    const [minGasoilA, setMinGasoilA] = useState([])
    const [maxGasoilAToday, setMaxGasoilAToday] = useState([])
    const [maxGasoilA, setMaxGasoilA] = useState([])

    // gasoleo B
    const [minGasoilBToday, setMinGasoilBToday] = useState([])
    const [minGasoilB, setMinGasoilB] = useState([])
    const [maxGasoilBToday, setMaxGasoilBToday] = useState([])
    const [maxGasoilB, setMaxGasoilB] = useState([])

    // gasoleo premium
    const [minGasoilPremiumToday, setminGasoilPremiumToday] = useState([])
    const [minGasoilPremium, setMinGasoilPremium] = useState([])
    const [maxGasoilPremiumToday, setMaxGasoilPremiumToday] = useState([])
    const [maxGasoilPremium, setMaxGasoilPremium] = useState([])

    // gasolina 95
    const [minGasolina95Today, setminGasolina95Today] = useState([])
    const [minGasolina95, setMinGasolina95] = useState([])
    const [maxGasolina95Today, setMaxGasolina95Today] = useState([])
    const [maxGasolina95, setMaxGasolina95] = useState([])

    // gasolina 95
    const [minGasolina98Today, setminGasolina98Today] = useState([])
    const [minGasolina98, setMinGasolina98] = useState([])
    const [maxGasolina98Today, setMaxGasolina98Today] = useState([])
    const [maxGasolina98, setMaxGasolina98] = useState([])


    const [numGasolineras1, setNumGasolineras1] = useState([])
    const [numGasolineras2, setNumGasolineras2] = useState([])
    const [numGasolineras3, setNumGasolineras3] = useState([])
    const [numGasolineras4, setNumGasolineras4] = useState([])
    const [numGasolineras5, setNumGasolineras5] = useState([])
    const [numGasolineras6, setNumGasolineras6] = useState([])
    const [numGasolineras7, setNumGasolineras7] = useState([])
    const [numGasolineras8, setNumGasolineras8] = useState([])
    const [numGasolineras9, setNumGasolineras9] = useState([])
    const [numGasolineras10, setNumGasolineras10] = useState([])




    const [rowsPrecios, setRowsPrecios] = useState([])
    const [rowsGasolineras, setRowsGasolineras] = useState([])


    // gasoleo A
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getTablePreciosGasoleoA');
            setminGasoilAToday(res.data[0][0]);
            setMinGasoilA(res.data[1][0])
            setMaxGasoilAToday(res.data[2][0])
            setMaxGasoilA(res.data[3][0])
        };
        fetchData();
    }, []);

    // gasoleo B
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getTablePreciosGasoleoB');
            setMinGasoilBToday(res.data[0][0]);
            setMinGasoilB(res.data[1][0])
            setMaxGasoilBToday(res.data[2][0])
            setMaxGasoilB(res.data[3][0])
        };
        fetchData();
    }, []);

    // gasoleo premium
    useEffect(() => {

        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getTablePreciosGasoleoPremium');
            setminGasoilPremiumToday(res.data[0][0])
            setMinGasoilPremium(res.data[1][0])
            setMaxGasoilPremiumToday(res.data[2][0])
            setMaxGasoilPremium(res.data[3][0])
        }
        fetchData()
    }, []);

    // gasolina95e5
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getTablePreciosGasolina95');
            setminGasolina95Today(res.data[0][0])
            setMinGasolina95(res.data[1][0])
            setMaxGasolina95Today(res.data[2][0])
            setMaxGasolina95(res.data[3][0])
        }
        fetchData()
    }, []);

    //gasolina98
    useEffect(() => {
        const fetchData = async () => {
            const res98 = await axios.get('http://localhost:3002/resaltados/getTablePreciosGasolina98');
            setminGasolina98Today(res98.data[0][0])
            setMinGasolina98(res98.data[1][0])
            setMaxGasolina98Today(res98.data[2][0])
            setMaxGasolina98(res98.data[3][0])
            console.log("********")
            console.log(res98.data[3][0])
            console.log("********")

        }
        fetchData()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getGasolineras');
            setNumGasolineras1(res.data[0]);
            setNumGasolineras2(res.data[1]);
            setNumGasolineras3(res.data[2]);
            setNumGasolineras4(res.data[3]);
            setNumGasolineras5(res.data[4]);
            setNumGasolineras6(res.data[5]);
            setNumGasolineras7(res.data[6]);
            setNumGasolineras8(res.data[7]);
            setNumGasolineras9(res.data[8]);
            setNumGasolineras10(res.data[9]);


        };
        fetchData();
    }, []);




    useEffect(() => {

        const newRowsPrecios = [

            createDataPrecios('Gasoleo A más barato hoy', minGasoilAToday["provincia"], minGasoilAToday["municipio"], minGasoilAToday["localidad"],
                minGasoilAToday["direccion"], minGasoilAToday["cp"], minGasoilAToday["rotulo"], minGasoilAToday["gasoleoA"], minGasoilAToday["gasoleoB"],
                minGasoilAToday["gasoleoPremium"], minGasoilAToday["gasolina95e5"], minGasoilAToday["gasolina98e5"], minGasoilAToday["fecha"]),

            createDataPrecios('Gasoleo A más barato historico', minGasoilA["provincia"], minGasoilA["municipio"], minGasoilA["localidad"],
                minGasoilA["direccion"], minGasoilA["cp"], minGasoilA["rotulo"], minGasoilA["gasoleoA"], minGasoilA["gasoleoB"],
                minGasoilA["gasoleoPremium"], minGasoilA["gasolina95e5"], minGasoilA["gasolina98e5"], minGasoilA["fecha"]),

            createDataPrecios('Gasoleo A más caro hoy', maxGasoilAToday["provincia"], maxGasoilAToday["municipio"], maxGasoilAToday["localidad"],
                maxGasoilAToday["direccion"], maxGasoilAToday["cp"], maxGasoilAToday["rotulo"], maxGasoilAToday["gasoleoA"], maxGasoilAToday["gasoleoB"],
                maxGasoilAToday["gasoleoPremium"], maxGasoilAToday["gasolina95e5"], maxGasoilAToday["gasolina98e5"], minGasoilAToday["fecha"]),

            createDataPrecios('Gasoleo A más caro historico', maxGasoilA["provincia"], maxGasoilA["municipio"], maxGasoilA["localidad"],
                maxGasoilA["direccion"], maxGasoilA["cp"], maxGasoilA["rotulo"], maxGasoilA["gasoleoA"], maxGasoilA["gasoleoB"],
                maxGasoilA["gasoleoPremium"], maxGasoilA["gasolina95e5"], maxGasoilA["gasolina98e5"], maxGasoilA["fecha"]),

            createDataPrecios('Gasoleo B más barato hoy', minGasoilBToday["provincia"], minGasoilBToday["municipio"], minGasoilBToday["localidad"],
                minGasoilBToday["direccion"], minGasoilBToday["cp"], minGasoilBToday["rotulo"], minGasoilBToday["gasoleoA"], minGasoilBToday["gasoleoB"],
                minGasoilBToday["gasoleoPremium"], minGasoilBToday["gasolina95e5"], minGasoilBToday["gasolina98e5"], minGasoilBToday["fecha"]),

            createDataPrecios('Gasoleo B más barato historico', minGasoilB["provincia"], minGasoilB["municipio"], minGasoilB["localidad"],
                minGasoilB["direccion"], minGasoilB["cp"], minGasoilB["rotulo"], minGasoilB["gasoleoA"], minGasoilB["gasoleoB"],
                minGasoilB["gasoleoPremium"], minGasoilB["gasolina95e5"], minGasoilB["gasolina98e5"], minGasoilB["fecha"]),

            createDataPrecios('Gasoleo B más caro hoy', maxGasoilBToday["provincia"], maxGasoilBToday["municipio"], maxGasoilBToday["localidad"],
                maxGasoilBToday["direccion"], maxGasoilBToday["cp"], maxGasoilBToday["rotulo"], maxGasoilBToday["gasoleoA"], maxGasoilBToday["gasoleoB"],
                maxGasoilBToday["gasoleoPremium"], maxGasoilBToday["gasolina95e5"], maxGasoilBToday["gasolina98e5"], maxGasoilBToday["fecha"]),

            createDataPrecios('Gasoleo B más caro historico', maxGasoilB["provincia"], maxGasoilB["municipio"], maxGasoilB["localidad"],
                maxGasoilB["direccion"], maxGasoilB["cp"], maxGasoilB["rotulo"], maxGasoilB["gasoleoA"], maxGasoilB["gasoleoB"],
                maxGasoilB["gasoleoPremium"], maxGasoilB["gasolina95e5"], maxGasoilB["gasolina98e5"], maxGasoilB["fecha"]),

            createDataPrecios('Gasoleo Premium más barato hoy', minGasoilPremiumToday["provincia"], minGasoilPremiumToday["municipio"], minGasoilPremiumToday["localidad"],
                minGasoilPremiumToday["direccion"], minGasoilPremiumToday["cp"], minGasoilPremiumToday["rotulo"], minGasoilPremiumToday["gasoleoA"], minGasoilPremiumToday["gasoleoB"],
                minGasoilPremiumToday["gasoleoPremium"], minGasoilPremiumToday["gasolina95e5"], minGasoilPremiumToday["gasolina98e5"], minGasoilPremiumToday["fecha"]),

            createDataPrecios('Gasoleo Premium más barato historico', minGasoilPremium["provincia"], minGasoilPremium["municipio"], minGasoilPremium["localidad"],
                minGasoilPremium["direccion"], minGasoilPremium["cp"], minGasoilPremium["rotulo"], minGasoilPremium["gasoleoA"], minGasoilPremium["gasoleoB"],
                minGasoilPremium["gasoleoPremium"], minGasoilPremium["gasolina95e5"], minGasoilPremium["gasolina98e5"], minGasoilPremium["fecha"]),

            createDataPrecios('Gasoleo Premium más caro hoy', maxGasoilPremiumToday["provincia"], maxGasoilPremiumToday["municipio"], maxGasoilPremiumToday["localidad"],
                maxGasoilPremiumToday["direccion"], maxGasoilPremiumToday["cp"], maxGasoilPremiumToday["rotulo"], maxGasoilPremiumToday["gasoleoA"], maxGasoilPremiumToday["gasoleoB"],
                maxGasoilPremiumToday["gasoleoPremium"], maxGasoilPremiumToday["gasolina95e5"], maxGasoilPremiumToday["gasolina98e5"], maxGasoilPremiumToday["fecha"]),

            createDataPrecios('Gasoleo Premium más caro historico', maxGasoilPremium["provincia"], maxGasoilPremium["municipio"], maxGasoilPremium["localidad"],
                maxGasoilPremium["direccion"], maxGasoilPremium["cp"], maxGasoilPremium["rotulo"], maxGasoilPremium["gasoleoA"], maxGasoilPremium["gasoleoB"],
                maxGasoilPremium["gasoleoPremium"], maxGasoilPremium["gasolina95e5"], maxGasoilPremium["gasolina98e5"], maxGasoilPremium["fecha"]),

            createDataPrecios('Gasolina 95 e5 más barato hoy', minGasolina95Today["provincia"], minGasolina95Today["municipio"], minGasolina95Today["localidad"],
                minGasolina95Today["direccion"], minGasolina95Today["cp"], minGasolina95Today["rotulo"], minGasolina95Today["gasoleoA"], minGasolina95Today["gasoleoB"],
                minGasolina95Today["gasoleoPremium"], minGasolina95Today["gasolina95e5"], minGasolina95Today["gasolina98e5"], minGasolina95Today["fecha"]),

            createDataPrecios('Gasolina 95 e5 más barato historico', minGasolina95["provincia"], minGasolina95["municipio"], minGasolina95["localidad"],
                minGasolina95["direccion"], minGasolina95["cp"], minGasolina95["rotulo"], minGasolina95["gasoleoA"], minGasolina95["gasoleoB"],
                minGasolina95["gasoleoPremium"], minGasolina95["gasolina95e5"], minGasolina95["gasolina98e5"], minGasolina95["fecha"]),

            createDataPrecios('Gasolina 95 e5 más caro hoy', maxGasolina95Today["provincia"], maxGasolina95Today["municipio"], maxGasolina95Today["localidad"],
                maxGasolina95Today["direccion"], maxGasolina95Today["cp"], maxGasolina95Today["rotulo"], maxGasolina95Today["gasoleoA"], maxGasolina95Today["gasoleoB"],
                maxGasolina95Today["gasoleoPremium"], maxGasolina95Today["gasolina95e5"], maxGasolina95Today["gasolina98e5"], maxGasolina95Today["fecha"]),

            createDataPrecios('Gasolina 95 e5 más caro historico', maxGasolina95["provincia"], maxGasolina95["municipio"], maxGasolina95["localidad"],
                maxGasolina95["direccion"], maxGasolina95["cp"], maxGasolina95["rotulo"], maxGasolina95["gasoleoA"], maxGasolina95["gasoleoB"],
                maxGasolina95["gasoleoPremium"], maxGasolina95["gasolina95e5"], maxGasolina95["gasolina98e5"], maxGasolina95["fecha"]),

            createDataPrecios('Gasolina 98 e5 más barato hoy', minGasolina98Today["provincia"], minGasolina98Today["municipio"], minGasolina98Today["localidad"],
                minGasolina98Today["direccion"], minGasolina98Today["cp"], minGasolina98Today["rotulo"], minGasolina98Today["gasoleoA"], minGasolina98Today["gasoleoB"],
                minGasolina98Today["gasoleoPremium"], minGasolina98Today["gasolina95e5"], minGasolina98Today["gasolina98e5"], minGasolina98Today["fecha"]),

            createDataPrecios('Gasolina 98 e5 más barato historico', minGasolina98["provincia"], minGasolina98["municipio"], minGasolina98["localidad"],
                minGasolina98["direccion"], minGasolina98["cp"], minGasolina98["rotulo"], minGasolina98["gasoleoA"], minGasolina98["gasoleoB"],
                minGasolina98["gasoleoPremium"], minGasolina98["gasolina95e5"], minGasolina98["gasolina98e5"], minGasolina98["fecha"]),

            createDataPrecios('Gasolina 98 e5 más caro hoy', maxGasolina98Today["provincia"], maxGasolina98Today["municipio"], maxGasolina98Today["localidad"],
                maxGasolina98Today["direccion"], maxGasolina98Today["cp"], maxGasolina98Today["rotulo"], maxGasolina98Today["gasoleoA"], maxGasolina98Today["gasoleoB"],
                maxGasolina98Today["gasoleoPremium"], maxGasolina98Today["gasolina95e5"], maxGasolina98Today["gasolina98e5"], maxGasolina98Today["fecha"]),
            
                createDataPrecios('Gasolina 98 e5 más caro historico', maxGasolina98["provincia"], maxGasolina98["municipio"], maxGasolina98["localidad"],
                maxGasolina98["direccion"], maxGasolina98["cp"], maxGasolina98["rotulo"], maxGasolina98["gasoleoA"], maxGasolina98["gasoleoB"],
                maxGasolina98["gasoleoPremium"], maxGasolina98["gasolina95e5"], maxGasolina98["gasolina98e5"], maxGasolina98["fecha"]),

        ];
        setRowsPrecios(newRowsPrecios);

    }, [maxGasoilA, maxGasoilB, maxGasoilPremium,maxGasolina95 , maxGasolina98])


    useEffect(() => {
        const newRowsGasolineras = [
            createDataGasolineras(numGasolineras1["ROTULO"], numGasolineras1["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras2["ROTULO"], numGasolineras2["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras3["ROTULO"], numGasolineras3["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras4["ROTULO"], numGasolineras4["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras5["ROTULO"], numGasolineras5["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras6["ROTULO"], numGasolineras6["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras7["ROTULO"], numGasolineras7["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras8["ROTULO"], numGasolineras8["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras9["ROTULO"], numGasolineras9["NUMERO_DE_GASOLINERAS"]),
            createDataGasolineras(numGasolineras10["ROTULO"], numGasolineras10["NUMERO_DE_GASOLINERAS"]),
        ];
        setRowsGasolineras(newRowsGasolineras);
    }, [numGasolineras1]);


    return (
        <Box>
            <Header />
            <Box display={minGasolina98Today.length === 0 ? "none" : ""}>
                <CustomTablePrecios rows={rowsPrecios} title="Precios" />
                <CustomTableGasolineras rows={rowsGasolineras} title="Gasolineras" />
                <Box position={"relative"} bottom={0} minWidth={"100%"} >
                    <Footer />
                </Box>
            </Box>
            <Box display={minGasolina98Today.length === 0 ? "flex" : "none"}
                sx={{ flexDirection: "column", alignItems: "center", marginTop:"10%" }}> 
                <CircularProgress size={"7%"} />
                <Typography sx={{marginTop:"1%"}}>Se esta cargando esta opción</Typography>
                <Typography>Esta operacion puede tardar unos segundos</Typography>

                <Box position={"absolute"} bottom={0} minWidth={"100%"} >
                    <Footer />
                </Box>
            </Box>

        </Box>
    );
}
