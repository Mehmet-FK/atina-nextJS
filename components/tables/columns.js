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
        sx={{ ...tableStyles.tr.image, margin: "auto" }}
        src={`data:image/png;base64,${row.original?.image}`}
      />
    ),
  },
];

//!Waiting for the new Endpoints
export const ITEM_TABLE_ORDER_COLUMNS = [
  {
    accessor: "itemType",
    Header: "typ",
    Cell: "Auftrag",
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
    Header: "Hausnummer",
  },
  // {
  //   accessor: "personnelnumber",
  //   Header: "personalnummer",
  // },
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
    Header: "Mandant",
  },
  {
    accessor: "data2",
    Header: "Auftragsart",
  },
  {
    accessor: "data3",
    Header: "Auftragsbetreff",
  },
  {
    accessor: "data4",
    Header: "Kundennummer",
  },
  {
    accessor: "data5",
    Header: "Kundenname",
  },
];
export const ITEM_TABLE_METER_COLUMNS = [
  {
    accessor: "itemType",
    Header: "typ",
    Cell: "Zähler",
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
    Header: "Hausnummer",
  },
  // {
  //   accessor: "personnelnumber",
  //   Header: "personalnummer",
  // },
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
    Header: "Letzte Ablesung am",
  },
  {
    accessor: "data2",
    Header: "Letzte Ablesung",
  },
];
export const ITEM_TABLE_VEHICLE_COLUMNS = [
  {
    accessor: "itemType",
    Header: "typ",
    Cell: "KFZ",
  },
  {
    accessor: "itemNumber",
    Header: "artikelnummer",
  },
  {
    accessor: "data1",
    Header: "Mandant",
  },
  {
    accessor: "data2",
    Header: "Standort",
  },
  {
    accessor: "data3",
    Header: "Kennzeichen",
  },
  {
    accessor: "data4",
    Header: "Modell",
  },
  // {
  //   accessor: "data5",
  //   Header: "#",
  // },
  // {
  //   accessor: "data6",
  //   Header: "#",
  // },
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
    accessor: "Username",
    Header: "Benutzername",
  },
  {
    accessor: "BookingType",
    Header: "buchungstyp",
  },
  {
    accessor: "Date",
    Header: "datum",
    Cell: ({ value }) => new Date(value).toLocaleDateString("de"),
  },
  {
    accessor: "Time",
    Header: "uhrzeit",
    Cell: ({ value }) => value?.slice(0, value?.indexOf(".")),
  },
  {
    accessor: "ItemType",
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
    accessor: "Street",
    Header: "straße",
  },
  {
    accessor: "Streetnumber",
    Header: "hausnummer",
  },
  {
    accessor: "ZIP",
    Header: "plz",
  },
  {
    accessor: "City",
    Header: "stadt",
  },
  {
    accessor: "Country",
    Header: "land",
  },
  // {
  //   accessor: "createdDate",
  //   Header: "erstellt am",
  // },
];
