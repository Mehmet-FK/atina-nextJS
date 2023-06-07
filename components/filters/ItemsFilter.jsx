import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { filterStyles } from "@/styles/filter_styles";

const ItemsFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
  type,
}) => {
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
      onClick={() => !open && setOpen(true)}
      sx={{
        ...filterStyles.container,
        height: open ? "auto" : "3rem",
        cursor: open ? "auto" : "pointer",
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
      {open && (
        <Box sx={filterStyles.insideWrapper}>
          {/* //? == ROW 1 == */}
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemType || ""}
                className={"date-input"}
                variant="outlined"
                type="text"
                size="small"
                label="Itemtype"
                name="itemType"
                sx={filterStyles.textField}
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.itemNumber || ""}
                sx={filterStyles.textField}
                variant="outlined"
                size="small"
                label="Datensatznummer"
                name="itemNumber"
              />
            </Grid>
            <Grid item md={6} />
            {type !== "Vehicle" && (
              <>
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
              </>
            )}
            <Grid item md={2}>
              <TextField
                onChange={handleChange}
                sx={filterStyles.textField}
                value={filterVal.data1 || ""}
                variant="outlined"
                size="small"
                label={
                  type === "Order"
                    ? "Mandant"
                    : type == "Meter"
                    ? "Letzte Ablesung am"
                    : "Mandant"
                }
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
                label={
                  type === "Order"
                    ? "Auftragsart"
                    : type == "Meter"
                    ? "Letzte Ablesung"
                    : "Standort"
                }
                name="data2"
              />
            </Grid>
            {type !== "Meter" && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data3 || ""}
                  variant="outlined"
                  size="small"
                  label={
                    type === "Order"
                      ? "Auftragsbetreff"
                      : type == "Vehicle" && "Kennzeichen"
                  }
                  name="data3"
                />
              </Grid>
            )}
            {type !== "Meter" && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data4 || ""}
                  variant="outlined"
                  size="small"
                  label={
                    type === "Order"
                      ? "Kundennummer"
                      : type == "Vehicle" && "Modell"
                  }
                  name="data4"
                />
              </Grid>
            )}
            {type === "Order" && (
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data5 || ""}
                  variant="outlined"
                  size="small"
                  label="Kundenname"
                  name="data5"
                />
              </Grid>
            )}
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

export default memo(ItemsFilter);
