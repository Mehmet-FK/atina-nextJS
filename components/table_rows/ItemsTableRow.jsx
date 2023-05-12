import { tableStyles } from "@/styles/table_styles";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ItemsModal from "../modals/ItemsModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import ConfirmDialog from "../ConfirmDialog";

const ItemsTableRow = ({ item, selectedColumns }) => {
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenItemsModal(true);
    }
  };

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        id={item?.id}
      />
      <TableRow
        key={item.ItemNumber}
        onClick={handleDblClick}
        sx={{ ...tableStyles.tr.row, cursor: "pointer" }}
      >
        {selectedColumns.includes("typ") && (
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
        )}
        {selectedColumns.includes("artikelnummer") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.itemNumber}
          </TableCell>
        )}

        {selectedColumns.includes("straße") && item?.itemType !== "Vehicle" && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.street}
          </TableCell>
        )}
        {selectedColumns.includes("hausnummer") &&
          item?.itemType !== "Vehicle" && (
            <TableCell sx={tableStyles.tr.cell} align="left">
              {item?.streetnumber}
            </TableCell>
          )}
        {selectedColumns.includes("plz") && item?.itemType !== "Vehicle" && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.zip}
          </TableCell>
        )}
        {selectedColumns.includes("stadt") && item?.itemType !== "Vehicle" && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.city}
          </TableCell>
        )}
        {selectedColumns.includes("land") && item?.itemType !== "Vehicle" && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.country ? item?.country : ""}
          </TableCell>
        )}

        {selectedColumns.includes("daten1") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data1 ? item?.data1 : ""}
          </TableCell>
        )}

        {selectedColumns.includes("daten2") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data2 ? item?.data2 : ""}
          </TableCell>
        )}

        {selectedColumns.includes("daten3") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data3 ? item?.data3 : ""}
          </TableCell>
        )}

        {selectedColumns.includes("daten4") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data4 ? item?.data4 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("daten5") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data5 ? item?.data5 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("daten6") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data6 ? item?.data6 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("daten7") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data7 ? item?.data7 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("daten8") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data8 ? item?.data8 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("daten9") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data9 ? item?.data9 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("daten10") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {item?.data10 ? item?.data10 : ""}
          </TableCell>
        )}
        {selectedColumns.includes("erstellt am") && (
          <TableCell sx={tableStyles.tr.cell} align="left">
            {/* {JSON.stringify(item?.CreatedDate)} */}
            {new Date(item?.createdDate).toLocaleDateString("de")}
          </TableCell>
        )}
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
    </>
  );
};

export default ItemsTableRow;
