"use client";

import { IconButton, Tooltip } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Pagination = ({
  data,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  setRestart,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TablePagination
        showFirstButton={true}
        showLastButton={true}
        component="div"
        count={data?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Anzahl Zeilen"}
      />

      <Tooltip title="Aktualisieren" arrow>
        <IconButton onClick={() => setRestart((prev) => !prev)}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Pagination;
