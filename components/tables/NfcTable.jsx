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

  // ===pagination states START===
  const [allData, setAllData] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(allData);
  const [resetResize, setResetResize] = useState(false);
  const session = useSession();

  const handlePagination = useCallback(() => {
    let currentPage = rowsPerPage * page;
    const newArray = allData?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  }, [page, rowsPerPage, shownData]);
  // ===pagination states END===

  // ===Table sort  START===

  //? Table Utilities START

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
    rows,
    prepareRow,
    allColumns,
    resetResizing,
  } = useTable(
    {
      columns: tableColumns,
      data: shownData,
      defaultColumn,
      isMultiSortEvent: (e) => {
        if (e.ctrlKey) return true;
      },
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  //? Table Utilities END

  // ===Table sort  END===

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
    console.log(filterVal);
    searchNfcTag(filterVal).then((res) => {
      let editedRes = res.map((x) => x.item);
      setAllData(editedRes);
    });
    handlePagination();
  };
  const handleReset = () => {
    setFilterVal(initialFilterparams);
    handlePagination();
  };

  // ===Table Filter END===

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, allData]);

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
          maxHeight: "82vh",
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
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handlePagination={handlePagination}
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
          <DownloadCSV rawData={shownData} fileName={"nfc_tags"} />
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
                    className={styles.th}
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
                      <Box sx={{ color: "#000" }}>
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
            {rows?.map((row, i) => {
              prepareRow(row);

              return (
                <NfcTableRow
                  resetResize={resetResize}
                  key={i}
                  // item={tag}
                  // tag={tag}
                  row={row}
                  prepareRow={prepareRow}
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
