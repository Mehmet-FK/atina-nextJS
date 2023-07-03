import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import styles from "./table_row_styles.module.css";
import NfcTagsModal from "../modals/NfcTagsModal";

const NfcTableRow = ({ row, prepareRow, resetResize }) => {
  const [openNfcModal, setOpenNfcModal] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenNfcModal(true);
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, [resetResize, row]);

  return (
    <>
      <NfcTagsModal
        openNfcModal={openNfcModal}
        setOpenNfcModal={setOpenNfcModal}
        nfcData={row?.original}
      />
      <TableRow
        {...row.getRowProps()}
        className={styles.tr}
        sx={tableStyles.tr.row}
        onClick={handleDblClick}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              {...cell.getCellProps()}
              sx={{ ...tableStyles.tr.cell, borderRight: "1px solid #eee" }}
              className={styles.td}
              align="left"
              size="small"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default memo(NfcTableRow);
