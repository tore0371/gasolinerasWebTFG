import { Box, Container } from "@mui/material";
import * as React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";





export default function previsiones(){
return(
    <Container disableGutters sx={{minWidth:"100%"}}>
        <Header/>
        <Footer/>
    </Container>
);
}