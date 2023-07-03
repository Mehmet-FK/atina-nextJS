import React, { useState } from "react";
import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import ImageModal from "../modals/ImageModal";
const BookingImageRow = ({ imgSrc }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "inline-block" }}>
      <ImageModal open={open} setOpen={setOpen} imgSrc={imgSrc} />
      <img
        onClick={() => setOpen(true)}
        style={{
          maxHeight: "10rem",
          marginRight: "5px",
          cursor: "pointer",
        }}
        src={imgSrc}
      />
    </Box>
  );
};

export default BookingImageRow;
