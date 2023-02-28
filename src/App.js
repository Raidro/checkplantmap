import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
} from "react-leaflet";
import { GeoJSON } from "react-leaflet";

import "./App.css";

import GeoData from "./JSON/Talhao.json";

function App() {
  const [lntlng, setLntLng] = useState([
    -15.179037392360357, -53.58474565423604,
  ]);

  // encontra o ponto central

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log("Longitude => ", lng);
        console.log("Latitude => ", lat);
      },
    });
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ color: "black" }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Gestão de pontos no mapa
          </Typography>
        </Toolbar>
      </AppBar>
      <MapContainer
        center={lntlng}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={lntlng}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <GeoJSON key="my-geojson" data={GeoData} />
        <MyComponent />
      </MapContainer>
    </Box>
  );
}

export default App;
