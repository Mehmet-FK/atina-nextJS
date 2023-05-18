import UsersTable from "@/components/tables/UsersTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { Paper } from "@mui/material";

import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

const AtinaUsers = ({ data }) => {
  return (
    <Paper>
      <Head>
        <title>Benutzer</title>
      </Head>
      <h1 style={{ marginBottom: "1rem" }}>Benutzer</h1>
      {/* <UsersTable data={data} /> */}
      <UsersTable data={data} />
    </Paper>
  );
};

export default AtinaUsers;

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

  const x = await atinaCalls.fetchData("AtinaUsers");

  return {
    props: {
      data: x.res,
      error: x.error,
      session,
    },
  };
};
