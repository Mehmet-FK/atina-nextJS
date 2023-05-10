"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { modalStyles } from "@/styles/modal_styles";

const ItemsModal = ({ setOpenItemsModal, openItemsModal, item }) => {
  const handleClose = () => setOpenItemsModal(false);
  const [inputVal, setInputVal] = useState({ itemType: "sdfsdfsd" });

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
            <CardContent sx={modalStyles.bookingModal.content}>
              <Box sx={modalStyles.bookingModal.inputGroup}>
                <TextField
                  variant="outlined"
                  label="Typ"
                  size="small"
                  name="date"
                  sx={{ width: "100%" }}
                  value={inputVal.itemType || ""}
                  onChange={(e) =>
                    setInputVal({
                      ...inputVal,
                      date: e.target.value,
                    })
                  }
                />{" "}
                <TextField
                  variant="outlined"
                  label="Artikelnummer"
                  size="small"
                  name="time"
                  sx={{ width: "100%" }}
                  value={inputVal.item || ""}
                  onChange={(e) =>
                    setInputVal({
                      ...inputVal,
                      time: e.target.value,
                    })
                  }
                />{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Buchungstyp"
                  size="small"
                  value={item?.itemType || ""}
                />

                <TextField
                  variant="outlined"
                  label="Straße"
                  size="small"
                  value={item?.street || ""}
                />

                <TextField
                  variant="outlined"
                  label="Hausnummer"
                  size="small"
                  value={item?.streetnumber || ""}
                />

                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    value={item?.zip || ""}
                  />

                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    // value={item?.city || ""}
                  />
                </Box>
                <TextField
                  variant="outlined"
                  label="Land"
                  size="small"
                  value={item?.country || ""}
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
                  onClick={handleClose}
                  variant="contained"
                >
                  Löschen
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
          <Card sx={modalStyles.bookingModal.cardStyle}>
            <CardContent sx={modalStyles.bookingModal.content}>
              <Box sx={modalStyles.bookingModal.inputGroup}>
                <TextField
                  variant="outlined"
                  label="Datum"
                  size="small"
                  name="date"
                  sx={{ width: "100%" }}
                  value={inputVal.date || ""}
                  onChange={(e) =>
                    setInputVal({
                      ...inputVal,
                      date: e.target.value,
                    })
                  }
                />{" "}
                <TextField
                  variant="outlined"
                  label="Uhrzeit"
                  size="small"
                  name="time"
                  sx={{ width: "100%" }}
                  value={
                    inputVal.time?.slice(0, inputVal.time.indexOf(".")) || ""
                  }
                  onChange={(e) =>
                    setInputVal({
                      ...inputVal,
                      time: e.target.value,
                    })
                  }
                />{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="Buchungstyp"
                    size="small"
                    value={item?.itemType || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                    InputProps={{ readOnly: true }}
                  />
                </Tooltip>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="Straße"
                    size="small"
                    value={item?.street || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                    InputProps={{ readOnly: true }}
                  />
                </Tooltip>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="Hausnummer"
                    size="small"
                    value={item?.streetnumber || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                    InputProps={{ readOnly: true }}
                  />
                </Tooltip>
                <Box sx={{ display: "flex" }}>
                  <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                    <TextField
                      variant="outlined"
                      label="PLZ"
                      size="small"
                      value={item?.zip || ""}
                      sx={{ input: { color: "#888", cursor: "auto" } }}
                      InputProps={{ readOnly: true }}
                    />
                  </Tooltip>
                  <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                    <TextField
                      variant="outlined"
                      label="Stadt"
                      size="small"
                      value={item?.city || ""}
                      sx={{ input: { color: "#888", cursor: "auto" } }}
                      InputProps={{ readOnly: true }}
                    />
                  </Tooltip>
                </Box>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="Land"
                    size="small"
                    value={item?.country || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                    InputProps={{ readOnly: true }}
                  />
                </Tooltip>
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
                  onClick={handleClose}
                  variant="contained"
                >
                  Schließen
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
