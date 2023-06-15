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

const NfcFilter = ({ filterVal, setFilterVal, handleFilter, handleReset }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Box
      component={Paper}
      sx={{ ...filterStyles.container, height: open ? "auto" : "3rem" }}
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
      {open && (
        <Box sx={filterStyles.insideWrapper}>
          {/* //? == ROW 1 == */}
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <TextField
                value={filterVal.createdFrom || ""}
                className={"date-input"}
                variant="outlined"
                type="datetime-local"
                size="small"
                label="Erstellt (von)"
                name="createdFrom"
                sx={filterStyles.textField}
                onChange={handleChange}
                inputProps={{
                  sx: {
                    cursor: "pointer",
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
                value={filterVal.createdTo || ""}
                className={"date-input"}
                variant="outlined"
                type="datetime-local"
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
            {/* <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.id || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="ID"
                name="id"
              />
            </Grid> */}
            {/* <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.tagID || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Tag ID"
                name="tagID"
              /> 
            </Grid>*/}
            {/* <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.desc || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Beschreibung"
                name="desc"
              />
            </Grid> */}
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
                <InputLabel id="itemType">Typ</InputLabel>
                <Select
                  // sx={{ width: "100%" }}
                  labelId="itemType"
                  id="demo-select-small"
                  value={filterVal?.ItemType || ""}
                  label="Typ"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, ItemType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Order"}>Auftrag</MenuItem>
                  <MenuItem value={"Meter"}>Zähler</MenuItem>
                  <MenuItem value={"Vehicle"}>KFZ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.nfcData || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="NFC Datei"
                name="nfcData"
              />
            </Grid> */}

            {/*  <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemID || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Artikel ID"
                name="itemID"
              />
            </Grid> */}
            <>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.itemNumber || ""}
                  variant="outlined"
                  size="small"
                  label="Datensatznummer"
                  name="itemNumber"
                />
              </Grid>
              <Grid item md={2} />

              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.street || ""}
                  variant="outlined"
                  size="small"
                  label="Straße"
                  name="street"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.streetnumber || ""}
                  variant="outlined"
                  size="small"
                  label=" Hausnummer"
                  name="streetnumber"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.zip || ""}
                  variant="outlined"
                  size="small"
                  label=" PLZ"
                  name="zip"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.city || ""}
                  variant="outlined"
                  size="small"
                  label="Stadt"
                  name="city"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.country || ""}
                  variant="outlined"
                  size="small"
                  label="Land"
                  name="country"
                />
              </Grid>

              <Grid item md={1} />
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data1 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 1"
                  name="data1"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data2 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 2"
                  name="data2"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data3 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 3"
                  name="data3"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data4 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 4"
                  name="data4"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data5 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 5"
                  name="data5"
                />
              </Grid>
            </>
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
      )}
    </Box>
  );
};

export default NfcFilter;
