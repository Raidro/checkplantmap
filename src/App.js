import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import "./App.css";

function App() {
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
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      //{" "}
    </Box>
  );
}

export default App;
