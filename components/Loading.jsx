"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  /* const { loading } = useSelector((state) => state.atina);

  useEffect(() => {
    loading && handleOpen();
    !loading && handleClose();
  }, [loading]);
 */
  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "#000000dd",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;
