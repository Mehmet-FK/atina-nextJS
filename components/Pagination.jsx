import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";

const Pagination = ({
  data,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageOptions,
  state,
  setPageSize,
  gotoPage,
}) => {
  const handleChange = (event) => {
    setPageSize(Number(event.target.value));
  };
  const { pageIndex, pageSize } = state;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",

        columnGap: "15px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <span style={{ fontSize: "0.8rem" }}>Anzahl Zeilen</span>
        <FormControl variant="standard">
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageSize}
            onChange={handleChange}
          >
            <MenuItem defaultChecked value={10}>
              10
            </MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={250}>250</MenuItem>
          </Select>
        </FormControl>
      </div>
      <span style={{ fontSize: "0.8rem" }}>
        {pageIndex + 1} von {pageOptions.length}
      </span>
      <div>
        <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
        >
          <LastPageIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;
