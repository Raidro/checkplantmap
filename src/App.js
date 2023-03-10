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

import PinMoveOff from "./Utils/images/Regular=on, Move=off.svg";
import PinMoveOn from "./Utils/images/Regular=off, Move=on.svg";
import ButtonPin from "./Utils/images/Pin.svg";
import TrashIcon from "./Utils/images/Trash.svg";

const custonPinMoveOff = L.icon({
  iconUrl: PinMoveOff,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [2, -22],
});

const customPinMoveOn = L.icon({
  iconUrl: PinMoveOn,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [2, -22],
});

function App() {
  const [lntlng] = useState([-15.179037392360357, -53.58474565423604]);
  const anotherPin = [-15.17602065560767, -53.579893112182624];

  const [customPin, setCustomPin] = useState(custonPinMoveOff);

  function AddButton() {
    const map = useMap();

    if (map) {
      const buttonControl = L.control({
        position: "bottomright",
      });

      buttonControl.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "myControl");

        const buttonElement = `<div >
        <button type="button"  class="buttonAdd">Adicionar novo <img src=${ButtonPin} /> </button>
        </div>`;

        this._div.innerHTML = buttonElement;
        return this._div;
      };

      buttonControl.addTo(map);
    } else {
      return null;
    }
  }

  function DeleteButton() {
    const map = useMap();

    if (map) {
      const buttonControl = L.control({
        position: "bottomright",
      });

      buttonControl.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "myControl");
        const buttonElement = `<div >
        <button type="button" class="buttonDelete">Deletar todos <img src=${TrashIcon} /> </button>
        </div>`;
        this._div.innerHTML = buttonElement;
        return this._div;
      };

      buttonControl.addTo(map);
    } else {
      return null;
    }
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        L.marker(anotherPin, {
          icon: customPin,
          draggable: true,
        }).addTo(map);
      },
    });
    return null;
  }

  function changeIcon() {
    setCustomPin(customPinMoveOn);
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
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt1", "mt2", "mt3"]}
          />

          <Marker
            draggable
            position={lntlng}
            icon={customPin}
            eventHandlers={{
              click: () => changeIcon(),
            }}
          ></Marker>
          <GeoJSON key="my-geojson" data={GeoData} />
          <MyComponent />
          <DeleteButton />
          <AddButton />
        </MapContainer>
      </Box>
    </>
  );
}

export default App;
