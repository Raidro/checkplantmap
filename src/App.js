import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Popup,
  Marker,
  useMap,
} from "react-leaflet";
import { GeoJSON } from "react-leaflet";

// usado pra executar as funções do leaflet
import L from "leaflet";

import "./App.css";

import GeoData from "./JSON/Talhao.json";

function App() {
  const [lntlng, setLntLng] = useState([
    -15.179037392360357, -53.58474565423604,
  ]);

  const firstPosition = [-15.17602065560767, -53.579893112182624];

  // ---------------------------------------------

  function MyCustomButtom() {
    const map = useMap();

    if (!map) return;
    const buttonControl = L.control({
      position: "bottomright",
    });

    buttonControl.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "myControl");

      const buttonElement = `<div >
      <button>Adicionar novo ponto</button>
      </div>`;

      this._div.innerHTML = buttonElement;
      return this._div;
    };

    buttonControl.addTo(map);

    return null;
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log("Longitude => ", lng);
        console.log("Latitude => ", lat);
        console.log("evento => ", e);
        L.marker(firstPosition).addTo(map);
      },
    });
    return null;
  }

  return (
    <>
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
          <Marker draggable position={lntlng}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <GeoJSON key="my-geojson" data={GeoData} />
          <MyComponent />
          <MyCustomButtom />
        </MapContainer>
      </Box>
      {/* <div style={{ backgroundColor: "green" }}>
        <Button onClick={() => returnLocationMarker()} variant="contained">
          Adicionar novo
        </Button>
      </div> */}
    </>
  );
}

export default App;
