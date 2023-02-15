import * as React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from "axios";
import Box from '@mui/material/Box';

import { useEffect, useState } from "react";
import { Container } from "@mui/material";


export default function Mapa() {

    const [actualizado, setActualizado] = useState(true);
    const [provincias, setProvincias] = useState([])
    // gasolinerasData[0][0]["gasoleoA"], gasolinerasData[0][0]["gasoleoPremium"], gasolinerasData[0][0]["gasoleoB"], gasolinerasData[0][0]["gasolina95_E5"], gasolinerasData[0][0]["gasolina98_E5"]])


    useEffect(() => {
        axios
            .get("http://localhost:3001/mapa/getTodayMeanDataPerProvince", {
            })
            .then((res) => {
                console.log("Entre")
                setProvincias(res.data)

            })
            .catch((err) => {
                console.log(err);
            });
    }, [actualizado]);

    console.log(provincias)
    function handleClick(e){
        console.log(e.latlng );
    }
    return (
        <Container disableGutters sx={{ minWidth: "100%" }}>
            <Header />
            <Map center={[40.4165, -3.70256]} zoom={6} style={{ height: "85vh" }} onClick={handleClick}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {provincias.map((position, index) => (
                    <Marker position={[parseFloat(position[1]), parseFloat(position[2])]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                        <Popup>
                            Provincia: {position[0]}<br />
                            Gasoleo A: {position[3].toFixed(3)} €/L<br />
                            Gasoleo Premium: {position[4].toFixed(3)} €/L<br />
                            Gasoleo B: {position[5].toFixed(3)} €/L<br />
                            Gasolina 95: {position[6].toFixed(3)} €/L<br />
                            Gasolina 98: {position[7].toFixed(3)} €/L<br />
                        </Popup>
                    </Marker>
                ))}

            </Map>
            <Footer />
        </Container>
    );
};