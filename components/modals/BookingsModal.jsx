"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { modalStyles } from "@/styles/modal_styles";

const BookingsModal = ({ setOpenBookingModal, openBookingModal, booking }) => {
  const handleClose = () => setOpenBookingModal(false);
  const [inputVal, setInputVal] = useState({
    ...booking,
  });

  return (
    <div>
      <Modal
        open={openBookingModal}
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
                value={inputVal.Date || ""}
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
                  inputVal.Time?.slice(0, inputVal.Time.indexOf(".")) || ""
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
              sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
            >
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Buchungstyp"
                  size="small"
                  value={booking.BookingType || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                />
              </Tooltip>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Straße"
                  size="small"
                  value={booking.Street || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                />
              </Tooltip>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Hausnummer"
                  size="small"
                  value={booking.Streetnumber || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                />
              </Tooltip>
              <Box sx={{ display: "flex" }}>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="PLZ"
                    size="small"
                    value={booking.ZIP || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                  />
                </Tooltip>
                <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                  <TextField
                    variant="outlined"
                    label="Stadt"
                    size="small"
                    value={booking.City || ""}
                    sx={{ input: { color: "#888", cursor: "auto" } }}
                  />
                </Tooltip>
              </Box>
              <Tooltip title={"Gesperrt"} placement="top-start" arrow>
                <TextField
                  variant="outlined"
                  label="Land"
                  size="small"
                  value={booking.Country || ""}
                  sx={{ input: { color: "#888", cursor: "auto" } }}
                />
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button sx={modalStyles.bookingModal.button} variant="contained">
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
    </div>
  );
};

export default BookingsModal;
