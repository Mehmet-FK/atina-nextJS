import ItemsTable from "@/components/tables/ItemsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const AtinaItems = ({ data }) => {
  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Datensätze</h1>
      <ItemsTable data={data} />
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

  const x = await atinaCalls.fetchData("api/AtinaItems/search");

  return {
    props: { data: x },
  };
};
