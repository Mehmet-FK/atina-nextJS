import ErrorModal from "@/components/modals/ErrorModal";
import ItemsTable from "@/components/tables/ItemsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AtinaItems = ({ atinaItems }) => {
  const { getAtinaItemsData } = useAtinaCalls("Order");

  useEffect(() => {
    getAtinaItemsData("Order");
  }, []);
  // const { atinaItems } = useSelector((state) => state.atina);
  const { error } = useSelector((state) => state.atina);
  const { loading } = useSelector((state) => state.atina);
  // console.log("INDEX.JS", atinaItems);
  return (
    <div>
      {/* <ErrorModal error={error} /> */}
      <Head>
        <title>Datensätze</title>
      </Head>
      <h1 style={{ marginBottom: "1rem" }}>Datensätze</h1>
      <ItemsTable atinaItems={atinaItems} />
    </div>
  );
};

export default AtinaItems;
export const getServerSideProps = async (context) => {
  // let error = null;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const atinaCalls = new AtinaCalls();

  const data = await atinaCalls.fetchData(
    "api/AtinaItems/SearchByKeyValue?ItemType=Order"
  );
  // .then((res) => (data = res));

  if (data?.length) {
    return {
      props: { atinaItems: data },
    };
  }
};
