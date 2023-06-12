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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import BookingsFilter from "../filters/BookingsFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import Tooltip from "@mui/material/Tooltip";
// import useAtinaCalls from "@/hooks/useAtinaCalls";
import { tableStyles } from "@/styles/table_styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { searchBookings } from "@/helpers/searchFunctions";
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import { BUCHUNGEN_TABLE_COLUMNS } from "./columns";
import BookingsTableRow from "../table_rows/BookingsTableRow";
import styles from "./table_styles.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookingsModal from "../modals/BookingsModal";
import { useSession } from "next-auth/react";
import { AtinaCalls } from "@/helpers/apiFunctions";

// import axios from "axios";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const MobileBookings = ({ data: dataFromServer = [], error }) => {
  const tableRef = useRef(null);
  const { data } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [allData, setAllData] = useState(dataFromServer);
  const [resetResize, setResetResize] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [buchungTypes, setBuchungTypes] = useState([""]);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(allData);

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
    username: null,
    dateFrom: null,
    dateTo: null,
    timeFrom: null,
    timeTo: null,
  };

  const [filterVal, setFilterVal] = useState(bookingsFilterParams);

  const handleFilter = () => {
    console.log(filterVal);
    searchBookings(filterVal).then((res) => setAllData(res));
  };

  const handleReset = () => {
    setFilterVal(bookingsFilterParams);
    handlePagination();
  };

  //? Table Utilities START
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 135,
      maxWidth: 400,
    }),
    []
  );

  const tableColumns = useMemo(() => BUCHUNGEN_TABLE_COLUMNS, []);
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

  // ===Table Filter END===

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");
  useEffect(() => {
    const atinaCalls = new AtinaCalls();
    atinaCalls
      .fetchData("api/AtinaMasterData/GetBookingTypes")
      .then((res) => setBuchungTypes(res.res));
  }, []);

  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, []);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, allData]);
  return (
    <>
      <BookingsModal
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          ref={tableRef}
          component={Paper}
          onContextMenu={handleRightClick}
          sx={{
            maxWidth: xxl ? "90vw" : { lg: "1250px" },
            margin: "auto",
            padding: "1rem 10px",
            position: "relative",
            maxHeight: "82vh",
            overflow: "auto",
          }}
        >
          <BookingsFilter
            handleReset={handleReset}
            handleFilter={handleFilter}
            filterVal={filterVal}
            setFilterVal={setFilterVal}
            buchungTypes={buchungTypes}
          />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Pagination
              data={allData}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              handlePagination={handlePagination}
              // setRestart={setRestart}
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
            <DownloadCSV rawData={shownData} fileName={"mobile_buchungen"} />
            {isAdmin && (
              <Tooltip title="Neuen Datensatz anlegen" arrow>
                <IconButton onClick={() => setOpenBookingModal(true)}>
                  <AddCircleIcon
                    sx={{
                      borderRadius: "10px",
                      color: "green",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Table
            {...getTableProps()}
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
              {rows?.map((row, i) => {
                prepareRow(row);
                return (
                  <BookingsTableRow
                    resetResize={resetResize}
                    key={i}
                    row={row}
                    prepareRow={prepareRow}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MobileBookings;
