"use client";

import React, { useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const DownloadCSV = ({ rawData }) => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const convertJsonToCsv = () => {
    const h = Object.keys(rawData[0]).join(";").toUpperCase();
    const main = rawData.map((item) => Object.values(item).join(";"));
    const csv = [h, ...main].join("\n");
    const blob = new Blob([csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };
  return (
    <>
      {rawData && (
        <Tooltip
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => rawData && convertJsonToCsv()}
        >
          <a
            href={url}
            download={`${router.pathname}.csv`}
            style={{
              color: "#888",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton>
              <DownloadForOfflineIcon fontSize="medium" />
            </IconButton>
          </a>
        </Tooltip>
      )}
    </>
  );
};

export default DownloadCSV;
