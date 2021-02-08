import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import DataTable from "../../components/Table";
import Head from "next/head";
import Card from "../../components/Card";
const Account = ({ transactions, profile }) => {
  return (
    <div>
      <Head>
        <title>Profile - {profile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Grid container spacing={3}>
        <Grid item></Grid>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: "lighter" }} variant="body2">
            Khách hàng: {profile.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DataTable transactions={transactions} />
        </Grid>
        <Grid item xs={12}>
          <Card transactions={transactions} profile={profile} />
          {console.log(profile)}
        </Grid>
      </Grid>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://popcorn-review.herokuapp.com/accounts");
  const accounts = await res.json();
  const paths = accounts.map((acc) => ({ params: { id: acc._id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const transactionRes = await fetch(
    `http://popcorn-review.herokuapp.com/accounts/${params.id}/transactions`
  );
  const profileRespone = await fetch(
    `http://popcorn-review.herokuapp.com/accounts/${params.id}/`
  );

  const transactions = await transactionRes.json();
  const profile = await profileRespone.json();
  return {
    props: { transactions, profile },
  };
}
export default Account;
