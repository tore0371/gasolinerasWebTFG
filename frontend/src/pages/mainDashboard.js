import * as React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import Footer from "../layouts/Footer"
import Sidebar from "../layouts/Sidebar"
import Header from "../layouts/Header"





export default function MainDashboard(){
    return(
        <>
        <Header />
        <Typography>Hola que tal</Typography>


        <Footer />
        </>
    );
}