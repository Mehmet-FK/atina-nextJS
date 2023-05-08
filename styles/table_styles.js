export const tableStyles = {
  tableContainer: {
    margin: "auto",
    padding: "0.5rem 10px",
    position: "relative",
  },
  helpersWrapper: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  th: {
    cell: {
      textTransform: "capitalize",
      fontWeight: "600",
      paddingInline: "5px",
      minWidth: "4rem",
    },
  },
  tr: {
    row: {
      cursor: "pointer",
      "&:last-child td, &:last-child th": { border: 0 },
      "&:hover": { backgroundColor: "#ddd" },
    },
    cell: {
      fontSize: "0.8em",
      padding: " 10px",
    },
    image: {
      transition: "0.3s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2.5)",
        zIndex: "4",
      },
    },
  },
};
