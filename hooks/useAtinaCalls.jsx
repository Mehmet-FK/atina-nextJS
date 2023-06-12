"use client";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { fetchFail, fetchStart, getSuccess } from "../redux/slices/atinaSlice";
import useAxios from "./useAxios";

const useAtinaCalls = () => {
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();

  //!--------------- GET CALL --------------
  const getAtinaData = async (url) => {
    dispatch(fetchStart());
    let res = null;
    let error = null;
    try {
      const { data } = await axiosInstance.get(`${url}`);
      dispatch(getSuccess({ data, url }));
      res = data;
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      console.log(err);
      console.log(message);
      error = err;
    }
    return { error, res };
  };

  //!--------------- PUT CALL --------------
  const putAtinaData = async (url, info) => {
    try {
      await axiosInstance.put(`${url}/${info.id}`, info);
      toastSuccessNotify(`Erfolgreich aktualisiert..`);
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
  };
  //!--------------- DELETE CALL --------------
  const deleteAtinaData = async (url, id) => {
    let res = null;
    let error = null;
    try {
      res = await axiosInstance.delete(`${url}/${id}`);
      toastSuccessNotify(`Erfolgreich aktualisiert..`);
    } catch (err) {
      error = err;
      const { message } = err;
      dispatch(fetchFail({ message }));
      toastErrorNotify(`Etwas schiefgelaufen.. `);
      toastErrorNotify(`${message}`);
      console.log(err);
    }
    return { res, error };
  };
  //GET
  const getUsersData = () => getAtinaData("AtinaUsers");
  const getMobileBookingsData = () => getAtinaData("api/AtinaMobileBookings");
  const getNfcTagsData = () => getAtinaData("AtinaNfcTags");
  const getAtinaItemsData = (type) =>
    getAtinaData(
      `api/AtinaItems/SearchByKeyValue?ItemType=${type}&onlyWithTagId=false`
    );
  //PUT
  const putUserData = (info) => putAtinaData("AtinaUsers", info);

  // DELETE
  const deleteAtinaItems = (id) => deleteAtinaData("api/AtinaItems/Delete", id);

  return {
    getUsersData,
    getMobileBookingsData,
    getNfcTagsData,
    getAtinaItemsData,
    putUserData,
    deleteAtinaItems,
  };
};

export default useAtinaCalls;
