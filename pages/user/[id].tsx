import { Grid, Paper } from "@material-ui/core";
import React from "react";
import DataTable from "../../components/Table";
import Head from "next/head";
import Card from "../../components/Card";
const Account = ({ transactions }) => {
  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid container spacing={3}>
        <Grid item md={8} sm={12}>
          <DataTable transactions={transactions} />
        </Grid>
        <Grid
          item
          md={4}
          sm={12}
          style={{
            alignItems: "center",
          }}
        >
          <Card />
        </Grid>
      </Grid>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3006/accounts");
  const accounts = await res.json();
  const paths = accounts.map((acc) => ({ params: { id: acc._id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const transactionRes = await fetch(
    `http://127.0.0.1:3006/accounts/${params.id}/transactions`
  );

  const transactions = await transactionRes.json();
  return {
    props: { transactions },
  };
}
export default Account;
