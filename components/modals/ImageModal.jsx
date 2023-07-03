import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  display: "grid",
  placeItems: "center",
};

const ImageModal = ({ imgSrc, open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            style={{
              width: "100%",
            }}
            src={imgSrc}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ImageModal;
