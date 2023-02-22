import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { Box } from '@mui/material';


const App = () => {
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3002/actual/getTodayDataTable');
            setRowData(res.data);
        };

        fetchData();
    }, []);

    const columnDefs = [
        { headerName: 'Provincia', field: 'provincia', sortable: true },
        { headerName: 'Municipio', field: 'municipio', sortable: true },
        { headerName: 'Localidad', field: 'localidad', sortable: true, width: 180 },
        { headerName: 'Dirección', field: 'direccion', sortable: true, width: 350 },
        { headerName: 'CP', field: 'cp', sortable: true, width: "85%" },
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
            <Box className="ag-theme-alpine" style={{ height: 570, width: '100%' }}>

                <Box sx={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}>
                    <TextField id="outlined-basic" variant="outlined" onChange={onQuickFilterText} />
                    <SearchIcon sx={{ height: 50, width: 50 }} onClick={onQuickFilterText} />
                </Box>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    enableSorting={true}
                    autoSizeColumns={true}
                />
            </Box>
            <Box sx={{marginTop:"7%"}}>
            <Footer/>
            </Box>
        </Box>
    );
};

export default App;
