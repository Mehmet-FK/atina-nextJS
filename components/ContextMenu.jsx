"use client";

import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Paper,
} from "@mui/material";
import useOnClickOutside from "../hooks/useOnClickOutside";
import React, { useRef, useState } from "react";
import useContextMenu from "../hooks/useContextMenu";

const ColumnMenu = ({ allColumns, styles }) => {
  return (
    <Box sx={styles.itemWrap}>
      {allColumns.map((column, i) => (
        <MenuItem key={i} sx={{ padding: 0 }} value={column.Header}>
          <Checkbox {...column.getToggleHiddenProps()} />
          <ListItemText
            sx={{ textTransform: "capitalize" }}
            primary={column.Header}
          />
        </MenuItem>
      ))}
    </Box>
  );
};

const ContextMenu = ({
  allColumns,
  X,
  Y,
  contextMenu,
  setContextMenu,
  setOpenItemsModal,
}) => {
  const styles = {
    contextMenu: {
      zIndex: 20,
      position: "absolute",
      top: `${Y}px`,
      left: `${X}px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alugnItems: "center",
      padding: "0.5rem",
      rowGap: "5px",
      border: "1px solid #000",
      borderRadius: "5px",
      width: "200px",
      maxHeight: "300px",
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    },
    itemWrap: {
      height: "95%",
      width: "100%",
      overflow: "auto",
    },
    item: {
      padding: "3px",
      borderBottom: "1px solid #ddd",
      borderTop: "1px solid #ddd",
      cursor: "pointer",
    },
  };
  const [open, setOpen] = useState({
    columns: false,
    something1: false,
    something2: false,
  });
  const { closeContextMenu } = useContextMenu(contextMenu, setContextMenu);

  const contextMenuRef = useRef(null);

  useOnClickOutside(contextMenuRef, closeContextMenu);

  return (
    <Box sx={styles.contextMenu} component={Paper} ref={contextMenuRef}>
      <Button onClick={() => setOpen({ ...open, columns: !open.columns })}>
        Spalten Verwalten
      </Button>
      {setOpenItemsModal !== undefined && (
        <Button onClick={() => setOpenItemsModal(true)}>neu einfügen</Button>
      )}

      {open.columns && <ColumnMenu allColumns={allColumns} styles={styles} />}
    </Box>
  );
};

export default ContextMenu;
