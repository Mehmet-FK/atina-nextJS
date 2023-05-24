import ErrorModal from "@/components/modals/ErrorModal";
import ItemsTable from "@/components/tables/ItemsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const AtinaItems = ({ data, error }) => {
  return (
    <div>
      <ErrorModal error={error} />
      <Head>
        <title>Datensätze</title>
      </Head>
      <h1 style={{ marginBottom: "1rem" }}>Datensätze</h1>
      {!error && <ItemsTable data={data} error={error} />}{" "}
    </div>
  );
};

export default AtinaItems;
export const getServerSideProps = async (context) => {
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

  const x = await atinaCalls.fetchData(
    "api/AtinaItems/SearchByKeyValue?ItemType=Order"
  );

  return {
    props: { data: x.res, error: x.error },
  };
};
