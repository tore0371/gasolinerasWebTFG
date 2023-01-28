import * as React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from "axios";
import { useEffect, useState } from "react";


export default function Mapa () {

    const [actualizado, setActualizado] = useState(true);
    const [provincias, setProvincias] = useState([])


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

    const markers = [[40.4165, -3.70256], [40.4165, -4.00256], [40.4165, -4.30256]]
    console.log(provincias)
    return (
        <>
            <Header />
            <Map center={[40.4165, -3.70256]} zoom={6} style={{ height: "85vh" }}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {provincias.map((position, index) => (
                        <Marker position={[parseFloat(position[1]), parseFloat(position[2])]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                            <Popup>
                                Gasolinera: {position[0]}
                            </Popup>
                        </Marker>
                ))}

            </Map>
            <Footer />
        </>
    );
};