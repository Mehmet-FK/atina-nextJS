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
import { useCallback, useEffect, useState } from "react";
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
import useSortColumn from "@/hooks/useSortColumn";
import { getSession, useSession } from "next-auth/react";
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

const NfcTable = ({ data }) => {
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  // console.log(data.map((x) => x.item));

  // ===pagination states START===
  const [allData, setAllData] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(data);
  const session = useSession();

  const handlePagination = useCallback(() => {
    let currentPage = rowsPerPage * page;
    const newArray = allData?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  }, [page, rowsPerPage]);
  // ===pagination states END===

  // ===Table sort  START===

  const columnObj = {
    itemType: 1,
    itemNumber: 1,
    street: 1,
    streetnumber: 1,
    zip: 1,
    city: 1,
    country: 1,
    data1: 1,
    data2: 1,
    data3: 1,
    data4: 1,
    data5: 1,
    data6: 1,
    data7: 1,
    data8: 1,
    data9: 1,
    data10: 1,
    createdDate: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    shownData,
    columnObj
  );

  // ===Table sort  END===

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

  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");
  useEffect(() => {
    if (session.status === "loading") {
      setLoading(true);
    }
  }, [session]);

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
            data={allData}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handlePagination={handlePagination}
          />
          <DownloadCSV rawData={shownData} />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {selectedColumns.includes("typ") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("itemType")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>typ </Box>
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>artikelnummer </Box>
                    {columns.itemNumber === 1 && <ArrowDownwardIcon />}
                    {columns.itemNumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("straße") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>straße </Box>
                    {columns.street === 1 && <ArrowDownwardIcon />}
                    {columns.street !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("hausnummer") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>hausnummer </Box>
                    {columns.streetnumber === 1 && <ArrowDownwardIcon />}
                    {columns.streetnumber !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("plz") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>plz </Box>
                    {columns.zip === 1 && <ArrowDownwardIcon />}
                    {columns.zip !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("stadt") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>stadt </Box>
                    {columns.city === 1 && <ArrowDownwardIcon />}
                    {columns.city !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("land") && (
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
                      alignItems: "center",
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten 1 </Box>
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten2 </Box>
                    {columns.data2 === 1 && <ArrowDownwardIcon />}
                    {columns.data2 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten3") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten3 </Box>
                    {columns.data3 === 1 && <ArrowDownwardIcon />}
                    {columns.data3 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten4") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten4 </Box>
                    {columns.data4 === 1 && <ArrowDownwardIcon />}
                    {columns.data4 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten5") && (
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
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten5 </Box>
                    {columns.data5 === 1 && <ArrowDownwardIcon />}
                    {columns.data5 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten6") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data6")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten6 </Box>
                    {columns.data6 === 1 && <ArrowDownwardIcon />}
                    {columns.data6 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten7") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data7")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten7 </Box>
                    {columns.data7 === 1 && <ArrowDownwardIcon />}
                    {columns.data7 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten8") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data8")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten8</Box>
                    {columns.data8 === 1 && <ArrowDownwardIcon />}
                    {columns.data8 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten9") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data9")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten9</Box>
                    {columns.data9 === 1 && <ArrowDownwardIcon />}
                    {columns.data9 !== 1 && <ArrowUpwardIcon />}
                  </Box>
                </TableCell>
              )}
              {selectedColumns.includes("daten10") && (
                <TableCell
                  sx={tableStyles.th.cell}
                  onClick={() => handleSort("data10")}
                  align="left"
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "#000" }}>daten10</Box>
                    {columns.data10 === 1 && <ArrowDownwardIcon />}
                    {columns.data10 !== 1 && <ArrowUpwardIcon />}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((tag, i) => {
              // const { item } = tag;

              return (
                <NfcTableRow
                  key={i}
                  item={tag}
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
