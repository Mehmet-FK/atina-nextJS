"use client";

import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { filterStyles } from "@/styles/filter_styles";

const UsersFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };
  const xxl = useMediaQuery("(min-width:1500px)");

  return (
    <Box component={Paper} sx={filterStyles.container}>
      <Box sx={filterStyles.iconWrapper}>
        <IconButton onClick={() => setOpen(!open)}>
          <Typography sx={filterStyles.icon}>
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
          ...filterStyles.insideWrapper,
          display: open ? "flex" : "none",
        }}
      >
        {/* //? == ROW 1 == */}
        <Grid
          container
          sx={{ width: "100%", columnGap: "10px", rowGap: "10px" }}
        >
          {/*  <Grid item md={2}>
            <TextField
              // onChange={handleChange}
              value={filterVal.timeFrom || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Erstellt (von)"
              name="timeFrom"
              sx={filterStyles.textField}
              onChange={(e) => console.log(new Date(e.target.value).getTime())}
              inputProps={{
                sx: {
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.timeFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.timeFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.timeFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: filterVal.timeFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: filterVal.timeFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.timeFrom ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid> */}
          {/*  <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.timeTo || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Erstellt (bis)"
              name="timeTo"
              sx={filterStyles.textField}
              inputProps={{
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.timeTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.timeTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.timeTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: filterVal.timeTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: filterVal.timeTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.timeTo ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid> */}
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.firstname || ""}
              variant="outlined"
              size="small"
              label="Vorname"
              name="firstname"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.lastname || ""}
              variant="outlined"
              size="small"
              label="Nachname"
              name="lastname"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.username || ""}
              variant="outlined"
              size="small"
              label="Benutzername"
              name="username"
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.personnelnumber || ""}
              variant="outlined"
              size="small"
              label="Personalnummer"
              name="personnelnumber"
            />
          </Grid>
        </Grid>
        <Box sx={filterStyles.buttonWrapper}>
          <Button
            color={"error"}
            variant="contained"
            onClick={() => handleFilter()}
          >
            {" "}
            Suchen{" "}
          </Button>
          <Button
            color={"error"}
            variant="contained"
            onClick={() => handleReset()}
          >
            {" "}
            Löschen{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersFilter;
