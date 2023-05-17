import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";

const NfcTableRow = ({ tag, item, selectedColumns }) => {
  return (
    <TableRow sx={tableStyles.tr.row}>
      {selectedColumns.includes("typ") && (
        <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
          {item?.itemType === "Order" && "Auftrag"}
          {item?.itemType === "Meter" && "Zähler"}
          {item?.itemType === "Car" && "KFZ"}
        </TableCell>
      )}
      {selectedColumns.includes("artikelnummer") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.itemNumber}
        </TableCell>
      )}

      {selectedColumns.includes("straße") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.street}
        </TableCell>
      )}
      {selectedColumns.includes("hausnummer") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.streetnumber}
        </TableCell>
      )}
      {selectedColumns.includes("plz") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.zip}
        </TableCell>
      )}
      {selectedColumns.includes("stadt") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.city}
        </TableCell>
      )}
      {selectedColumns.includes("land") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {item?.country}
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
          {/* {JSON.stringify(tag?.createdDate)} */}
          {new Date(item?.createdDate).toLocaleDateString("de")}
        </TableCell>
      )}
    </TableRow>
  );
};

export default memo(NfcTableRow);
