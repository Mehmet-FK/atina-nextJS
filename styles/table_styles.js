export const tableStyles = {
  tableContainer: {
    margin: "auto",
    padding: "0.5rem 10px",
    position: "relative",
  },
  helpersWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  th: {
    cell: {
      // textTransform: "capitalize",
      // fontWeight: "600",
      // // paddingInline: "5px",
      // minWidth: "6rem",
      // height: "100%",
      // cursor: "pointer",
      // color: "#888",
      // borderRight: "1px solid #aaa",
      // fontSize: "0.7rem",
      textTransform: "capitalize",
      fontWeight: "600",
      color: "#888",
      fontSize: "0.7rem",
      cursor: "pointer",
      borderRight: "1px solid #ddd",
    },
  },
  tr: {
    row: {
      "&:last-child td, &:last-child th": { border: 0 },
      "&:hover": { backgroundColor: "#ddd" },
    },
    cell: {
      fontSize: "0.7em",
      borderRight: "1px solid #ddd",
      // padding: " 10px",
    },
    image: {
      transition: "0.3s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2)",
        zIndex: "4",
      },
    },
  },
};
