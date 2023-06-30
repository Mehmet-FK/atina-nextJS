import ErrorModal from "@/components/modals/ErrorModal";
import MobileBookingsTable from "@/components/tables/MobileBookingsTable";
// import MobileBookingsTable from "@/components/tables/ResizeBookingsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MobileBookings = ({ data, error }) => {
  return (
    <div>
      <ErrorModal error={error} />
      <Head>
        <title>Mobile Buchungen</title>
      </Head>
      <h2 style={{ marginBottom: "0.3rem", fontSize: "1.7rem" }}>
        Mobile Buchungen
      </h2>
      {/* {!error && <MobileBookingsTable data={data} />} */}
      {!error && <MobileBookingsTable data={data} />}
    </div>
  );
};

export default MobileBookings;

export const getServerSideProps = async (context) => {
  let data = null;
  let error = null;
  const session = await getSession(context);
  console.log("SESSION", session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const atinaCalls = new AtinaCalls();

  await atinaCalls
    .fetchData("api/AtinaMobileBookings")
    .then((res) => (data = res));

  if (data) {
    return {
      props: { data, error },
    };
  } else {
    return {
      props: { error },
    };
  }
};
