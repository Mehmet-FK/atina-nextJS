import { TableCell, TableRow } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import UserModal from "../modals/UserModal";
import { tableStyles } from "@/styles/table_styles";

const UsersTableRow = ({ row, prepareRow, resetResize }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
    }
  };
  useEffect(() => {
    prepareRow(row);
  }, [resetResize, row]);

  return (
    <>
      <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
        user={row.original}
      />
      <TableRow
        {...row.getRowProps()}
        sx={tableStyles.tr.row}
        onClick={handleDblClick}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              {...cell.getCellProps()}
              sx={tableStyles.tr.cell}
              align="left"
              scope="row"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default UsersTableRow;
