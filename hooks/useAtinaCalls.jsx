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
    try {
      const { data } = await axiosInstance.get(`${url}`);
      dispatch(getSuccess({ data, url }));
    } catch (err) {
      const { message } = err;
      dispatch(fetchFail({ message }));
      console.log(err);
      console.log(message);
    }
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
  //GET
  const getUsersData = () => getAtinaData("AtinaUsers");
  const getMobileBookingsData = () => getAtinaData("api/AtinaMobileBookings");
  const getNfcTagsData = () => getAtinaData("AtinaNfcTags");
  const getAtinaItemsData = (a) =>
    getAtinaData(`api/AtinaItems/search?filter=aufeldgasse&type=${a}`);
  //PUT
  const putUserData = (info) => putAtinaData("AtinaUsers", info);

  return {
    getUsersData,
    getMobileBookingsData,
    getNfcTagsData,
    getAtinaItemsData,
    putUserData,
  };
};

export default useAtinaCalls;
