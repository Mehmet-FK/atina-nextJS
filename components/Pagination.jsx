"use client";

import { IconButton, Tooltip } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useRouter } from "next/router";
import { memo } from "react";

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
  console.log("pagi render");
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const router = useRouter();

  return (
    <>
      <TablePagination
        showFirstButton={true}
        showLastButton={true}
        component="div"
        count={data ? data.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Anzahl Zeilen"}
      />
      {/* setRestart((prev) => !prev) */}
      <Tooltip title="Aktualisieren" arrow>
        <IconButton onClick={() => router.reload()}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default memo(Pagination);
