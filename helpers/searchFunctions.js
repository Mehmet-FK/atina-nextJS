import axios from "axios";

export const searchNfcTag = async (params) => {
  let nfcArray = null;

  const { createdFrom, createdTo, id, tagID, desc, type, nfcData, itemID } =
    params;

  let base = `https://pbsolutions.dev/atina/AtinaNfcTags?CreatedDateFrom=${createdFrom}`;

  if (createdTo) {
    base += `&CreatedDateTo=${createdTo}`;
  }
  if (id) {
    base += `&ID=${id}`;
  }
  if (tagID) {
    base += `&TagID=${tagID}`;
  }
  if (desc) {
    base += `&Description=${desc}`;
  }
  if (type) {
    base += `&ItemType=${type}`;
  }
  if (nfcData) {
    base += `&NFCData=${nfcData}`;
  }
  if (itemID) {
    base += `&ItemID=${itemID}`;
  }
  try {
    const { data } = await axios(base);
    nfcArray = data;
  } catch (error) {
    console.log(error);
  }

  return nfcArray;
};
export const searchBookings = async (params) => {
  let bookingsArray = null;

  const {
    id,
    bookingType,
    street,
    streetnumber,
    zip,
    city,
    country,
    nfcTagID,
    nfcTagInfo,
    userID,
    itemID,
    dateFrom,
    dateTo,
    createdFrom,
    createdTo,
  } = params;

  let base = `https://pbsolutions.dev/atina/api/AtinaMobileBookings?CreatedDateFrom=${createdFrom}`;

  if (id) {
    base += `&ID=${id}`;
  }
  if (bookingType) {
    base += `&BookingType=${bookingType}`;
  }
  if (street) {
    base += `&Street=${street}`;
  }
  if (streetnumber) {
    base += `&Streetnumber=${streetnumber}`;
  }
  if (zip) {
    base += `&ZIP=${zip}`;
  }
  if (city) {
    base += `&City=${city}`;
  }
  if (country) {
    base += `&Country=${country}`;
  }
  if (nfcTagID) {
    base += `&NFC_Tag_ID=${nfcTagID}`;
  }
  if (nfcTagInfo) {
    base += `&NFC_Tag_Info=${nfcTagInfo}`;
  }
  if (userID) {
    base += `&UserID=${userID}`;
  }
  if (itemID) {
    base += `&ItemID=${itemID}`;
  }
  if (dateFrom) {
    base += `&DateFrom=${dateFrom}`;
  }
  if (dateTo) {
    base += `&DateTo=${dateTo}`;
  }
  if (createdFrom) {
    base += `&CreatedDateFrom=${createdFrom}`;
  }
  if (createdTo) {
    base += `&CreatedDateTo=${createdTo}`;
  }

  try {
    const { data } = await axios(base);
    bookingsArray = data;
  } catch (error) {
    console.log(error);
  }

  return bookingsArray;
};
