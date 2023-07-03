import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  minWidth: 450,
  maxHeight: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "center",
  display: "grid",
  placeItems: "center",
};

const ImageModal = ({ imgSrc, open, setOpen }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "grid", placeItems: "center" }}
      >
        <Box sx={style}>
          <img
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "70vh",
              width: "auto",
              height: "auto",
            }}
            src={imgSrc}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ImageModal;
