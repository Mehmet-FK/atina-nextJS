import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Grid,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { modalStyles } from "@/styles/modal_styles";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import CloseIcon from "@mui/icons-material/Close";
import TapAndPlayIcon from "@mui/icons-material/TapAndPlay";
import React from "react";

const ItemsModal_Order = ({
  item,
  handleClose,
  openItemsModal,
  handleChange,
  inputVal,
  isAdmin,
}) => {
  return (
    <>
      <Modal
        open={openItemsModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyles.bookingModal.cardStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                columnGap: "10px",
                alignItems: "center",
              }}
            >
              <TapAndPlayIcon fontSize="large" />
              <Typography variant="h5">Datensätze (Auftrag)</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <CardContent sx={modalStyles.bookingModal.content}>
            {item && (
              <Grid
                container
                sx={{ justifyContent: "space-between", rowGap: 2 }}
              >
                <Grid item md={4}>
                  <TextField
                    variant="outlined"
                    label="Datensatznummer"
                    size="small"
                    name="itemNumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.itemNumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    variant="outlined"
                    label="Straße"
                    size="small"
                    name="street"
                    sx={{ width: "100%" }}
                    value={inputVal?.street || ""}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    name="streetnumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.streetnumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    name="zip"
                    sx={{ width: "100%" }}
                    value={inputVal?.zip || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    name="city"
                    sx={{ width: "100%" }}
                    value={inputVal?.city || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Land"
                    size="small"
                    name="country"
                    sx={{ width: "100%" }}
                    value={inputVal?.country || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Mandant"
                    size="small"
                    name="data1"
                    sx={{ width: "100%" }}
                    value={inputVal?.data1 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Auftragsart"
                    size="small"
                    name="data2"
                    sx={{ width: "100%" }}
                    value={inputVal?.data2 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Auftragsbetreff"
                    size="small"
                    name="data3"
                    sx={{ width: "100%" }}
                    value={inputVal?.data3 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Kundennummer"
                    size="small"
                    name="data4"
                    sx={{ width: "100%" }}
                    value={inputVal?.data4 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    variant="outlined"
                    label="Kundenname"
                    size="small"
                    name="data5"
                    sx={{ width: "100%" }}
                    value={inputVal?.data5 || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            {!item && (
              <Grid
                container
                sx={{ justifyContent: "space-between", rowGap: 2 }}
              >
                {/*  <TextField
                  variant="outlined"
                  label="Artikel ID"
                  size="small"
                  name="itemID"
                  value={inputVal.itemID || ""}
                  onChange={handleChange}
                />{" "} */}
                <Grid item md={4}>
                  <TextField
                    variant="outlined"
                    label="Artikelnummer"
                    size="small"
                    name="itemNumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.itemNumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    variant="outlined"
                    label="Straße"
                    size="small"
                    name="street"
                    sx={{ width: "100%" }}
                    value={inputVal?.street || ""}
                    onChange={handleChange}
                  />
                </Grid>
                {/* <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                <Grid item md={6}></Grid>
                 */}

                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    name="streetnumber"
                    sx={{ width: "100%" }}
                    value={inputVal?.streetnumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    name="zip"
                    sx={{ width: "100%" }}
                    value={inputVal?.zip || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    name="city"
                    sx={{ width: "100%" }}
                    value={inputVal?.city || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Land"
                    size="small"
                    name="country"
                    sx={{ width: "100%" }}
                    value={inputVal?.country || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Mandant"
                    size="small"
                    name="data1"
                    sx={{ width: "100%" }}
                    value={inputVal?.data1 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Auftragsart"
                    size="small"
                    name="data2"
                    sx={{ width: "100%" }}
                    value={inputVal?.data2 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Auftragsbetreff"
                    size="small"
                    name="data3"
                    sx={{ width: "100%" }}
                    value={inputVal?.data3 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    variant="outlined"
                    label="Kundennummer"
                    size="small"
                    name="data4"
                    sx={{ width: "100%" }}
                    value={inputVal?.data4 || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    variant="outlined"
                    label="Kundenname"
                    size="small"
                    name="data5"
                    sx={{ width: "100%" }}
                    value={inputVal?.data5 || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              {isAdmin && (
                <Button
                  sx={modalStyles.bookingModal.button}
                  variant="contained"
                >
                  Speichern
                </Button>
              )}
              <Button
                sx={modalStyles.bookingModal.button}
                //   onClick={handleDelete}
                onClick={handleClose}
                variant="contained"
              >
                {isAdmin ? "Abbrechen" : "schliessen"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default ItemsModal_Order;
