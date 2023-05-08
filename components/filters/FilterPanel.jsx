"use client";

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import DatePicker from "../DateTimePicker";

const UsersFilter = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        width: "1250px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: open ? "16rem" : "3rem",
        transition: "all 0.3s",
        position: "sticky",
        top: "5rem",
        zIndex: "3",
        backgroundColor: "#fff",
        border: "1px solid #ddd5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          transition: "all 1s",
        }}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "900",
              paddingInline: "0.6rem",
              borderRadius: "50%",
            }}
          >
            {open ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </Typography>
        </IconButton>
        <Typography
          fontSize={12}
          sx={{ display: open && "none", width: open ? "0px" : "auto" }}
        >
          Öffnen Sie hier den Suchfenster
        </Typography>
      </Box>
      <Box
        sx={{
          transition: "all 0.3s",
          display: open ? "block" : "none",
        }}
      >
        {/* //? == ROW 1 == */}
        <Grid container spacing={1} sx={{ width: "95%", marginInline: "auto" }}>
          <Grid item md={3}>
            <TextField
              sx={{ width: "100%" }}
              variant="outlined"
              size="small"
              label="Datumsart"
            />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Ereignis-ID" />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="App-ID" />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Name der App" />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Kontrollstellenbezeichnung"
            />
          </Grid>

          {/* //? == ROW 2 == */}

          <Grid item md={3}>
            <DatePicker label="dateTime" />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              size="small"
              label="Mitarbeitername"
            />
          </Grid>

          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Vertrauen" />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="GIS" />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Daten1" />
          </Grid>

          {/* //? ==ROW 3 ==*/}

          <Grid item md={3}></Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Daten2" />
          </Grid>

          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Daten3" />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Daten4" />
          </Grid>
          <Grid item md={2}>
            <TextField variant="outlined" size="small" label="Daten5" />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0.5rem",
          }}
        >
          <TextField variant="outlined" size="small" label="Status" />

          <Box sx={{ display: "flex", columnGap: "5px" }}>
            <Button variant="contained"> Suchen </Button>
            <Button variant="contained"> Löschen </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersFilter;
