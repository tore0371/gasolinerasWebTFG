import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import CustomTable from "../components/muiTable"

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const prueba = []

const rows = [
    createData('Gasoleo A más barato hoy', 159, 6.0, 24, 4.0),
    createData('Gasoleo A más barato historico', 159, 6.0, 24, 4.0),

    createData('Gasoleo B más barato hoy', 237, 9.0, 37, 4.3),
    createData('Gasoleo B más barato historico', 237, 9.0, 37, 4.3),

    createData('Gasoleo Premium más barato hoy', 262, 16.0, 24, 6.0),
    createData('Gasoleo Premium más barato historico', 262, 16.0, 24, 6.0),

    createData('Gasolina 95 e5 más barata hoy', 237, 9.0, 37, 4.3),
    createData('Gasolina 95 e5 más barata historico', 237, 9.0, 37, 4.3),

    createData('Gasolina 98 e5 más barata hoy', 262, 16.0, 24, 6.0),
    createData('Gasolina 98 e5 más barata historico', 262, 16.0, 24, 6.0),

    createData('Gasoleo A más caro hoy', 159, 6.0, 24, 4.0),
    createData('Gasoleo A más caro historico', 159, 6.0, 24, 4.0),

    createData('Gasoleo B más caro hoy', 237, 9.0, 37, 4.3),
    createData('Gasoleo B más caro historico', 237, 9.0, 37, 4.3),

    createData('Gasoleo Premium más caro hoy', 262, 16.0, 24, 6.0),
    createData('Gasoleo Premium más caro historico', 262, 16.0, 24, 6.0),

    createData('Gasolina 95 e5 más cara hoy', 237, 9.0, 37, 4.3),
    createData('Gasolina 95 e5 más cara historico', 237, 9.0, 37, 4.3),

    createData('Gasolina 98 e5 más cara hoy', 262, 16.0, 24, 6.0),
    createData('Gasolina 98 e5 más cara historico', 262, 16.0, 24, 6.0),
];

export default function BasicTable() {
    return (
        <Box>
            <Header />
            <CustomTable rows={rows} title="Precios" />
            <Box position={"flex"} bottom={0} minWidth={"100%"}>
                <Footer />
            </Box>
        </Box>
    );
}