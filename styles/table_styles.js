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
      // "&:last-child td, &:last-child th": { border: 0 },
      "&:hover": { backgroundColor: "#bbbb" },
    },
    cell: {
      fontSize: "0.7em",
      borderRight: "0.5px solid #ccc",
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
