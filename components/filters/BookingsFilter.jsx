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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BookingsFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
  buchungTypes,
}) => {
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(buchungTypes);

  const today = new Date().toISOString().split("T")[0];
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
              value={filterVal?.itemNumber || ""}
              variant="outlined"
              size="small"
              label="Item Nummer"
              name="itemNumber"
            />
          </Grid>
          <Grid item md={2}>
            {/* <TextField
                onChange={handleChange}
                value={filterVal.ItemType || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Tag Typ"
                name="ItemType"
              /> */}
            <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
              <InputLabel id="itemType">Buchungstype</InputLabel>
              <Select
                // sx={{ width: "100%" }}
                labelId="itemType"
                id="demo-select-small"
                value={filterVal?.ItemType || ""}
                label="Buchungstype"
                onChange={(e) =>
                  setFilterVal({ ...filterVal, ItemType: e.target.value })
                }
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>

                {/* 
                <MenuItem value={"Order"}>Auftrag</MenuItem>
                <MenuItem value={"Meter"}>Zähler</MenuItem>
                <MenuItem value={"Vehicle"}>KFZ</MenuItem> */}
              </Select>
            </FormControl>
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
              max="1979-12-31"
              sx={filterStyles.textField}
              inputProps={{
                max: today,
                min: filterVal.dateFrom,
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.dateFrom ? "inherit" : "#ddd5",
                  },
                  "&:focus": {
                    "&::-webkit-datetime-edit-year-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: "#000",
                    },
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
                  "&::-webkit-datetime-edit-minute-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: filterVal.dateTo ? "inherit" : "#ddd5",
                  },
                  "&:focus": {
                    "&::-webkit-datetime-edit-year-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: "#000",
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.timeFrom || ""}
              className={"date-input"}
              variant="outlined"
              type="time"
              size="small"
              label="Uhrzeit (von)"
              name="timeFrom"
              sx={filterStyles.textField}
              inputProps={{
                max: today,
                // min: filterVal.timeTo,
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: "#ddd5",
                  },
                  "&:focus": {
                    "&::-webkit-datetime-edit-year-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: "#000",
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.timeTo || ""}
              className={"date-input"}
              variant="outlined"
              type="time"
              size="small"
              label="Uhrzeit (bis)"
              name="timeTo"
              max="1979-12-31"
              sx={filterStyles.textField}
              inputProps={{
                max: today,
                min: filterVal.timeFrom,
                sx: {
                  cursor: "pointer",
                  "&::-webkit-datetime-edit-year-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-month-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-day-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-minute-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-hour-field": {
                    color: "#ddd5",
                  },
                  "&::-webkit-datetime-edit-text": {
                    color: "#ddd5",
                  },
                  "&:focus": {
                    "&::-webkit-datetime-edit-year-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: "#000",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: "#000",
                    },
                  },
                },
              }}
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
