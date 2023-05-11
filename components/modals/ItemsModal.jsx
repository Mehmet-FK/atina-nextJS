"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { modalStyles } from "@/styles/modal_styles";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import CloseIcon from "@mui/icons-material/Close";

const ItemsModal = ({ setOpenItemsModal, openItemsModal, item }) => {
  const handleClose = () => {
    setOpenItemsModal(false);
    setInputVal({});
  };
  const [inputVal, setInputVal] = useState(item ? item : {});

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {item && (
        <Modal
          open={openItemsModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card sx={modalStyles.bookingModal.cardStyle}>
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <CardContent sx={modalStyles.bookingModal.content}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="Artikel ID"
                  size="small"
                  name="itemID"
                  value={inputVal.itemID || ""}
                  onChange={handleChange}
                />{" "}
                <TextField
                  variant="outlined"
                  label="Artikelnummer"
                  size="small"
                  name="itemNumber"
                  value={inputVal?.itemNumber || ""}
                  onChange={handleChange}
                />
              </Box>{" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="Straße"
                    size="small"
                    name="street"
                    value={inputVal.street || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    name="streetnumber"
                    value={inputVal?.streetnumber || ""}
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    name="zip"
                    value={inputVal?.zip || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    name="city"
                    value={inputVal?.city || ""}
                    onChange={handleChange}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  label="Land"
                  size="small"
                  name="country"
                  value={inputVal?.country || ""}
                />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="Daten 1"
                    size="small"
                    name="data1"
                    value={inputVal?.data1 || ""}
                  />

                  <TextField
                    variant="outlined"
                    label="Daten 2"
                    size="small"
                    name="data2"
                    value={inputVal?.data2 || ""}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="Daten 3"
                    size="small"
                    name="data3"
                    value={inputVal?.data3 || ""}
                  />

                  <TextField
                    variant="outlined"
                    label="Daten 4"
                    size="small"
                    name="data4"
                    value={inputVal?.data4 || ""}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  label="Daten 5"
                  size="small"
                  name="data5"
                  value={inputVal?.data5 || ""}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  sx={modalStyles.bookingModal.button}
                  variant="contained"
                >
                  Speichern
                </Button>
                <Button
                  sx={modalStyles.bookingModal.button}
                  //   onClick={handleDelete}
                  onClick={handleClose}
                  variant="contained"
                >
                  Abbrechen
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Modal>
      )}
      {!item && (
        <Modal
          open={openItemsModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            sx={{
              ...modalStyles.bookingModal.cardStyle,
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <CardContent sx={modalStyles.bookingModal.content}>
              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="Artikel ID"
                  size="small"
                  name="itemID"
                  value={inputVal.itemID || ""}
                  onChange={handleChange}
                />{" "}
                <TextField
                  variant="outlined"
                  label="Artikelnummer"
                  size="small"
                  name="itemNumber"
                  value={inputVal?.itemNumber || ""}
                  onChange={handleChange}
                />
              </Box>{" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="Straße"
                    size="small"
                    name="street"
                    value={inputVal.street || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    name="streetnumber"
                    value={inputVal?.streetnumber || ""}
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    name="zip"
                    value={inputVal?.zip || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    name="city"
                    value={inputVal?.city || ""}
                    onChange={handleChange}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  label="Land"
                  size="small"
                  name="country"
                  value={inputVal?.country || ""}
                  onChange={handleChange}
                />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="Daten 1"
                    size="small"
                    name="data1"
                    onChange={handleChange}
                    value={inputVal?.data1 || ""}
                  />

                  <TextField
                    variant="outlined"
                    label="Daten 2"
                    size="small"
                    name="data2"
                    onChange={handleChange}
                    value={inputVal?.data2 || ""}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="Daten 3"
                    size="small"
                    name="data3"
                    onChange={handleChange}
                    value={inputVal?.data3 || ""}
                  />

                  <TextField
                    variant="outlined"
                    label="Daten 4"
                    size="small"
                    name="data4"
                    onChange={handleChange}
                    value={inputVal?.data4 || ""}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  label="Daten 5"
                  size="small"
                  name="data5"
                  onChange={handleChange}
                  value={inputVal?.data5 || ""}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  sx={modalStyles.bookingModal.button}
                  variant="contained"
                >
                  Speichern
                </Button>
                <Button
                  sx={modalStyles.bookingModal.button}
                  //   onClick={handleDelete}
                  variant="contained"
                >
                  Löschen
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default ItemsModal;
