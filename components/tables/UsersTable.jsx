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
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import UsersTableRow from "../table_rows/UsersTableRow";
import UsersFilter from "../filters/UsersFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const tableColumns = [
  "vorname",
  "nachname",
  "benutzername",
  "kennwort",
  "personalnummer",
  "bild",
];

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

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = () => {
    //TODO: Search Function
    const filteredData = "";
    setShownData(filteredData);
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

  const { getUsersData } = useAtinaCalls();

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
          sx={{ minWidth: 650, position: "relative" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {selectedColumns.includes("vorname") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  vorname
                </TableCell>
              )}
              {selectedColumns.includes("nachname") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  nachname
                </TableCell>
              )}
              {selectedColumns.includes("benutzername") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  benutzername
                </TableCell>
              )}
              {selectedColumns.includes("kennwort") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  kennwort
                </TableCell>
              )}
              {selectedColumns.includes("personalnummer") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  personalnummer
                </TableCell>
              )}
              {selectedColumns.includes("bild") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  bild
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {shownData?.map((user, i) => {
              return (
                <UsersTableRow
                  key={i}
                  user={user}
                  selectedColumns={selectedColumns}
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
