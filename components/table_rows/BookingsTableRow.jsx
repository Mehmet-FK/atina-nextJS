"use client";

import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import BookingsModal from "../modals/BookingsModal";
import { tableStyles } from "@/styles/table_styles";
import styles from "./table_row_styles.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BookingImageRow from "./BookingImageRow";

const BookingsTableRow = ({ resetResize, row, prepareRow, cellWidth }) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenBookingModal(true);
      console.log(row);
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, [resetResize]);

  const arr = [
    "https://upload.wikimedia.org/wikipedia/it/thumb/f/f0/Screenshot_Videoclip_Never_Gonna_Give_You_Up.png/390px-Screenshot_Videoclip_Never_Gonna_Give_You_Up.png",
    "https://uproxx.com/wp-content/uploads/2021/02/rick-astley-never-gonna-give-you-up-video-full.jpg?w=1600&h=660&crop=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPg_IK_P-S8gdZrDaWorkEDLYylMHFmRgtsA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5-EHlWeQn8VsiVOR6GxEFEqCC88lgJj-3JQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRInepRT1hvtJnFaJIc100EVgXe9bxqJi0y3vfIHrZwSTg2RtiB9awDQbOWk-HpZclDgQU&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1h4KVgoBCIP_CN38w6hTNKJjjaom6qyfRMQ&usqp=CAU",
  ];
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
        <TableCell
          sx={{ width: "2.5rem", borderRight: "0.5px solid #ccc", p: 0 }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                maxHeight: "10rem",
                overflow: "auto",
                maxWidth: "100vw",
              }}
            >
              {arr.map((item) => (
                <BookingImageRow imgSrc={item} />
              ))}
            </Box>
          </Collapse>
        </TableCell>
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
