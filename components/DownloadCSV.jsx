"use client";

import React, { useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const DownloadCSV = ({ rawData, fileName }) => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();
  const day = new Date().getDay().toString();
  const date = `${year}${month.length === 1 ? "0" + month : month}${
    day.length === 1 ? "0" + day : day
  }`;
  const [url, setUrl] = useState("");

  const editData = (arr) => {
    let newArr = [...arr];
    newArr.forEach((element, i) => {
      let el = element.toLowerCase();
      if (el === "id" || el === "externaluserid" || el === "isadministrator") {
        newArr = newArr.splice(i, 1);
        // console.log(el);
      }
    });
    console.log(newArr);
  };

  const convertJsonToCsv = () => {
    const h = Object.keys(rawData[0]).join(";").toUpperCase();
    // const h = Object.keys(rawData[0]);
    console.log("first", h);
    editData(h);
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
            download={`${date + "_" + fileName}.csv`}
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
