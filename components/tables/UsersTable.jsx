"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";
import Pagination from "../Pagination";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import UsersTableRow from "../table_rows/UsersTableRow";
import UsersFilter from "../filters/UsersFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";
import styles from "./table_styles.module.css";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useSortColumn from "@/hooks/useSortColumn";
import { USER_TABLE_COLUMNS } from "./columns";
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import Tooltip from "@mui/material/Tooltip";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const UsersTable = ({ data }) => {
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [restart, setRestart] = useState(false);
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState([]);
  const [resetResize, setResetResize] = useState(false);

  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = data?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table sort  START===

  const columnObj = {
    firstname: 1,
    lastname: 1,
    passwordSalt: 1,
    username: 1,
    personnelnumber: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    shownData,
    columnObj
  );

  //? Table Utilities START

  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 200,
      maxWidth: 600,
    }),
    []
  );

  const tableColumns = useMemo(() => USER_TABLE_COLUMNS, []);

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    allColumns,
    resetResizing,
  } = useTable(
    { columns: tableColumns, data: shownData, defaultColumn },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  //? Table Utilities END

  // ===Table sort  END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = () => {
    //TODO: Search Function
    /* const filteredData = "";
    setShownData(filteredData); */
  };

  const handleReset = () => {
    setFilterVal({});
    handlePagination();
  };
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  // const { getUsersData } = useAtinaCalls();

  useEffect(() => {
    // getUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, data]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {contextMenu.show && (
        <ContextMenu
          allColumns={allColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          // ref={contextMenuRef}
          tableColumns={tableColumns}
        />
      )}
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        sx={{
          maxWidth: xxl ? "90vw" : { lg: "1250px" },
          margin: "auto",
          padding: "0.5rem 10px",
          maxHeight: "90vh",
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
            //TODO: set allData state
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            // setRestart={setRestart}
          />
          <IconButton
            onClick={() => {
              resetResizing();
              setResetResize(!resetResize);
            }}
          >
            <UndoIcon />
          </IconButton>
          <DownloadCSV rawData={shownData} />
        </Box>
        <Table
          {...getTableProps()}
          sx={{ minWidth: 650, position: "relative" }}
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
                    className={styles.th}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={tableStyles.th.cell}
                    align="left"
                  >
                    <Box
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
            {rows.map((row, i) => {
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
