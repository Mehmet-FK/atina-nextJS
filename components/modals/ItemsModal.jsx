"use client";

import { memo, useEffect, useState } from "react";
import ItemsModal_Order from "./itemsModals/ItemsModal_Order";
import ItemsModal_Meter from "./itemsModals/ItemsModal_Meter";
import ItemsModal_Vehicle from "./itemsModals/ItemsModal_Vehicle";
import { useSession } from "next-auth/react";

//ITEM ORDER

const ItemsModal = ({ setOpenItemsModal, openItemsModal, item, type }) => {
  const { data } = useSession();
  const [inputVal, setInputVal] = useState(item ? item : {});
  const [isAdmin, setIsAdmin] = useState(true);

  const handleClose = () => {
    setOpenItemsModal(false);
    if (!item) {
      setInputVal({});
    }
  };
  const handleChange = (e) => {
    if (!isAdmin) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setIsAdmin(data?.user?.userInfo?.isAdministrator);
  }, [data]);

  useEffect(() => {
    setInputVal(item);
  }, [type]);

  return (
    <>
      {type === "Order" && (
        <ItemsModal_Order
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={isAdmin}
          setInputVal={setInputVal}
        />
      )}
      {type === "Meter" && (
        <ItemsModal_Meter
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={isAdmin}
          setInputVal={setInputVal}
        />
      )}
      {type === "Vehicle" && (
        <ItemsModal_Vehicle
          item={item}
          handleClose={handleClose}
          openItemsModal={openItemsModal}
          handleChange={handleChange}
          inputVal={inputVal}
          isAdmin={isAdmin}
          setInputVal={setInputVal}
        />
      )}
    </>
  );
};

export default ItemsModal;
