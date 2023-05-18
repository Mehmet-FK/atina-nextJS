import { tableStyles } from "@/styles/table_styles";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ItemsModal from "../modals/ItemsModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmDialog from "../ConfirmDialog";

const ItemsTableRow = ({ row, prepareRow }) => {
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenItemsModal(true);
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, []);

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        id={row?.original.id}
      />
      <TableRow
        {...row.getRowProps()}
        onClick={handleDblClick}
        sx={tableStyles.tr.row}
      >
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

        <TableCell align="left" scope="row">
          <Tooltip title="Bearbeiten" arrow>
            <IconButton onClick={() => setOpenItemsModal(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="left" scope="row">
          <Tooltip title="Bearbeiten" arrow>
            <IconButton onClick={() => setOpenDialog(true)}>
              <DeleteForeverIcon fontSize="small" sx={{ color: "#ff0000" }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {/* <>
        <TableRow
          key={item.ItemNumber}
          onClick={handleDblClick}
          sx={{ ...tableStyles.tr.row, cursor: "pointer" }}
        >
          <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
            <ItemsModal
              setOpenItemsModal={setOpenItemsModal}
              openItemsModal={openItemsModal}
              item={item}
            />

            {item?.itemType === "Order" && "Auftrag"}
            {item?.itemType === "Meter" && "Zähler"}
            {item?.itemType === "Vehicle" && "KFZ"}
          </TableCell>
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.itemNumber}
          </TableCell>

          <TableCell align="left" scope="row">
            <Tooltip title="Bearbeiten" arrow>
              <IconButton onClick={() => setOpenItemsModal(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell align="left" scope="row">
            <Tooltip title="Bearbeiten" arrow>
              <IconButton onClick={() => setOpenDialog(true)}>
                <DeleteForeverIcon fontSize="small" sx={{ color: "#ff0000" }} />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </> */}
    </>
  );
};

export default memo(ItemsTableRow);
