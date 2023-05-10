import { tableStyles } from "@/styles/table_styles";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ItemsModal from "../modals/ItemsModal";
import EditIcon from "@mui/icons-material/Edit";

const ItemsTableRow = ({ item, selectedColumns }) => {
  const [openItemsModal, setOpenItemsModal] = useState(false);

  return (
    <TableRow key={item.ItemNumber} sx={tableStyles.tr.row}>
      <TableCell align="left" scope="row">
        <Tooltip title="Bearbeiten" arrow>
          <IconButton onClick={() => setOpenItemsModal(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
      {selectedColumns.includes("typ") && (
        <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
          <ItemsModal
            setOpenItemsModal={setOpenItemsModal}
            openItemsModal={openItemsModal}
            item={item}
          />

          {item?.ItemType === "Order" && "Auftrag"}
          {item?.itemType === "Meter" && "Zähler"}
          {item?.itemType === "Car" && "KFZ"}
        </TableCell>
      )}
      {selectedColumns.includes("artikelnummer") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.ItemNumber}
        </TableCell>
      )}

      {selectedColumns.includes("straße") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Street}
        </TableCell>
      )}
      {selectedColumns.includes("hausnummer") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Streetnumber}
        </TableCell>
      )}
      {selectedColumns.includes("plz") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Zip}
        </TableCell>
      )}
      {selectedColumns.includes("stadt") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.City}
        </TableCell>
      )}
      {selectedColumns.includes("land") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Country ? item?.Country : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten1") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data1 ? item?.data1 : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten2") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data2 ? item?.data2 : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten3") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data3 ? item?.data3 : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten4") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data4 ? item?.data4 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten5") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data5 ? item?.data5 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten6") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data6 ? item?.data6 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten7") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data7 ? item?.data7 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten8") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data8 ? item?.data8 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten9") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data9 ? item?.data9 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten10") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data10 ? item?.data10 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("erstellt am") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {/* {JSON.stringify(item?.CreatedDate)} */}
          {new Date(item?.CreatedDate).toLocaleDateString("de")}
        </TableCell>
      )}
    </TableRow>
  );
};

export default ItemsTableRow;
