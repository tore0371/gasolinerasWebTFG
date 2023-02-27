import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import CustomTable from "../components/muiTablePrecios"
import axios from 'axios';




function createDataPrecios(name, provincia, municipio, localidad, direccion, cp, rotulo, gasoleoA, gasoleoB, gasoleoPremium, gasolina95_E5, gasolina98_E5, fecha) {
    return { name, provincia, municipio, localidad, direccion, cp, rotulo, gasoleoA, gasoleoB, gasoleoPremium, gasolina95_E5, gasolina98_E5, fecha };
}

export default function BasicTable() {

    const [fechaActualizacion, setFechaActualizacion] = useState("No disponible")
    const [minGasoilA, setMinGasoilA] = useState([])
    const [rowsPrecios, setRowsPrecios] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/resaltados/getTablePrecios');
            console.log(res.data)
            setMinGasoilA(res.data[0]);
            console.log(minGasoilA)
        };

        fetchData();
    }, []);

    useEffect(() => {

        const newRowsPrecios = [
            createDataPrecios('Gasoleo A más barato hoy', minGasoilA["provincia"], minGasoilA["municipio"], minGasoilA["localidad"], minGasoilA["direccion"], minGasoilA["cp"], minGasoilA["rotulo"], minGasoilA["gasoleoA"], minGasoilA["gasoleoB"], minGasoilA["gasoleoPremium"], minGasoilA["gasolina95e5"], minGasoilA["gasolina98e5"], minGasoilA["fecha"].slice(0,10)),
            createDataPrecios('Gasoleo A más barato historico', 159, 6.0, 24, 4.0),

            createDataPrecios('Gasoleo B más barato hoy', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasoleo B más barato historico', 237, 9.0, 37, 4.3),

            createDataPrecios('Gasoleo Premium más barato hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasoleo Premium más barato historico', 262, 16.0, 24, 6.0),

            createDataPrecios('Gasolina 95 e5 más barata hoy', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasolina 95 e5 más barata historico', 237, 9.0, 37, 4.3),

            createDataPrecios('Gasolina 98 e5 más barata hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasolina 98 e5 más barata historico', 262, 16.0, 24, 6.0),

            createDataPrecios('Gasoleo A más caro hoy', 159, 6.0, 24, 4.0),
            createDataPrecios('Gasoleo A más caro historico', 159, 6.0, 24, 4.0),

            createDataPrecios('Gasoleo B más caro hoy', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasoleo B más caro historico', 237, 9.0, 37, 4.3),

            createDataPrecios('Gasoleo Premium más caro hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasoleo Premium más caro historico', 262, 16.0, 24, 6.0),

            createDataPrecios('Gasolina 95 e5 más cara hoy', 237, 9.0, 37, 4.3),
            createDataPrecios('Gasolina 95 e5 más cara historico', 237, 9.0, 37, 4.3),

            createDataPrecios('Gasolina 98 e5 más cara hoy', 262, 16.0, 24, 6.0),
            createDataPrecios('Gasolina 98 e5 más cara historico', 262, 16.0, 24, 6.0),

        ];
        setRowsPrecios(newRowsPrecios);

    }, [minGasoilA])

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
