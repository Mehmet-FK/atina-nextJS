import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookingsModal from "../modals/BookingsModal";
import { tableStyles } from "@/styles/table_styles";
import styles from "./table_row_styles.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BookingImages from "./BookingImages";

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
                p: 1,
                maxHeight: "12rem",
                overflow: "auto",
                maxWidth: "100vw",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row?.original?.Files?.map((item) => (
                <BookingImages key={item} imgSrc={item} />
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingsTableRow;
