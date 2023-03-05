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
  Marker,
  useMap,
} from "react-leaflet";
// usado pra executar as funções do leaflet
import L from "leaflet";

// geoJson de coordenadas
import { GeoJSON } from "react-leaflet";
import GeoData from "./JSON/Talhao.json";

import "./App.css";

function App() {
  const [lntlng] = useState([-15.179037392360357, -53.58474565423604]);

  const anotherPin = [-15.17602065560767, -53.579893112182624];

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
        L.marker(anotherPin).addTo(map);
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
          <Marker draggable position={lntlng}></Marker>
          <GeoJSON key="my-geojson" data={GeoData} />
          <MyComponent />
          <MyCustomButtom />
        </MapContainer>
      </Box>
    </>
  );
}

export default App;
