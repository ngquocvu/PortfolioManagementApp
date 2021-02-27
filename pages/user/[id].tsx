import { Avatar, Grid, Typography } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { useRecoilState } from "recoil";
import IndexChart from "../../components/Home/IndexChart";
import ChipsArea from "../../components/Home/MainChart/ChipsArea";
import HomeChartInfo from "../../components/Home/MainChart/HomeChartInfo";
import StockCard from "../../components/Home/TopStock/SmallStockCard";
import Table from "../../components/User/Table";
import { getAvailableStock } from "../../utils/stock";
import { loginState, selfStockState, tokenState } from "../../states";
import auth from "../auth";
import Card from "../../components/User/Card";

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
  const ArrowLeft = Arrow({ text: " < ", className: "arrow-prev" });
  const [selfStock, setSelfStock] = useRecoilState(selfStockState);
  const ArrowRight = Arrow({ text: " > ", className: "arrow-next" });
  const [selectedCard, setSelectedCard] = useState({ selected: "key" });
  const [code, setCode] = useState("VNINDEX");
  const [timeRange, setTimeRange] = useState("DAY");
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

  const Menu2 = () =>
    selfStock.map((self) => {
      return <div key={self.name}>{self.name}</div>;
    });

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
            Biểu đồ {code}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ChipsArea
            code={code}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            setCode={setCode}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={9}>
          <IndexChart code={code} timeRange={timeRange} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <HomeChartInfo />
        </Grid>

        <Grid item xs={12}>
          <Typography
            style={{ fontWeight: "lighter", marginLeft: "1rem" }}
            variant="h6"
          >
            Cổ phiếu của {profile.name.split(" ").slice(-1).join(" ")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ScrollMenu data={item} wheel={false} onSelect={onSelect} />
          {/* <ScrollMenu wheel={false} data={Menu2()} /> */}
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
          <Table transactions={transactions} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            transactions={transactions}
            selfStock={selfStock}
            profile={profile}
          />{" "}
        </Grid>

        {/* <Grid item xs={12} md={8}>
          <iframe
            frameBorder="0"
            src="https://vn.widgets.investing.com/top-cryptocurrencies?theme=darkTheme"
            width="100%"
            height="600"
            allowTransparency={true}
          ></iframe>
        </Grid>
        <Grid item xs={12} md={4}>
          <iframe
            src="https://vn.widgets.investing.com/single-currency-crosses?theme=darkTheme&hideTitle=true&currency=87"
            width="100%"
            height="600"
            frameBorder="0"
            allowTransparency={true}
          ></iframe>
        </Grid> */}
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
