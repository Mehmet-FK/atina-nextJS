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

const ItemsFilter = ({
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

  //   const xxl = useMediaQuery("(min-width:1350px)");

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
                value={filterVal.id || ""}
                className={"date-input"}
                variant="outlined"
                type="text"
                size="small"
                label="ID"
                name="id"
                sx={filterStyles.textField}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemType || ""}
                className={"date-input"}
                variant="outlined"
                type="text"
                size="small"
                label="Artikeltyp"
                name="itemType"
                sx={filterStyles.textField}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemId || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Artikel ID"
                name="itemId"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemNumber || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Artikelnummer"
                name="itemNumber"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.street || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Straße"
                name="street"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.streetnumber || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Hausnummer"
                name="streetnumber"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.zip || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="PLZ"
                name="zip"
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.city || ""}
                sx={filterStyles.textField}
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

            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                sx={filterStyles.textField}
                value={filterVal.data1 || ""}
                variant="outlined"
                size="small"
                label="Daten1"
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
                label=" Daten2"
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
                label="Daten3"
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
                label="Daten4"
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
                label="Daten5"
                name="data5"
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
      )}
    </Box>
  );
};

export default ItemsFilter;
