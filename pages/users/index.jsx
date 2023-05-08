import UsersTable from "@/components/tables/UsersTable";
import { AtinaCalls } from "@/helpers/apiFunctions";

import { getSession, useSession } from "next-auth/react";

const AtinaUsers = ({ data }) => {
  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Benutzer</h1>
      <UsersTable data={data} />
    </>
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
      data: x,
      session,
    },
  };
};
