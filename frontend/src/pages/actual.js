import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { Box, Typography, Grid } from '@mui/material';


const App = () => {
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [fechaActualizacion, setFechaActualizacion] = useState("No disponible")


    const fetchData = async () => {

        axios.get('http://localhost:3002/actual/getTodayDataTable')
            .then(response => {
                // Obtenemos los datos
                setRowData(response.data[0]);
                setFechaActualizacion(response.data[1])
            })
            .catch(e => {
                // Capturamos los errores           
                console.log(e)

            })
    };

    useEffect(() => {
        console.log("em")
        fetchData()
    }, []);


    const columnDefs = [
        { headerName: 'Provincia', field: 'provincia', sortable: true },
        { headerName: 'Municipio', field: 'municipio', sortable: true },
        { headerName: 'Localidad', field: 'localidad', sortable: true, width: 180 },
        { headerName: 'Dirección', field: 'direccion', sortable: true, width: 350 },
        { headerName: 'CP', field: 'cp', sortable: true, width: "85%" },
        { headerName: 'Rotulo', field: 'rotulo', sortable: true },
        { headerName: 'Gasoleo A', field: 'gasoleoA', sortable: true, width: 110 },
        { headerName: 'Gasoleo B', field: 'gasoleoB', sortable: true, width: 110 },
        { headerName: 'Gasoleo Premium', field: 'gasoleoPremium', sortable: true, width: 160, marginLeft: 0 },
        { headerName: 'Gasolina 95 E5', field: 'gasolina95e5', sortable: true, width: 140 },
        { headerName: 'Gasolina 98 E5', field: 'gasolina98e5', sortable: true },
    ];

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit();
    };

    const onQuickFilterText = (event) => {
        gridApi.setQuickFilter(event.target.value);
    };

    return (
        <Box>
            <Header />
            <Box className="ag-theme-alpine" style={{ height: "calc(87.5vh - 110px)", width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ marginTop: "1%", marginBottom: "1%", marginLeft: "50%" }}>
                            <TextField id="outlined-basic" variant="outlined" label="Filtrar..." onChange={onQuickFilterText} />
                            <SearchIcon sx={{ height: 50, width: 50 }} onClick={onQuickFilterText} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ marginTop: "3%", marginBottom: "1%", marginLeft: "5%" }}>
                            <Typography>Última fecha de actualización: {fechaActualizacion}</Typography>
                        </Box>
                    </Grid>
                </Grid>


                <AgGridReact
                    sx={{ height: "calc(100vh - 110px)" }}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    enableSorting={true}
                    autoSizeColumns={true}
                />
            </Box>
            <Box position={"absolute"} bottom={0} minWidth={"100%"}>
                <Footer />
            </Box>
        </Box>
    );
};

export default App;
