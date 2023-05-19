"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "../Pagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";
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
import { getSession, useSession } from "next-auth/react";
import { NFC_TABLE_COLUMNS } from "./columns";
import { useSortBy, useTable } from "react-table";

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

  //? Table Utilities START

  const tableColumns = useMemo(() => NFC_TABLE_COLUMNS, []);
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

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");
  /* useEffect(() => {
    if (session.status === "loading") {
      setLoading(true);
    }
  }, [session]); */

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
          tableColumns={tableColumns}
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
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows?.map((row, i) => {
              prepareRow(row);

              return (
                <NfcTableRow
                  key={i}
                  // item={tag}
                  // tag={tag}
                  row={row}
                  prepareRow={prepareRow}
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
