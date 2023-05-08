"use client";

import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import BookingsModal from "../modals/BookingsModal";
import { tableStyles } from "@/styles/table_styles";

const CustomTableRow = ({ booking, selectedColumns }) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenBookingModal(true);
    }
  };

  let date = new Date(booking?.date);
  let time = booking?.time;
  time = time.slice(0, time?.indexOf("."));
  return (
    <TableRow key={booking.id} sx={tableStyles.tr.row} onClick={handleDblClick}>
      {selectedColumns.includes("datum") && (
        <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
          <BookingsModal
            openBookingModal={openBookingModal}
            setOpenBookingModal={setOpenBookingModal}
            booking={booking}
          />
          {date.toLocaleDateString("de")}
        </TableCell>
      )}
      {selectedColumns.includes("uhrzeit") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {time}
        </TableCell>
      )}
      {selectedColumns.includes("buchungstyp") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {booking?.bookingType}
        </TableCell>
      )}
      {selectedColumns.includes("straße") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {booking?.street}
        </TableCell>
      )}
      {selectedColumns.includes("hausnummer") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {booking?.streetnumber}
        </TableCell>
      )}
      {selectedColumns.includes("plz") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {booking?.zip}
        </TableCell>
      )}
      {selectedColumns.includes("stadt") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {booking?.city}
        </TableCell>
      )}
      {selectedColumns.includes("land") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {booking?.country}
        </TableCell>
      )}
      {selectedColumns.includes("erstellt am") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {JSON.stringify(booking?.createdDate)}
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
