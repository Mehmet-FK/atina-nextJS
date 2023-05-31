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
    console.log(base);
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
    username,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  } = params;

  let base = `https://pbsolutions.dev/atina/api/AtinaMobileBookings?`;
  {
    /*
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
   if (createdFrom) {
    base += `&CreatedDateFrom=${createdFrom}`;
  }
  if (createdTo) {
    base += `&CreatedDateTo=${createdTo}`;
  } */
  }

  if (username) {
    base += `&username=${username}`;
  }
  if (dateFrom) {
    base += `&dateFrom=${dateFrom.replaceAll("-", "")}`;
  }
  if (dateTo) {
    base += `&dateTo=${dateTo.replaceAll("-", "")}`;
  }
  if (timeFrom) {
    base += `&timeFrom=${timeFrom}`;
  }
  if (timeTo) {
    base += `&timeTo=${timeTo}`;
  }

  try {
    const { data } = await axios(base);
    bookingsArray = data;
  } catch (error) {
    console.log(error);
  }

  return bookingsArray;
};
export const searchItems = async (params) => {
  let itemArray = null;
  let error = null;

  const {
    type,
    id,
    itemType,
    itemID,
    itemNumber,
    street,
    streetnumber,
    zip,
    city,
    country,
    data1,
    data2,
    data3,
    data4,
    data5,
  } = params;

  let base = `https://pbsolutions.dev/atina/api/AtinaItems/SearchByKeyValue?ItemType=${type}`;

  if (id) {
    base += `&ID=${id}`;
  }
  if (itemType) {
    base += `&ItemType=${itemType}`;
  }
  if (itemID) {
    base += `&ItemId=${itemID}`;
  }
  if (itemNumber) {
    base += `&ItemNumber=${itemNumber}`;
  }
  if (street) {
    base += `&Street=${street}`;
  }
  if (streetnumber) {
    base += `&Streetnumber=${streetnumber}`;
  }
  if (zip) {
    base += `&Zip=${zip}`;
  }
  if (city) {
    base += `&City=${city}`;
  }
  if (country) {
    base += `&Country=${country}`;
  }
  if (data1) {
    base += `&Data1=${data1}`;
  }
  if (data2) {
    base += `&Data2=${data2}`;
  }
  if (data3) {
    base += `&Data3=${data3}`;
  }
  if (data4) {
    base += `&Data4=${data4}`;
  }
  if (data5) {
    base += `&Data5=${data5}`;
  }
  console.log(base);
  try {
    const { data } = await axios(base);
    itemArray = data;
  } catch (err) {
    console.log(err);
    error = err;
  }

  return { itemArray, error };
};

export const searchUsers = async (params) => {
  /*  let bookingsArray = null;

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
    username,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
  } = params;

  let base = `https://pbsolutions.dev/atina/api/AtinaMobileBookings?`;

  if (username) {
    base += `&username=${username}`;
  }
  if (dateFrom) {
    base += `&dateFrom=${dateFrom.replaceAll("-", "")}`;
  }
  if (dateTo) {
    base += `&dateTo=${dateTo.replaceAll("-", "")}`;
  }
  if (timeFrom) {
    base += `&timeFrom=${timeFrom}`;
  }
  if (timeTo) {
    base += `&timeTo=${timeTo}`;
  }

  try {
    const { data } = await axios(base);
    bookingsArray = data;
  } catch (error) {
    console.log(error);
  }

  return bookingsArray; */
};
