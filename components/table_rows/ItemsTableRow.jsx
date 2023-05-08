import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React from "react";

const ItemsTableRow = ({ item, selectedColumns }) => {
  return (
    <TableRow key={item.ItemNumber} sx={tableStyles.tr.row}>
      {selectedColumns.includes("typ") && (
        <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
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
          {item?.Country}
        </TableCell>
      )}

      {selectedColumns.includes("daten 1") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data1 ? item?.data1 : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten 2") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data2 ? item?.data2 : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten 3") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data3 ? item?.data3 : ""}
        </TableCell>
      )}

      {selectedColumns.includes("daten 4") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data4 ? item?.data4 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten 5") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data5 ? item?.data5 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten 6") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data6 ? item?.data6 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten 7") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data7 ? item?.data7 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten 8") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data8 ? item?.data8 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten 9") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data9 ? item?.data9 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("daten 10") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.Data10 ? item?.data10 : ""}
        </TableCell>
      )}
      {selectedColumns.includes("erstellt am") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {JSON.stringify(item?.CreatedDate)}
        </TableCell>
      )}
    </TableRow>
  );
};

export default ItemsTableRow;
