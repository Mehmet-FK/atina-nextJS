"use client";

import { Avatar, TableCell, TableRow } from "@mui/material";
import React, { memo, useState } from "react";
import UserModal from "../modals/UserModal";
import { tableStyles } from "@/styles/table_styles";

const UsersTableRow = ({ user, selectedColumns }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
    }
  };

  return (
    <TableRow sx={tableStyles.tr.row} onClick={handleDblClick}>
      {/* <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
        user={user}
      /> */}
      {/* <TableCell
        sx={{ ...tableStyle.tr.cell, paddingLeft: "10px" }}
        component="th"
        scope="row"
      >
        {user?.id}
      </TableCell> */}
      {selectedColumns.includes("vorname") && (
        <TableCell sx={tableStyles.tr.cell} align="left" scope="row">
          <UserModal
            setOpenUserModal={setOpenUserModal}
            openUserModal={openUserModal}
            user={user}
          />
          {user?.firstname}
        </TableCell>
      )}
      {selectedColumns.includes("nachname") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {user?.lastname}
        </TableCell>
      )}
      {selectedColumns.includes("benutzername") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {user?.username}
        </TableCell>
      )}
      {selectedColumns.includes("kennwort") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          ********
        </TableCell>
      )}
      {selectedColumns.includes("personalnummer") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          {user?.personnelnumber}
        </TableCell>
      )}
      {selectedColumns.includes("bild") && (
        <TableCell sx={tableStyles.tr.cell} align="left">
          <Avatar
            sx={tableStyles.tr.image}
            src={`data:image/png;base64,${user?.image}`}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default memo(UsersTableRow);
