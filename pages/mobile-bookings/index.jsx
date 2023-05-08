import MobileBookingsTable from "@/components/tables/MobileBookingsTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import axios from "axios";
import { getSession } from "next-auth/react";

const MobileBookings = ({ data }) => {
  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Mobile Buchungen</h1>

      <MobileBookingsTable data={data} />
    </div>
  );
};

export default MobileBookings;

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

  const x = await atinaCalls.fetchData("api/AtinaMobileBookings");

  return {
    props: { data: x },
  };
};
