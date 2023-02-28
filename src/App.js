import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
    </Box>
  );
}

export default App;
