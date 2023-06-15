"use client";

import { TableCell, TableRow } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import BookingsModal from "../modals/BookingsModal";
import { tableStyles } from "@/styles/table_styles";
import styles from "./table_row_styles.module.css";

const BookingsTableRow = ({ resetResize, row, prepareRow, cellWidth }) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  // const [buchungTypes, setBuchungTypes] = useState({});

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenBookingModal(true);
      console.log(row);
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, [resetResize]);

  return (
    <>
      <BookingsModal
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
        booking={row?.original}
      />
      <TableRow
        {...row.getRowProps()}
        sx={tableStyles.tr.row}
        className={styles.tr}
        onClick={handleDblClick}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              {...cell.getCellProps()}
              sx={{ ...tableStyles.tr.cell, width: cellWidth }}
              className={styles.td}
              align="left"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}
      </TableRow>
    </>

    // <TableRow {...row.getRowProps()} sx={tableStyles.tr.row}  onClick={handleDblClick}>
    //   {selectedColumns.includes("datum") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
    //       <BookingsModal
    //         openBookingModal={openBookingModal}
    //         setOpenBookingModal={setOpenBookingModal}
    //         booking={booking}
    //       />
    //       {date.toLocaleDateString("de")}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("uhrzeit") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {time}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("buchungstyp") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {booking?.bookingType}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("straße") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {booking?.street}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("hausnummer") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {booking?.streetnumber}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("plz") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {booking?.zip}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("stadt") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {booking?.city}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("land") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {booking?.country}
    //     </TableCell>
    //   )}
    //   {selectedColumns.includes("erstellt am") && (
    //     <TableCell sx={tableStyles.tr.cell} align="left">
    //       {JSON.stringify(booking?.createdDate)}
    //     </TableCell>
    //   )}
    // </TableRow>
  );
};

export default BookingsTableRow;
