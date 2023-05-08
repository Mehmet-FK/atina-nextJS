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
import { useRef, useState } from "react";
import useContextMenu from "../hooks/useContextMenu";

const ColumnMenu = ({
  styles,
  tableColumns,
  handleSelectColumn,
  selectedColumns,
}) => {
  return (
    <Box sx={styles.itemWrap}>
      {tableColumns.map((name) => (
        <MenuItem
          key={name}
          sx={{ padding: 0 }}
          onClick={() => handleSelectColumn(name)}
          value={name}
        >
          <Checkbox checked={selectedColumns.indexOf(name) > -1} />
          <ListItemText sx={{ textTransform: "capitalize" }} primary={name} />
        </MenuItem>
      ))}
    </Box>
  );
};

const ContextMenu = ({
  X,
  Y,
  tableColumns,
  selectedColumns,
  setSelectedColumns,
  contextMenu,
  setContextMenu,
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
      // backgroundColor: "paper",
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

  const handleSelectColumn = (name) => {
    let i = selectedColumns.indexOf(name);
    if (i > -1) {
      let temp = [...selectedColumns];
      temp.splice(i, 1);
      setSelectedColumns(temp);
    } else {
      setSelectedColumns([...selectedColumns, name]);
    }
  };

  return (
    <Box sx={styles.contextMenu} component={Paper} ref={contextMenuRef}>
      <Button onClick={() => setOpen({ ...open, columns: !open.columns })}>
        Spalten Verwalten
      </Button>

      {open.columns && (
        <ColumnMenu
          tableColumns={tableColumns}
          handleSelectColumn={handleSelectColumn}
          selectedColumns={selectedColumns}
          styles={styles}
        />
      )}
    </Box>
  );
};

export default ContextMenu;
