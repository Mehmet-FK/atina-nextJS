import { tableStyles } from "@/styles/table_styles";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ItemsModal from "../modals/ItemsModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./table_row_styles.module.css";

const ItemsTableRow = ({ row, prepareRow, resetResize }) => {
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenItemsModal(true);
      console.log(new Date(row?.original?.data1));
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, [resetResize]);

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        id={row?.original.id}
      />
      <ItemsModal
        setOpenItemsModal={setOpenItemsModal}
        openItemsModal={openItemsModal}
        item={row?.original}
        type={row?.original?.itemType}
      />
      <TableRow
        className={styles.tr}
        {...row.getRowProps()}
        onClick={handleDblClick}
        sx={tableStyles.tr.row}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              className={styles.td}
              {...cell.getCellProps()}
              sx={{ ...tableStyles.tr.cell, wordBreak: "break-word" }}
              align="left"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}

        <TableCell
          sx={{ borderRight: "1px solid #ddd", minWidth: "70px" }}
          align="left"
          scope="row"
        >
          <Tooltip title="Bearbeiten" arrow>
            <IconButton onClick={() => setOpenItemsModal(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell
          sx={{ borderRight: "1px solid #ddd", minWidth: "70px" }}
          align="left"
          scope="row"
        >
          <Tooltip title="Löschen" arrow>
            <IconButton onClick={() => setOpenDialog(true)}>
              <DeleteForeverIcon fontSize="small" sx={{ color: "#ff0000" }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ItemsTableRow;
