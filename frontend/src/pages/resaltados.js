import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import CustomTable from "../components/muiTablePrecios"

function createDataPrecios(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const rowsPrecios = [
    createDataPrecios('Gasoleo A más barato hoy', 159, 6.0, 24, 4.0),
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

export default function BasicTable() {
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