export const modalStyles = {
  bookingModal: {
    cardStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 2,
      overflow: "auto",
    },
    content: { display: "flex", flexDirection: "column", rowGap: "15px" },
    imgStyle: {
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "15rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10rem",
      color: "#00000055",
      backgroundColor: "#ddd",
    },
    inputGroup: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      rowGap: "15px",
    },
    input: {
      border: "2px solid red",
      color: "red",
      height: "2rem",
      display: "none",
    },
    text: {
      padding: "10px 15px",
    },
    button: {
      backgroundColor: "#e10000",
      width: "45%",
    },
  },
  userModal: {
    cardStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      padding: "0 1rem 1rem 1rem",
      overflow: "auto",
    },
    content: { display: "flex", flexDirection: "column", rowGap: "15px" },
    imgStyle: {
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "10rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "7rem",
      color: "#00000055",
      backgroundColor: "#ddd",
    },
    inputGroup: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      rowGap: "15px",
    },
    input: {
      border: "2px solid red",
      color: "red",
      height: "2rem",
      display: "none",
    },
    imgStyle: {
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "10rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "7rem",
      color: "#00000055",
      backgroundColor: "#ddd",
    },
    text: {
      padding: "10px 15px",
    },
    button: {
      backgroundColor: "#e10000",
    },
  },
  errorModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
