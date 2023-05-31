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
import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import {
  ITEM_TABLE_METER_COLUMNS,
  ITEM_TABLE_ORDER_COLUMNS,
  ITEM_TABLE_VEHICLE_COLUMNS,
} from "./columns";
import styles from "./table_styles.module.css";
import UndoIcon from "@mui/icons-material/Undo";

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
  const [resetResize, setResetResize] = useState(false);

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

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 170,
      maxWidth: 400,
    }),
    []
  );

  const tableColumns = useMemo(() => {
    if (type === "Order") {
      return ITEM_TABLE_ORDER_COLUMNS;
    } else if (type === "Meter") {
      return ITEM_TABLE_METER_COLUMNS;
    } else if (type === "Vehicle") {
      return ITEM_TABLE_VEHICLE_COLUMNS;
    }
  }, [type]);
  // console.log(type);
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
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  //? Table Utilities END

  // ===Table sort  END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});

  const handleFilter = () => {
    setLoading(true);
    searchItems({ ...filterVal, type }).then((res) => {
      setAllData(res.itemArray);
      setIsError(res.error ? true : false);
      setLoading(false);
      console.log(res.error);
    });
  };
  // console.log(shownData);
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
    // setShownData(allData);

    handlePagination();
    setLoading(false);
  }, [allData, page, rowsPerPage]);

  useEffect(() => {
    handlePagination();
    setType("Order");
    getAtinaItemsData("Order").then((response) => {
      setAllData(response.res);
      // setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // console.log(allColumns);
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
          maxHeight: "82vh",
          overflow: "auto",
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
            <IconButton
              onClick={() => {
                resetResizing();
                setResetResize(!resetResize);
              }}
            >
              <UndoIcon />
            </IconButton>
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
          className="table"
          {...getTableProps()}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          size="small"
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
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      color: "#888",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      borderRight: "1px solid #ddd",
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
                    <div
                      {...column.getResizerProps()}
                      onClick={() => setResetResize(!resetResize)}
                      className={`${styles.resizer} ${
                        column.isResizing ? styles.isResizing : null
                      }`}
                    />
                  </TableCell>
                ))}
                <TableCell
                  className={styles.th}
                  sx={{ borderRight: "1px solid #eee", minWidth: "70px" }}
                ></TableCell>
                <TableCell
                  className={styles.th}
                  sx={{ borderRight: "1px solid #eee", minWidth: "70px" }}
                ></TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows?.map((row, i) => {
              prepareRow(row);
              return (
                <ItemsTableRow
                  key={i}
                  row={row}
                  prepareRow={prepareRow}
                  resetResize={resetResize}
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
