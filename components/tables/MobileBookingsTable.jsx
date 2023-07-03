"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import BookingsFilter from "../filters/BookingsFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import Tooltip from "@mui/material/Tooltip";
import { tableStyles } from "@/styles/table_styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { searchBookings } from "@/helpers/searchFunctions";
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import BookingsTableRow from "../table_rows/BookingsTableRow";
import styles from "./table_styles.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookingsModal from "../modals/BookingsModal";
import { useSession } from "next-auth/react";
import { AtinaCalls } from "@/helpers/apiFunctions";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { useSelector } from "react-redux";
import useColumns from "@/hooks/useColumns";
import Pagination from "../Pagination";

// import axios from "axios";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const MobileBookings = ({ data: dataFromServer = [], error }) => {
  const { getBookingTypes } = useAtinaCalls();
  const { bookingTypes } = useSelector((state) => state.atina);
  const { BUCHUNGEN_TABLE_COLUMNS } = useColumns();
  const tableRef = useRef(null);

  //checks if the user is admin
  const { data } = useSession();

  const [isAdmin, setIsAdmin] = useState(false);
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [allData, setAllData] = useState(dataFromServer);
  const [resetResize, setResetResize] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);

  //* ===Table Filter START===
  //#region
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
    searchBookings(filterVal).then((res) => setAllData(res));
  };

  const handleReset = () => {
    setFilterVal(bookingsFilterParams);
  };
  //#endregion
  // ===Table Filter START===

  //? Table Utilities START
  //#region
  const defaultColumn = useMemo(
    () => ({
      minWidth: 75,
      width: 135,
      maxWidth: 400,
    }),
    []
  );

  const tableColumns = useMemo(() => BUCHUNGEN_TABLE_COLUMNS, [bookingTypes]);
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
    useBlockLayout,
    useResizeColumns
  );
  //#endregion
  //? Table Utilities END

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, [data]);

  useEffect(() => {
    getBookingTypes();
    console.log("test");
  }, []);
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
            ...tableStyles.tableContainer,
            maxWidth: xxl ? "90vw" : { lg: "1250px" },

            maxHeight: "82vh",
            overflow: "auto",
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

            <DownloadCSV rawData={allData} fileName={"mobile_buchungen"} />
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
                  <TableCell sx={{ width: "2.5rem" }} />
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      className={styles.th}
                      {...column.getHeaderProps()}
                      sx={tableStyles.th.cell}
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
