import { Avatar, Grid, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { loginState, selfStockState, tokenState } from "../../states";
import React, { useState } from "react";
import DataTable from "../../components/Table";
import { getAvailableStock } from "../../utils/stock";
import Head from "next/head";
import Card from "../../components/Card";
import ScrollMenu from "react-horizontal-scrolling-menu";
import StockCard from "../../components/StockCard";
import { useEffect } from "react";
import router from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/dist/client/router";
import auth from "../auth";
import NewsArea from "../../components/NewsArea";

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const Menu = (list, selected) =>
  list.map((el) => {
    const { name } = el;

    return (
      <StockCard
        name={el.name}
        avgPrice={el.avgPrice}
        vol={el.vol}
        key={name}
        selected={selected}
      />
    );
  });

const Account = ({ transactions, profile }) => {
  const selected = "item1";
  const ArrowLeft = Arrow({ text: " < ", className: "arrow-prev" });
  const [selfStock, setSelfStock] = useRecoilState(selfStockState);
  const ArrowRight = Arrow({ text: " > ", className: "arrow-next" });
  const [selectedCard, setSelectedCard] = useState({ selected: "key" });
  const item = Menu(selfStock, selectedCard);

  const onSelect = (key) => {
    setSelectedCard({ selected: key });
  };
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  useEffect(() => {
    console.log(auth);
    if (token == null) {
      router.push("/auth");
    }
  });

  useEffect(() => {
    setSelfStock(getAvailableStock(transactions));
  }, []);

  return (
    <div>
      <Head>
        <title>Profile - {profile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "lighter", marginLeft: "1rem" }}
            variant="h6"
          >
            Cổ phiếu của {profile.name.split(" ").slice(-1).join(" ")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ScrollMenu
            data={item}
            // arrowLeft={ArrowLeft}
            // arrowRight={ArrowRight}
            onSelect={onSelect}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "lighter", marginLeft: "1rem" }}
            variant="h6"
          >
            Lịch sử giao dịch
          </Typography>
        </Grid>

        <Grid item xs={12} md={9}>
          <DataTable transactions={transactions} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            transactions={transactions}
            selfStock={selfStock}
            profile={profile}
          />
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
