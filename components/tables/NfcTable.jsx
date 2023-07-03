"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "../Pagination";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/system";
import NfcFilter from "../filters/NfcFilter";
import { useMediaQuery } from "@mui/material";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";
import NfcTableRow from "../table_rows/NfcTableRow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { searchNfcTag } from "@/helpers/searchFunctions";
import { getSession, useSession } from "next-auth/react";
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import styles from "./table_styles.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useColumns from "@/hooks/useColumns";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const NfcTable = ({ data }) => {
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const tableRef = useRef(null);
  const { NFC_TABLE_COLUMNS } = useColumns();

  const [allData, setAllData] = useState(data);

  const [resetResize, setResetResize] = useState(false);

  //* Table Utilities START
  //#region
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const tableColumns = useMemo(() => NFC_TABLE_COLUMNS, []);
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
    useBlockLayout,
    useResizeColumns,
    usePagination
  );
  //#endregion
  // Table Utilities END

  // ===Table Filter START===
  const initialFilterparams = {
    id: null,
    tagID: null,
    desc: null,
    ItemType: "",
    nfcData: null,
    itemID: null,
    createdTo: null,
    createdFrom: "",
  };
  const [filterVal, setFilterVal] = useState(initialFilterparams);

  const handleFilter = () => {
    searchNfcTag(filterVal).then((res) => {
      let editedRes = res.map((x) => x.item);
      setAllData(editedRes);
    });
  };
  const handleReset = () => {
    setFilterVal(initialFilterparams);
  };

  // ===Table Filter END===

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

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
          ...tableStyles.tableContainer,
          maxWidth: xxl ? "90vw" : { lg: "auto" },
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <NfcFilter
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
          <DownloadCSV rawData={allData} fileName={"nfc_tags"} />
        </Box>
        <Table
          {...getTableProps()}
          className="table"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
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
                    // className={styles.th}
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
                      <Box>{column.render("Header")} </Box>

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
            {page?.map((row, i) => {
              prepareRow(row);

              return (
                <NfcTableRow
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

export default NfcTable;
