import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import CustomTable from "../components/muiTablePrecios"
import axios from 'axios';




function createDataPrecios(name, provincia, municipio, localidad, direccion, cp, rotulo, gasoleoA,
    gasoleoB, gasoleoPremium, gasolina95_E5, gasolina98_E5, fecha) {
    return {
        name, provincia, municipio, localidad, direccion, cp, rotulo,
        gasoleoA, gasoleoB, gasoleoPremium, gasolina95_E5, gasolina98_E5, fecha
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





    const [rowsPrecios, setRowsPrecios] = useState([])

    // gasoleo A
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getTablePreciosGasoleoA');
            
            console.log(res.data)
            
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
            
            console.log(res.data)

            setMinGasoilBToday(res.data[0][0]);
            setMinGasoilB(res.data[1][0])
            setMaxGasoilBToday(res.data[2][0])
            setMaxGasoilB(res.data[3][0])

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
                maxGasoilBToday["gasoleoPremium"], maxGasoilBToday["gasolina95e5"], maxGasoilBToday["gasolina98e5"], minGasoilBToday["fecha"]),




            createDataPrecios('Gasoleo B más caro historico', maxGasoilB["provincia"], maxGasoilB["municipio"], maxGasoilB["localidad"],
                maxGasoilB["direccion"], maxGasoilB["cp"], maxGasoilB["rotulo"], maxGasoilB["gasoleoA"], maxGasoilB["gasoleoB"],
                maxGasoilB["gasoleoPremium"], maxGasoilB["gasolina95e5"], maxGasoilB["gasolina98e5"], minGasoilBToday["fecha"]),


            createDataPrecios('Gasoleo Premium más barato hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasoleo Premium más barato historico', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasoleo Premium más caro hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasoleo Premium más caro historico', 262, 16.0, 24, 6.0),


            createDataPrecios('Gasolina 95 e5 más barata hoy', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasolina 95 e5 más barata historico', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasolina 95 e5 más cara hoy', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasolina 95 e5 más cara historico', 237, 9.0, 37, 4.3),


            createDataPrecios('Gasolina 98 e5 más barata hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasolina 98 e5 más barata historico', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasolina 98 e5 más cara hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasolina 98 e5 más cara historico', 262, 16.0, 24, 6.0),

        ];
        setRowsPrecios(newRowsPrecios);

    }, [minGasoilAToday])

    return (
        <Box>
            <Header />
            <CustomTable rows={rowsPrecios} title="Precios" />
            <Box position={"flex"} bottom={0} minWidth={"100%"}>
                <Footer />
            </Box>
        </Box>
    );
}
