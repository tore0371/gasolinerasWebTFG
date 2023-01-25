import * as React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';


export default () => {

    const markers = [[40.4165, -3.70256], [40.4165, -4.00256], [40.4165, -4.30256]]
    return (
        <>
            <Header />
            <Map center={[40.4165, -3.70256]} zoom={6} style={{ height: "85vh" }}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((position, index) => (
                        <Marker position={[position[0], position[1]]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                            <Popup>
                                Gasolinera: {index}
                            </Popup>
                        </Marker>
                ))}

            </Map>
            <Footer />
        </>
    );
};