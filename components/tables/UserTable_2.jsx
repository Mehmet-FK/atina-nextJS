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
import UsersTableRow from "../table_rows/UsersTableRow_2";
import UsersFilter from "../filters/UsersFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useSortColumn from "@/hooks/useSortColumn";
import { USER_TABLE_COLUMNS } from "./columns";
import { useSortBy, useTable } from "react-table";
import Tooltip from "@mui/material/Tooltip";
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
  const tableColumns = USER_TABLE_COLUMNS;

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    allColumns,
  } = useTable({ columns: tableColumns, data: shownData }, useSortBy);

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
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
        />
      )}
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        sx={{
          maxWidth: xxl ? "90vw" : { lg: "1250px" },
          margin: "auto",
          padding: "0.5rem 10px",
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
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setRestart={setRestart}
          />
          <DownloadCSV rawData={shownData} />
        </Box>
        <Table
          {...getTableProps()}
          sx={{ minWidth: 650, position: "relative" }}
          aria-label="simple table"
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={tableStyles.th.cell}
                    //   onClick={() => handleSort("firstname")}
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
                  </TableCell>
                ))}

                <>
                  {/* {selectedColumns.includes("nachname") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("lastname")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>nachname </Box>
                    {columns.lastname === 1 && <ArrowDownwardIcon />}
                    {columns.lastname !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("benutzername") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("username")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>benutzername </Box>
                    {columns.username === 1 && <ArrowDownwardIcon />}
                    {columns.username !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("kennwort") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("passwordSalt")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>kennwort </Box>
                    {columns.passwordSalt === 1 && <ArrowDownwardIcon />}
                    {columns.passwordSalt !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("personalnummer") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("personnelnumber")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>personalnummer </Box>
                    {columns.personnelnumber === 1 && <ArrowDownwardIcon />}
                    {columns.personnelnumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("bild") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box sx={{ color: "#000" }}>bild </Box>
                </TableCell>
              )} */}
                </>
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <UsersTableRow
                  row={row}
                  prepareRow={prepareRow}
                  //   key={i}
                  //   user={user}
                  selectedColumns={selectedColumns}
                />
              );
            })}
            {/* {sortedData?.map((user, i) => {
              return (
                <UsersTableRow
                  key={i}
                  user={user}
                  selectedColumns={selectedColumns}
                />
              );
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
