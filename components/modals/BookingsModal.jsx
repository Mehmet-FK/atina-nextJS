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
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const BookingsModal = ({ setOpenBookingModal, openBookingModal, booking }) => {
  const { data } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const { bookingTypes } = useSelector((state) => state.atina);
  //  const [bookingTypes, setBookingTypes] = useState();
  const handleClose = () => setOpenBookingModal(false);
  const [inputVal, setInputVal] = useState({
    ...booking,
    Time: booking?.Time?.slice(0, booking?.Time.indexOf(".")),
  });

  const handleChange = (e) => {
    if (!isAdmin) return;

    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, [data]);
  useEffect(() => {
    setInputVal({
      ...booking,
      Time: booking?.Time?.slice(0, booking?.Time.indexOf(".")),
    });
  }, [booking]);
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
            <Box
              sx={{
                ...modalStyles.bookingModal.inputGroup,
                flexDirection: "row",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Datum"
                  size="small"
                  format="DD.MM.YYYY"
                  name="Date"
                  sx={{ width: "100%" }}
                  onChange={(newVal) =>
                    setInputVal({
                      ...inputVal,
                      Date: `${newVal.$d}`,
                    })
                  }
                  value={dayjs(inputVal.Date)}
                />
              </LocalizationProvider>
              {/* <TextField
                value={inputVal.Date || ""}
                sx={{ width: "100%" }}
                className={"date-input"}
                variant="outlined"
                size="small"
                label="Datum"
                name="Date"
                onChange={(e) =>
                  setInputVal({
                    ...inputVal,
                    Date: e.target.value,
                  })
                }
                // sx={filterStyles.textField}
              />*/}
              <TextField
                variant="outlined"
                label="Uhrzeit"
                size="small"
                name="Time"
                sx={{ width: "100%" }}
                value={inputVal.Time || ""}
                onChange={(e) =>
                  setInputVal({
                    ...inputVal,
                    Time: e.target.value,
                  })
                }
              />{" "}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
            >
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="bookingType">Buchungstyp</InputLabel>
                <Select
                  readOnly={!isAdmin}
                  labelId="bookingType"
                  id="demo-select-small"
                  value={inputVal?.BookingType || ""}
                  label="Buchungstyp"
                  onChange={(e) =>
                    setInputVal({ ...inputVal, BookingType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {bookingTypes &&
                    Object.entries(bookingTypes)?.map((item, i) => {
                      return (
                        <MenuItem key={i} value={item[0]}>
                          {item[1]?.Caption}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                label="Datensatznummer"
                size="small"
                sx={{ width: "100%" }}
                name="Itemnumber"
                onChange={handleChange}
                value={inputVal.Itemnumber || ""}
              />
              <TextField
                variant="outlined"
                label="Straße"
                size="small"
                sx={{ width: "100%" }}
                name="Street"
                onChange={handleChange}
                value={inputVal.Street || ""}
              />

              <TextField
                variant="outlined"
                label="Hausnummer"
                size="small"
                sx={{ width: "100%" }}
                name="Streetnumber"
                onChange={handleChange}
                value={inputVal.Streetnumber || ""}
              />

              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="PLZ"
                  size="small"
                  sx={{ width: "100%" }}
                  name="ZIP"
                  onChange={handleChange}
                  value={inputVal.ZIP || ""}
                />

                <TextField
                  variant="outlined"
                  label="Stadt"
                  size="small"
                  sx={{ width: "100%" }}
                  name="City"
                  onChange={handleChange}
                  value={inputVal.City || ""}
                />
              </Box>

              <TextField
                variant="outlined"
                label="Land"
                size="small"
                name="Country"
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={inputVal.Country || ""}
              />
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
