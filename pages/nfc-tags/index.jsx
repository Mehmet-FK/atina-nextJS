import NfcTable from "@/components/tables/NfcTable";
import { AtinaCalls } from "@/helpers/apiFunctions";
import { getSession } from "next-auth/react";
import Head from "next/head";

const NfcTags = ({ data }) => {
  return (
    <div>
      <Head>
        <title>NFC Tags</title>
      </Head>
      <h1 style={{ marginBottom: "1rem" }}>NFC Tags</h1>
      <NfcTable data={data} />
    </div>
  );
};

export default NfcTags;

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

  const x = await atinaCalls.fetchData("AtinaNfcTags");
  const editedData = x?.res?.map((item) => item.item);

  return {
    props: { data: editedData, error: x.error },
  };
};
