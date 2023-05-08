"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
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

const NfcTable = ({ data }) => {
  const [contextMenu, setContextMenu] = useState(initalContextMenu);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(data);
  const [restart, setRestart] = useState(false);
  const [newest, setNewest] = useState(true);

  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = data?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const initialFilterparams = {
    id: null,
    tagID: null,
    desc: null,
    type: null,
    nfcData: null,
    itemID: null,
    createdTo: null,
    createdFrom: "",
  };
  const [filterVal, setFilterVal] = useState(initialFilterparams);

  const handleFilter = () => {
    searchNfcTag(filterVal).then((res) => setShownData(res));
  };
  const handleReset = () => {
    setFilterVal(initialFilterparams);
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
    // getdataData();
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
          maxWidth: xxl ? "90vw" : { lg: "auto" },
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
                  typ
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
            {shownData?.map((tag, i) => {
              const { item } = tag;
              return (
                <NfcTableRow
                  key={i}
                  item={item}
                  tag={tag}
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

export default NfcTable;
