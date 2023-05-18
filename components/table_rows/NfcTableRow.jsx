import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React, { memo, useEffect } from "react";

const NfcTableRow = ({ row, prepareRow }) => {
  useEffect(() => {
    prepareRow(row);
  }, []);

  return (
    <TableRow {...row.getRowProps()} sx={tableStyles.tr.row}>
      {row.cells.map((cell) => {
        return (
          <TableCell
            {...cell.getCellProps()}
            sx={tableStyles.tr.cell}
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
