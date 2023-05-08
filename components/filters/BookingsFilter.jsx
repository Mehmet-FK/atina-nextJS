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
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { filterStyles } from "@/styles/filter_styles";

const BookingsFilter = ({
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

  // const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
  const today = new Date().toISOString().split("T")[0];

  const xxl = useMediaQuery("(min-width:1500px)");
  return (
    <Box
      component={Paper}
      sx={{
        ...filterStyles.container,
        height: open ? "auto" : "3rem",
      }}
    >
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
        <Grid container sx={filterStyles.grid.container}>
          <Grid item md={2}>
            <TextField
              // onChange={handleChange}
              value={filterVal.createdFrom || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Erstellt (von)"
              name="createdFrom"
              sx={filterStyles.textField}
              onChange={handleChange}
              inputProps={{
                sx: {
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.createdFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.createdFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.createdFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: filterVal.createdFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: filterVal.createdFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.createdFrom ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.createdTo || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Erstellt (bis)"
              name="createdTo"
              sx={filterStyles.textField}
              inputProps={{
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.createdTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.createdTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.createdTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: filterVal.createdTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: filterVal.createdTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.createdTo ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.dateFrom || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Datum (von)"
              name="dateFrom"
              sx={filterStyles.textField}
              inputProps={{
                max: today,
                sx: {
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },

                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.dateTo || ""}
              className={"date-input"}
              variant="outlined"
              type="date"
              size="small"
              label="Datum (bis)"
              name="dateTo"
              max="1979-12-31"
              sx={filterStyles.textField}
              inputProps={{
                max: today,
                min: filterVal.dateFrom,
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                },
              }}
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.id || ""}
              variant="outlined"
              size="small"
              label="ID"
              name="id"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.bookingType || ""}
              variant="outlined"
              size="small"
              label="Buchungstyp"
              name="bookingType"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.street || ""}
              variant="outlined"
              size="small"
              label="Straße"
              name="street"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.streetnumber || ""}
              variant="outlined"
              size="small"
              label="Hausnummer"
              name="streetnumber"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.zip || ""}
              variant="outlined"
              size="small"
              label="PLZ "
              name="zip"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.city || ""}
              variant="outlined"
              size="small"
              label="Stadt "
              name="city"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.country || ""}
              variant="outlined"
              size="small"
              label="Land "
              name="country"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.nfcTagID || ""}
              variant="outlined"
              size="small"
              label="NFC Tag ID "
              name="nfcTagID"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.nfcTagInfo || ""}
              variant="outlined"
              size="small"
              label="NFC Tag Info "
              name="nfcTagInfo"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.userID || ""}
              variant="outlined"
              size="small"
              label="Benutzer ID "
              name="userID"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal.itemID || ""}
              variant="outlined"
              size="small"
              label="Artikel ID "
              name="itemID"
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

export default BookingsFilter;
