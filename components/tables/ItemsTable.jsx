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
import { IconButton, Tooltip, useMediaQuery } from "@mui/material";
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
import { getSuccess } from "@/redux/slices/atinaSlice";
const tableColumns = [
  "typ",
  "artikelnummer",
  "straße",
  "hausnummer",
  "plz",
  "stadt",
  "land",
  "daten 1",
  "daten 2",
  "daten 3",
  "daten 4",
  "daten 5",
  "daten 6",
  "daten 7",
  "daten 8",
  "daten 9",
  "daten 10",
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
  const [newest, setNewest] = useState(true);

  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = data?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});

  const handleFilter = () => {};

  const handleReset = () => {
    setFilterVal({});
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

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1500px)");

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  useEffect(() => {
    // dispatch(getSuccess({ data, url: "api/AtinaItems/search" }));
    if (itemType) {
      getAtinaItemsData(itemType);
      setShownData(atinaItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart, itemType]);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, data]);
  return (
    <>
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
            <Tooltip title={"Auftrag"} placement="top" arrow>
              <RoomServiceIcon
                sx={{
                  padding: "7px",
                  backgroundColor: "#e10000",
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "1rem",
                }}
                fontSize="large"
                color="inherit"
                onClick={() => setItemType(1)}
              />
            </Tooltip>
            <Tooltip title={"Zähler"} placement="top" arrow>
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
            </Tooltip>
            <Tooltip title={"KFZ"} placement="top" arrow>
              <CommuteIcon
                sx={{
                  padding: "7px",
                  backgroundColor: "#e10000",
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "1rem",
                }}
                fontSize="large"
                color="inherit"
                onClick={() => setItemType(3)}
              />
            </Tooltip>
          </Box>
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
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {selectedColumns.includes("typ") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  Typ
                </TableCell>
              )}
              {selectedColumns.includes("artikelnummer") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  artikelnummer
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
              {selectedColumns.includes("daten 1") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 1
                </TableCell>
              )}
              {selectedColumns.includes("daten 2") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 2
                </TableCell>
              )}
              {selectedColumns.includes("daten 3") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 3
                </TableCell>
              )}
              {selectedColumns.includes("daten 4") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 4
                </TableCell>
              )}
              {selectedColumns.includes("daten 5") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 5
                </TableCell>
              )}
              {selectedColumns.includes("daten 6") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 6
                </TableCell>
              )}
              {selectedColumns.includes("daten 7") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 7
                </TableCell>
              )}
              {selectedColumns.includes("daten 8") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 8
                </TableCell>
              )}
              {selectedColumns.includes("daten 9") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 9
                </TableCell>
              )}
              {selectedColumns.includes("daten 10") && (
                <TableCell sx={tableStyles.th.cell} align="left">
                  daten 10
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
            {shownData?.map((item, i) => {
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
