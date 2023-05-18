"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";
import ItemsTableRow from "../table_rows/ItemsTableRow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useSortColumn from "@/hooks/useSortColumn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ItemsModal from "../modals/ItemsModal";
import LoadingIcon from "../LoadingIcon";
import ItemsFilter from "../filters/ItemsFilter";
import { searchItems } from "@/helpers/searchFunctions";
import { getSuccess } from "@/redux/slices/atinaSlice";
import { useSortBy, useTable } from "react-table";
import { ITEM_TABLE_COLUMNS } from "./columns";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const ItemsTable = ({ data }) => {
  const dispatch = useDispatch();
  const { atinaItems } = useSelector((state) => state.atina);
  const { getAtinaItemsData } = useAtinaCalls();
  const [allData, setAllData] = useState(data);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shownData, setShownData] = useState(data ? data : []);
  const [type, setType] = useState("Order");

  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openItemsModal, setOpenItemsModal] = useState(false);
  const handlePagination = useCallback(() => {
    let currentPage = rowsPerPage * page;
    const newArray = allData?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  }, [page, rowsPerPage, atinaItems, allData]);

  // ===pagination states END===
  // ===Table sort  START===

  //? Table Utilities START
  const tableColumns = ITEM_TABLE_COLUMNS;

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
    setLoading(true);
    searchItems(filterVal).then((res) => {
      setShownData(res.itemArray);
      setIsError(res.error ? true : false);
      setLoading(false);
      console.log(res.error);
    });
  };

  const handleReset = () => {
    setFilterVal({});
    // handlePagination();
  };
  // ===Table Filter END===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1500px)");

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  useEffect(() => {
    dispatch(getSuccess({ data, url: "items" }));
  }, []);

  useEffect(() => {
    setShownData(allData);

    handlePagination();
    setLoading(false);
  }, [allData]);

  useEffect(() => {
    handlePagination();
    setType("Order");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, data]);

  return (
    <>
      <ItemsModal
        setOpenItemsModal={setOpenItemsModal}
        openItemsModal={openItemsModal}
      />
      {contextMenu.show && (
        <ContextMenu
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          tableColumns={tableColumns}
          allColumns={allColumns}
          setOpenItemsModal={setOpenItemsModal}
          openItemsModal={openItemsModal}
        />
      )}
      <TableContainer
        component={Paper}
        onContextMenu={handleRightClick}
        sx={{
          ...tableStyles.tableContainer,
          maxWidth: xxl ? "90vw" : { lg: "1250px" },
        }}
      >
        <ItemsFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box sx={tableStyles.helpersWrapper}>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Typography
              onClick={() => {
                setLoading(true);
                setType("Order");
                getAtinaItemsData("Order").then((response) => {
                  setAllData(response.res);
                  // setLoading(false);
                });
              }}
              sx={{
                padding: "7px",
                backgroundColor: "#e10000",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1rem",
                fontSize: "0.7rem",
                outline: type === "Order" && "1px solid #aaa",
                outlineOffset: "2px",
                minWidth: "3rem",
              }}
            >
              Auftrag
            </Typography>

            <Typography
              onClick={() => {
                setLoading(true);
                setType("Meter");
                getAtinaItemsData("Meter").then((response) => {
                  setAllData(response.res);
                  // setLoading(false);
                });
              }}
              sx={{
                padding: "7px",
                backgroundColor: "#e10000",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1rem",
                fontSize: "0.7rem",
                outline: type === "Meter" && "1px solid #aaa",
                outlineOffset: "2px",
                textAlign: "center",
              }}
            >
              Zähler
            </Typography>

            <Typography
              onClick={() => {
                setLoading(true);
                setType("Vehicle");
                getAtinaItemsData("Vehicle").then((response) => {
                  setAllData(response.res);
                  // setLoading(false);
                });
              }}
              sx={{
                padding: "7px",
                backgroundColor: "#e10000",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1rem",
                fontSize: "0.7rem",
                outline: type === "Vehicle" && "1px solid #aaa",
                outlineOffset: "2px",
                minWidth: "3rem",
                textAlign: "center",
              }}
            >
              KFZ
            </Typography>
            {loading && <LoadingIcon />}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Pagination
              data={allData}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              handlePagination={handlePagination}
              // setRestart={setRestart}
            />
            <DownloadCSV rawData={shownData} />
            <IconButton onClick={() => setOpenItemsModal(true)}>
              <AddCircleIcon
                sx={{
                  borderRadius: "10px",
                  color: "green",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Table
          {...getTableProps()}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      color: "#888",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      borderRight: "1px solid #aaa",
                    }}
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
              </TableRow>
            ))}
            {/* <>
            <TableRow>
              {selectedColumns.includes("typ") && (
                <TableCell
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "600",
                    color: "#888",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    borderRight: "1px solid #aaa",
                  }}
                  onClick={() => handleSort("itemType")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>Typ </Box>
                    {columns.itemType === 1 && <ArrowDownwardIcon />}
                    {columns.itemType !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("artikelnummer") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("itemNumber")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>artikelnummer </Box>
                    {columns.itemNumber === 1 && <ArrowDownwardIcon />}
                    {columns.itemNumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("straße") && type !== "Vehicle" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("street")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>straße </Box>
                    {columns.street === 1 && <ArrowDownwardIcon />}
                    {columns.street !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("hausnummer") && type !== "Vehicle" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("streetnumber")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>hausnummer </Box>
                    {columns.streetnumber === 1 && <ArrowDownwardIcon />}
                    {columns.streetnumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("plz") && type !== "Vehicle" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("zip")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>plz </Box>
                    {columns.zip === 1 && <ArrowDownwardIcon />}
                    {columns.zip !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("stadt") && type !== "Vehicle" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("city")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>stadt </Box>
                    {columns.city === 1 && <ArrowDownwardIcon />}
                    {columns.city !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("land") && type !== "Vehicle" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("country")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>land </Box>
                    {columns.country === 1 && <ArrowDownwardIcon />}
                    {columns.country !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten1") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data1")}
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
                      {type === "Order" && "Mandant"}
                      {type === "Meter" && "Letzte Ablesung am"}
                      {type === "Vehicle" && "Mandant"}
                    </Box>
                    {columns.data1 === 1 && <ArrowDownwardIcon />}
                    {columns.data1 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten2") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data2")}
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
                      {type === "Order" && "Auftragsart"}
                      {type === "Meter" && "Letzte Ablesung"}
                      {type === "Vehicle" && "Standort"}
                    </Box>
                    {columns.data2 === 1 && <ArrowDownwardIcon />}
                    {columns.data2 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten3") && type !== "Meter" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data3")}
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
                      {type === "Order" && "Auftragsbetreff"}
                      {type === "Meter" && "daten3"}
                      {type === "Vehicle" && "Kennzeichen"}
                    </Box>
                    {columns.data3 === 1 && <ArrowDownwardIcon />}
                    {columns.data3 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten4") && type !== "Meter" && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data4")}
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
                      {type === "Order" && "Kundennummer"}
                      {type === "Meter" && "daten4"}
                      {type === "Vehicle" && "Modell"}
                    </Box>
                    {columns.data4 === 1 && <ArrowDownwardIcon />}
                    {columns.data4 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten5") &&
                type !== "Meter" &&
                type !== "Vehicle" && (
                  <TableCell
                    sx={tableStyles.th.cell}
                    onClick={() => handleSort("data5")}
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
                        {type === "Order" && "Kundenname"}
                      </Box>
                      {columns.data5 === 1 && <ArrowDownwardIcon />}
                      {columns.data5 !== 1 && <ArrowUpwardIcon />}
                    </Box>
                  </TableCell>
                )}
              {selectedColumns.includes("erstellt am") && (
                <TableCell
                  onClick={() => handleSort("createdDate")}
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
                  {columns.createdDate === 1 && <ArrowDownwardIcon />}
                  {columns.createdDate !== 1 && <ArrowUpwardIcon />}
                </TableCell>
              )}
              <TableCell
                sx={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                #
              </TableCell>
            </TableRow>
            </> */}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows?.map((row, i) => {
              prepareRow(row);
              return (
                <ItemsTableRow key={i} row={row} prepareRow={prepareRow} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemsTable;
