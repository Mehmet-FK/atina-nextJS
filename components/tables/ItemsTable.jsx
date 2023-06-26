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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ItemsModal from "../modals/ItemsModal";
import LoadingIcon from "../LoadingIcon";
import ItemsFilter from "../filters/ItemsFilter";
import { searchItems } from "@/helpers/searchFunctions";
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import useColumns from "../../hooks/useColumns";
import styles from "./table_styles.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import Tooltip from "@mui/material/Tooltip";
import { useSession } from "next-auth/react";
import ErrorModal from "../modals/ErrorModal";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const ItemsTable = ({ atinaItems }) => {
  const tableRef = useRef(null);
  const { data } = useSession();
  const {
    ITEM_TABLE_ORDER_COLUMNS,
    ITEM_TABLE_METER_COLUMNS,
    ITEM_TABLE_VEHICLE_COLUMNS,
  } = useColumns();

  const { error } = useSelector((state) => state.atina);
  const { getAtinaItemsData } = useAtinaCalls();

  const [allData, setAllData] = useState(atinaItems);
  const [isError, setIsError] = useState(error ? error : false);
  const [loading, setLoading] = useState(false);
  const [shownData, setShownData] = useState(allData);
  const [type, setType] = useState("Order");
  const [resetResize, setResetResize] = useState(false);
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [isAdmin, setIsAdmin] = useState(false);

  //#region ===pagination states START===

  const [openItemsModal, setOpenItemsModal] = useState(false);

  //#endregion ===pagination states END===

  //#region Table Utilities START

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
  //#endregion Table Utilities END

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

  const handleReset = () => {
    setFilterVal({});
  };
  // ===Table Filter END===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1500px)");

  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);

  useEffect(() => {
    setShownData(allData);

    setLoading(false);
  }, [allData]);

  useEffect(() => {
    setType("Order");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, [data]);

  return (
    <>
      <ErrorModal error={isError} />
      <ItemsModal
        setOpenItemsModal={setOpenItemsModal}
        openItemsModal={openItemsModal}
        type={type}
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
        <ItemsFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
          type={type}
        />
        <Box sx={tableStyles.helpersWrapper}>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Typography
              onClick={() => {
                setLoading(true);
                setType("Order");
                getAtinaItemsData("Order").then((response) => {
                  response.error
                    ? setIsError(response.error)
                    : setAllData(response.res);
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
                  response.error
                    ? setIsError(response.error)
                    : setAllData(response.res);
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
                  response.error
                    ? setIsError(response.error)
                    : setAllData(response.res);

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

            <DownloadCSV rawData={shownData} fileName={"items"} type={type} />

            {isAdmin && (
              <Tooltip title="Neuen Datensatz anlegen" arrow>
                <IconButton onClick={() => setOpenItemsModal(true)}>
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
                    {...column.getHeaderProps()}
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
                      {...column.getSortByToggleProps()}
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
            {page?.map((row, i) => {
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
