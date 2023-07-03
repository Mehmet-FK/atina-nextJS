"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/system";
import UsersTableRow from "../table_rows/UsersTableRow";
import UsersFilter from "../filters/UsersFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";
import styles from "./table_styles.module.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import Tooltip from "@mui/material/Tooltip";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import useColumns from "@/hooks/useColumns";
import Pagination from "../Pagination";
const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const UsersTable = ({ data }) => {
  const tableRef = useRef(null);
  const { USER_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  // ===pagination states START===
  const [allData, setAllData] = useState(data);
  const [shownData, setShownData] = useState(allData);
  const [resetResize, setResetResize] = useState(false);
  const [tableWidth, setTableWidth] = useState(null);

  // ===pagination states END===

  //? Table Utilities START
  //#region
  const tableColumns = useMemo(() => USER_TABLE_COLUMNS, []);

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 225,
      maxWidth: 600,
    }),
    [tableRef, tableWidth]
  );

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
    pageOptions,
    nextPage,
    previousPage,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTable(
    {
      columns: tableColumns,
      data: allData,
      defaultColumn,
      isMultiSortEvent: (e) => {
        if (e.ctrlKey) return true;
      },
    },
    useSortBy,
    usePagination,
    useResizeColumns,
    useBlockLayout
  );
  //#endregion
  //? Table Utilities END

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = () => {
    //TODO: Search Function
  };

  const handleReset = () => {
    setFilterVal({});
  };
  // ===Table Filter END===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {contextMenu.show && (
        <ContextMenu
          allColumns={allColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          tableColumns={tableColumns}
          tableRef={tableRef}
        />
      )}
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        ref={tableRef}
        sx={{
          maxWidth: xxl ? "90vw" : "auto",
          width: "100%",
          margin: "auto",
          padding: "0.5rem 10px",
          maxHeight: "83vh",
          overflow: "auto",
        }}
      >
        <UsersFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Pagination
            data={allData}
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            state={state}
            setPageSize={setPageSize}
            gotoPage={gotoPage}
          />
          <Tooltip title="Spaltengröße rückgängig machen" arrow>
            <IconButton
              onClick={() => {
                resetResizing();
                setResetResize(!resetResize);
              }}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <DownloadCSV rawData={shownData} fileName={"benutzer"} />
        </Box>
        <Table
          ref={tableRef}
          {...getTableProps()}
          sx={{ minWidth: 650, position: "relative" }}
          aria-label="simple table"
          size="small"
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                className={styles.tr}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{
                      ...tableStyles.th.cell,
                    }}
                    align="left"
                  >
                    <Box
                      {...column.getSortByToggleProps()}
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Box sx={{ color: "text.color" }}>
                        {column.render("Header")}{" "}
                      </Box>

                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        )
                      ) : (
                        ""
                      )}
                    </Box>
                    <div
                      {...column.getResizerProps()}
                      onClick={() => setResetResize(!resetResize)}
                      className={`${styles.resizer} ${
                        column.isResizing ? styles.isResizing : null
                      }`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <UsersTableRow
                  key={i}
                  row={row}
                  prepareRow={prepareRow}
                  resetResize={resetResize}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
