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
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import NfcFilter from "../filters/NfcFilter";
import { IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
// import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
// import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { tableStyles } from "@/styles/table_styles";
import ItemsTableRow from "../table_rows/ItemsTableRow";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import CommuteIcon from "@mui/icons-material/Commute";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import { getSuccess } from "@/redux/slices/atinaSlice";
import useSortColumn from "@/hooks/useSortColumn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ItemsModal from "../modals/ItemsModal";
import LoadingIcon from "../LoadingIcon";

const tableColumns = [
  "typ",
  "artikelnummer",
  "straße",
  "hausnummer",
  "plz",
  "stadt",
  "land",
  "daten1",
  "daten2",
  "daten3",
  "daten4",
  "daten5",
  "daten6",
  "daten7",
  "daten8",
  "daten9",
  "daten10",
  "erstellt am",
];
const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const ItemsTable = ({ data }) => {
  const { atinaItems } = useSelector((state) => state.atina);

  const { getAtinaItemsData } = useAtinaCalls();

  const dispatch = useDispatch();

  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(data);
  const [restart, setRestart] = useState(false);
  const [itemType, setItemType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = data?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===
  // ===Table sort  START===

  const columnObj = {
    ItemType: 1,
    ItemNumber: 1,
    Street: 1,
    Streetnumber: 1,
    Zip: 1,
    City: 1,
    Country: 1,
    Data1: 1,
    Data2: 1,
    Data3: 1,
    Data4: 1,
    Data5: 1,
    Data6: 1,
    Data7: 1,
    Data8: 1,
    Data9: 1,
    Data10: 1,
    CreatedDate: 1,
  };
  const { sortedData, handleSort, columns } = useSortColumn(
    shownData,
    columnObj
  );
  // ===Table sort  END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});

  const handleFilter = () => {};

  const handleReset = () => {
    setFilterVal({});
    handlePagination();
  };
  /* const handleSort = () => {
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
  }; */
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1500px)");

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  useEffect(() => {
    setShownData(atinaItems);
    setLoading(false);
  }, [atinaItems]);

  useEffect(() => {
    handlePagination();
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
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          setOpenItemsModal={setOpenItemsModal}
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
        <NfcFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box sx={tableStyles.helpersWrapper}>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Typography
              // onClick={() => setItemType(1)}
              onClick={() => {
                setLoading(true);
                getAtinaItemsData(1);
                setShownData(atinaItems);
              }}
              sx={{
                padding: "7px",
                backgroundColor: "#e10000",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1rem",
                fontSize: "0.7rem",
              }}
            >
              Auftrag
            </Typography>

            <Typography
              // onClick={() => setItemType(2)}
              onClick={() => {
                setLoading(true);
                getAtinaItemsData(2);
                setShownData(atinaItems);
              }}
              sx={{
                padding: "7px",
                backgroundColor: "#e10000",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1rem",
                fontSize: "0.7rem",
              }}
            >
              Zähler
            </Typography>

            <Typography
              onClick={() => {
                setLoading(true);
                getAtinaItemsData(3);
                setShownData(atinaItems);
              }}
              sx={{
                padding: "7px",
                backgroundColor: "#e10000",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1rem",
                fontSize: "0.7rem",
              }}
            >
              KFZ
            </Typography>
            {loading && <LoadingIcon />}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Pagination
              data={data}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              handlePagination={handlePagination}
              setRestart={setRestart}
            />
            <DownloadCSV rawData={shownData} />
            <IconButton onClick={() => setOpenItemsModal(!openItemsModal)}>
              <AddCircleIcon
                sx={{
                  borderRadius: "10px",
                  color: "green",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ borderRight: "1px solid #ddd", textAlign: "center" }}
              >
                #
              </TableCell>
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
                  onClick={() => handleSort("ItemType")}
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
                    {columns.ItemType === 1 && <ArrowDownwardIcon />}
                    {columns.ItemType !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("artikelnummer") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("ItemNumber")}
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
                    {columns.ItemNumber === 1 && <ArrowDownwardIcon />}
                    {columns.ItemNumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("straße") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("Street")}
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
                    {columns.Street === 1 && <ArrowDownwardIcon />}
                    {columns.Street !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("hausnummer") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("Streetnumber")}
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
                    {columns.Streetnumber === 1 && <ArrowDownwardIcon />}
                    {columns.Streetnumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("plz") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("Zip")}
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
                    {columns.Zip === 1 && <ArrowDownwardIcon />}
                    {columns.Zip !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("stadt") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("City")}
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
                    {columns.City === 1 && <ArrowDownwardIcon />}
                    {columns.City !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("land") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>land </Box>
                    {columns.Country === 1 && <ArrowDownwardIcon />}
                    {columns.Country !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten1") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten1 </Box>
                    {columns.Data1 === 1 && <ArrowDownwardIcon />}
                    {columns.Data1 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten2") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}> daten2 </Box>
                    {columns.Data2 === 1 && <ArrowDownwardIcon />}
                    {columns.Data2 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten3") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten3 </Box>
                    {columns.Data3 === 1 && <ArrowDownwardIcon />}
                    {columns.Data3 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten4") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}> daten4 </Box>
                    {columns.Data4 === 1 && <ArrowDownwardIcon />}
                    {columns.Data4 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten5") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten5 </Box>
                    {columns.Data5 === 1 && <ArrowDownwardIcon />}
                    {columns.Data5 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten6") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten6 </Box>
                    {columns.Data6 === 1 && <ArrowDownwardIcon />}
                    {columns.Data6 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten7") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten7 </Box>
                    {columns.Data7 === 1 && <ArrowDownwardIcon />}
                    {columns.Data7 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten8") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten8 </Box>
                    {columns.Data8 === 1 && <ArrowDownwardIcon />}
                    {columns.Data8 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten9") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten9 </Box>
                    {columns.Data9 === 1 && <ArrowDownwardIcon />}
                    {columns.Data9 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten10") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten10 </Box>
                    {columns.Data10 === 1 && <ArrowDownwardIcon />}
                    {columns.Data10 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("erstellt am") && (
                <TableCell
                  onClick={() => handleSort("CreatedDate")}
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
                  {columns.CreatedDate === 1 && <ArrowDownwardIcon />}
                  {columns.CreatedDate !== 1 && <ArrowUpwardIcon />}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((item, i) => {
              return (
                <ItemsTableRow
                  key={i}
                  item={item}
                  selectedColumns={selectedColumns}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemsTable;

{
  /* <Tooltip title={"Zähler"} placement="top" arrow>
              <SpeedIcon
                sx={{
                  padding: "7px",
                  backgroundColor: "#e10000",
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "1rem",
                }}
                fontSize="large"
                color="inherit"
                onClick={() => setItemType(2)}
              />
            </Tooltip> */
}
