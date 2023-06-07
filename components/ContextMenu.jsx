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
import React, { useEffect, useRef, useState } from "react";
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
  tableRef,
}) => {
  const [open, setOpen] = useState({
    columns: false,
    something1: false,
    something2: false,
  });
  const { closeContextMenu } = useContextMenu(contextMenu, setContextMenu);
  const styles = {
    contextMenu: {
      zIndex: 20,
      position: "absolute",
      top: `${Y}px`,
      left: `${X}px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "end",
      // padding: "0.5rem",
      rowGap: "5px",
      border: "1px solid #000",
      borderRadius: "5px",
      width: "200px",
      maxHeight: "350px",
      minHeight: open.columns ? "150px" : "40px",
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

  const contextMenuRef = useRef(null);
  const isClicked = useRef(null);

  const resizeRef = useRef(null);
  const isResizeClicked = useRef(null);

  useOnClickOutside(contextMenuRef, closeContextMenu);

  //#region Resizable Context Menu

  useEffect(() => {
    if (!contextMenuRef) return;
    const menu = contextMenuRef.current;
    const resizeEl = resizeRef.current;
    const styles = window.getComputedStyle(contextMenuRef.current);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    // Right Resize

    const onMouseMoveRight = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      menu.style.width = `${width}px`;

      onMouseDownBottom(event);
    };
    const onMouseUpRight = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRight);
    };

    const onMouseDownRight = (event) => {
      x = event.clientX;
      menu.style.left = styles.left;
      menu.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRight);
      document.addEventListener("mouseup", onMouseUpRight);
    };

    //!----------Bottom resize-----------

    const onMouseMoveBottom = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      menu.style.height = `${height}px`;
      menu.style.maxHeight = `${height}px`;
    };
    const onMouseUpBottom = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottom);
    };

    const onMouseDownBottom = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(contextMenuRef.current);
      menu.style.top = styles.top;
      menu.style.bottom = null;

      document.addEventListener("mousemove", onMouseMoveBottom);
      document.addEventListener("mouseup", onMouseUpBottom);
    };

    const allMouseDown = (e) => {};

    resizeEl.addEventListener("mousedown", onMouseDownBottom);
    resizeEl.addEventListener("mousedown", onMouseDownRight);

    return () => {
      document.removeEventListener("mousedown", onMouseDownRight);
    };
  }, []);

  //#endregion

  //#region Draggable Context Menu

  useEffect(() => {
    if (!contextMenuRef) return;
    const menu = contextMenuRef.current;
    const table = tableRef.current;

    const onMouseDown = (e) => {
      if (!e.target.classList.contains("resizeIcon")) {
        isClicked.current = true;
      }
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      menu.style.top = `${e.clientY}px`;
      menu.style.left = `${e.clientX}px`;
    };
    const onMouseUp = () => {
      isClicked.current = false;
      // table.removeEventListener("mousemove", onMouseMove);
    };
    menu.addEventListener("mousedown", onMouseDown);
    menu.addEventListener("mouseup", onMouseUp);
    table.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      menu.removeEventListener("mousedown", onMouseDown);
      menu.removeEventListener("mouseup", onMouseUp);
      table.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, []);
  //#endregion

  return (
    <Box sx={styles.contextMenu} component={Paper} ref={contextMenuRef}>
      <Button
        sx={{ width: "100%" }}
        size="small"
        onClick={() => setOpen({ ...open, columns: !open.columns })}
      >
        Spalten Verwalten
      </Button>
      {setOpenItemsModal !== undefined && (
        <Button onClick={() => setOpenItemsModal(true)}>neu einfügen</Button>
      )}

      {open.columns && <ColumnMenu allColumns={allColumns} styles={styles} />}
      <Box
        ref={resizeRef}
        className="resizeIcon"
        sx={{
          position: "absolute",
          right: 8,
          bottom: 10.5,
          textAlign: "right",
          // width: "25px",
          // height: "10px",
          marginRight: "-7px",
          marginBottom: "-10px",
          padding: "2px 4px",
          cursor: "nwse-resize",
          opacity: "0.4",
          "&:hover": {
            opacity: "1",
            background: "blue",
            color: "#fff",
            borderRadius: "10px 0 0 0 ",
          },
        }}
      >
        ⇲
      </Box>
    </Box>
  );
};

export default ContextMenu;
