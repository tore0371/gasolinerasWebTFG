import * as React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'


export default () => {


    return (
        <>
            <Header />
            <Map center={[40.4165, -3.70256]} zoom={6} style={{ height: "85vh" }}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[40.4165, -3.70256]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                    <Popup>
                        Madrid
                    </Popup>
                </Marker>
            </Map>
            <Footer />
        </>
    );
};