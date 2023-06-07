"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  TextField,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { modalStyles } from "@/styles/modal_styles";
import { useSession } from "next-auth/react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloseIcon from "@mui/icons-material/Close";

const BookingsModal = ({ setOpenBookingModal, openBookingModal, booking }) => {
  const { data } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const handleClose = () => setOpenBookingModal(false);
  const [inputVal, setInputVal] = useState({
    ...booking,
  });

  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, []);

  return (
    <>
      <Modal
        open={openBookingModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyles.bookingModal.cardStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
            >
              <LibraryBooksIcon fontSize="large" />
              <Typography variant="h5">Mobile Buchungen</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <CardContent sx={modalStyles.bookingModal.content}>
            <Box sx={modalStyles.bookingModal.inputGroup}>
              <TextField
                variant="outlined"
                label="Datum"
                size="small"
                name="date"
                sx={{ width: "100%" }}
                value={new Date(inputVal.Date).toLocaleDateString("tr") || ""}
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
              {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
              <TextField
                variant="outlined"
                label="Buchungstyp"
                size="small"
                sx={{ width: "100%" }}
                value={inputVal.BookingType || ""}
              />
              {/* </Tooltip> */}
              {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
              <TextField
                variant="outlined"
                label="Straße"
                size="small"
                sx={{ width: "100%" }}
                value={inputVal.Street || ""}
              />
              {/* </Tooltip> */}
              {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
              <TextField
                variant="outlined"
                label="Hausnummer"
                size="small"
                sx={{ width: "100%" }}
                value={inputVal.Streetnumber || ""}
              />
              {/* </Tooltip> */}
              <Box sx={{ display: "flex" }}>
                {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
                <TextField
                  variant="outlined"
                  label="PLZ"
                  size="small"
                  sx={{ width: "100%" }}
                  value={inputVal.ZIP || ""}
                />
                {/* </Tooltip> */}
                {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
                <TextField
                  variant="outlined"
                  label="Stadt"
                  size="small"
                  sx={{ width: "100%" }}
                  value={inputVal.City || ""}
                />
                {/* </Tooltip> */}
              </Box>
              {/* <Tooltip title={"Gesperrt"} placement="top-start" arrow> */}
              <TextField
                variant="outlined"
                label="Land"
                size="small"
                sx={{ width: "100%" }}
                value={inputVal.Country || ""}
              />
              {/* </Tooltip> */}
            </Box>
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
                onClick={handleClose}
                variant="contained"
              >
                {isAdmin ? "Abbrechen" : "Schließen"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default BookingsModal;
