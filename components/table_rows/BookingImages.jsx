import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import ImageModal from "../modals/ImageModal";
const BookingImages = ({ imgSrc }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        display: "inline-block",
        p: 0.8,
        marginInline: 1,
        borderRadius: "8px",
        display: "flex",
      }}
    >
      <ImageModal open={open} setOpen={setOpen} imgSrc={imgSrc} />
      <img
        onClick={() => setOpen(true)}
        style={{
          maxHeight: "10rem",

          cursor: "pointer",
          outline: "1px solid #888",
          outlineOffset: "2px",
          borderRadius: "8px",
        }}
        src={imgSrc}
      />
    </Box>
  );
};

export default BookingImages;
