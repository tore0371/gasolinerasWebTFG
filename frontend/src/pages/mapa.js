import * as React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import "leaflet/dist/leaflet.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default () => {
  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  return (
    <>
    <Header />
    <Map center={[40.4165, -3.70256]} zoom={6} style={{ height: "85vh" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
    <Footer />
    </>
  );
};