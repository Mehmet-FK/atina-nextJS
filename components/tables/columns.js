import { tableStyles } from "@/styles/table_styles";
import { Avatar } from "@mui/material";
export const USER_TABLE_COLUMNS = [
  {
    accessor: "firstname",
    Header: "vorname",
  },
  {
    accessor: "lastname",
    Header: "nachname",
  },
  {
    accessor: "username",
    Header: "benutzername",
  },
  {
    accessor: "passwordHash",
    Header: "kennwort",
    Cell: () => "*******",
  },
  {
    accessor: "personnelnumber",
    Header: "personalnummer",
  },
  {
    Header: "bild",
    Cell: (row) => (
      <Avatar
        sx={tableStyles.tr.image}
        src={`data:image/png;base64,${row.original?.image}`}
      />
    ),
  },
];

//!Waiting for the new Endpoints
export const ITEM_TABLE_COLUMNS = [
  {
    accessor: "itemType",
    Header: "typ",
  },
  {
    accessor: "itemNumber",
    Header: "artikelnummer",
  },
  {
    accessor: "street",
    Header: "straße",
  },
  {
    accessor: "streetnumber",
    Header: "hausnummer",
  },
  {
    accessor: "personnelnumber",
    Header: "personalnummer",
  },
  {
    accessor: "zip",
    Header: "plz",
  },
  {
    accessor: "city",
    Header: "stadt",
  },
  {
    accessor: "country",
    Header: "land",
  },
  {
    accessor: "data1",
    Header: "daten1",
  },
  {
    accessor: "data2",
    Header: "daten2",
  },
  {
    accessor: "data3",
    Header: "daten3",
  },
  {
    accessor: "data4",
    Header: "daten4",
  },
  {
    accessor: "data5",
    Header: "daten5",
  },
];

export const NFC_TABLE_COLUMNS = [
  {
    accessor: "itemType",
    Header: "typ",
    Cell: ({ value }) => {
      if (value === "Order") {
        return "Auftrag";
      } else if (value === "Meter") {
        return "Zähler";
      } else if (value === "Car") {
        return "KFZ";
      }
    },
  },
  {
    accessor: "itemNumber",
    Header: "artikelnummer",
  },
  {
    accessor: "street",
    Header: "straße",
  },
  {
    accessor: "streetnumber",
    Header: "hausnummer",
  },
  {
    accessor: "zip",
    Header: "plz",
  },
  {
    accessor: "city",
    Header: "stadt",
  },
  {
    accessor: "country",
    Header: "land",
  },
  {
    accessor: "data1",
    Header: "daten1",
  },
  {
    accessor: "data2",
    Header: "daten2",
  },
  {
    accessor: "data3",
    Header: "daten3",
  },
  {
    accessor: "data4",
    Header: "daten4",
  },
  {
    accessor: "data5",
    Header: "daten5",
  },
  {
    accessor: "data6",
    Header: "daten6",
  },
  {
    accessor: "data7",
    Header: "daten7",
  },
  {
    accessor: "data8",
    Header: "daten8",
  },
  {
    accessor: "data9",
    Header: "daten9",
  },
  {
    accessor: "data10",
    Header: "daten10",
  },
  {
    accessor: "createdDate",
    Header: "erstellt am",
    Cell: ({ value }) => new Date(value).toLocaleDateString("de"),
  },
];

export const BUCHUNGEN_TABLE_COLUMNS = [
  {
    accessor: "date",
    Header: "datum",
  },
  {
    accessor: "time",
    Header: "uhrzeit",
  },
  {
    accessor: "bookingType",
    Header: "buchungstyp",
  },
  {
    accessor: "street",
    Header: "straße",
  },
  {
    accessor: "streetnumber",
    Header: "hausnummer",
  },
  {
    accessor: "zip",
    Header: "plz",
  },
  {
    accessor: "city",
    Header: "stadt",
  },
  {
    accessor: "country",
    Header: "land",
  },
  {
    accessor: "createdDate",
    Header: "erstellt am",
  },
];
