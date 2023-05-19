import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React, { memo, useEffect } from "react";
import styles from "./table_row_styles.module.css";

const NfcTableRow = ({ row, prepareRow, resetResize }) => {
  useEffect(() => {
    prepareRow(row);
  }, [resetResize]);

  return (
    <TableRow
      {...row.getRowProps()}
      className={styles.tr}
      sx={tableStyles.tr.row}
    >
      {row.cells.map((cell) => {
        return (
          <TableCell
            {...cell.getCellProps()}
            sx={{ ...tableStyles.tr.cell, borderRight: "1px solid #ddd" }}
            className={styles.td}
            align="left"
          >
            {cell.render("Cell")}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default memo(NfcTableRow);
