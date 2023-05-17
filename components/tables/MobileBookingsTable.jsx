"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import BookingsFilter from "../filters/BookingsFilter";
import CustomTableRow from "../table_rows/BookingsTableRow";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";

// import useAtinaCalls from "@/hooks/useAtinaCalls";
import { tableStyles } from "@/styles/table_styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { searchBookings } from "@/helpers/searchFunctions";
// import axios from "axios";

const tableColumns = [
  "datum",
  "uhrzeit",
  "buchungstyp",
  "straße",
  "hausnummer",
  "plz",
  "stadt",
  "land",
  "erstellt am",
];

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const MobileBookings = ({ data }) => {
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [allData, setAllData] = useState(data);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState();
  const [restart, setRestart] = useState(false);
  const [newest, setNewest] = useState(true);

  const handlePagination = useCallback(() => {
    let currentPage = rowsPerPage * page;
    const newArray = allData?.slice(currentPage, currentPage + rowsPerPage);

    return setShownData(newArray);
  }, [page, rowsPerPage, allData]);
  // ===pagination states END===

  // ===Table Filter START===

  const bookingsFilterParams = {
    id: null,
    bookingType: null,
    street: null,
    streetnumber: null,
    zip: null,
    city: null,
    country: null,
    nfcTagID: null,
    nfcTagInfo: null,
    userID: null,
    itemID: null,
    dateFrom: null,
    dateTo: null,
    createdFrom: "",
    createdTo: null,
  };

  const [filterVal, setFilterVal] = useState(bookingsFilterParams);

  const handleFilter = () => {
    searchBookings(filterVal).then((res) => setShownData(res));
  };

  const handleReset = () => {
    setFilterVal(bookingsFilterParams);
    handlePagination();
  };

  const handleSort = () => {
    const arr = shownData.map((item) => ({
      ...item,
      createdDate: new Date(item.createdDate),
    }));

    if (newest) {
      let temp = arr.sort((a, b) => b.createdDate - a.createdDate);
      setNewest(!newest);
      setShownData(temp);
    } else {
      let temp = arr.sort((a, b) => a.createdDate - b.createdDate);
      setNewest(!newest);
      setShownData(temp);
    }
  };
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, allData]);
  // console.log(data[0]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {contextMenu.show && (
        <ContextMenu
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
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
          padding: "1rem 10px",
          position: "relative",
        }}
      >
        <BookingsFilter
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
            setRestart={setRestart}
          />

          <DownloadCSV rawData={shownData} />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {selectedColumns.includes("datum") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  datum
                </TableCell>
              )}
              {selectedColumns.includes("uhrzeit") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  uhrzeit
                </TableCell>
              )}
              {selectedColumns.includes("buchungstyp") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  buchungstyp
                </TableCell>
              )}
              {selectedColumns.includes("straße") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  straße
                </TableCell>
              )}
              {selectedColumns.includes("hausnummer") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  hausnummer
                </TableCell>
              )}
              {selectedColumns.includes("plz") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  plz
                </TableCell>
              )}
              {selectedColumns.includes("stadt") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  stadt
                </TableCell>
              )}
              {selectedColumns.includes("land") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  land
                </TableCell>
              )}
              {selectedColumns.includes("erstellt am") && (
                <TableCell
                  onClick={handleSort}
                  sx={{
                    ...tableStyles.th.cell,
                    display: "flex",
                    alignItems: "center",
                    columnGap: "5px",
                    cursor: "pointer",
                    color: "#888",
                  }}
                  align="left"
                >
                  <Box color={"#000"}>erstellt am</Box>
                  {newest && <ArrowDownwardIcon />}
                  {!newest && <ArrowUpwardIcon />}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {shownData?.map((booking) => {
              return (
                <CustomTableRow
                  key={booking?.id}
                  selectedColumns={selectedColumns}
                  booking={booking}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MobileBookings;
