import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const getAvailableStock = (transactions) => {
  const stocks = [];
  transactions.map((tran) => {
    if (stocks.some((item) => item.name === tran.stock)) {
      let foundItem = stocks.find((item) => item.name === tran.stock);
      const index = stocks.indexOf(foundItem);
      //
      if (tran.order == "BUY") {
        stocks[index] = {
          ...foundItem,
          vol: foundItem.vol + tran.vol,
          avgPrice:
            (foundItem.vol * foundItem.avgPrice + tran.vol * tran.unit_price) /
            (tran.vol + foundItem.vol),
        };
      } else {
        stocks[index] = {
          ...foundItem,
          vol: foundItem.vol - tran.vol,
        };
      }
    } else {
      stocks.push({
        name: tran.stock,
        vol: tran.vol,
        avgPrice: tran.unit_price,
      });
    }
  });
  return stocks;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { width: "100%" },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const getCash = (transactions, balance) => {
  let newBalance = balance;
  transactions.map((trans) => {
    if (trans.order == "BUY") {
      newBalance -= trans.vol * trans.unit_price;
    } else {
      newBalance += trans.vol * trans.unit_price;
    }
  });
  return newBalance;
};
const getStockValue = (availStock) => {
  let total = 0;
  availStock.forEach((e) => {
    total += e.vol * e.avgPrice;
  });
  return total;
};

export default function RecipeReviewCard({ transactions, profile }) {
  const classes = useStyles();
  const [availStock, getAvailStock] = useState(getAvailableStock(transactions));
  const [stockValue, setStockValue] = useState(getStockValue(availStock));
  const [cash, setCash] = useState(getCash(transactions, profile.balance));

  return (
    <Box border={0} borderRadius={5}>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell>
                {" "}
                <Typography variant="h5">Tổng kết </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vốn</TableCell>
              <TableCell align="right" component="th" scope="row">
                {numberWithCommas(profile.balance) + " đ"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tiền mặt còn lại</TableCell>
              <TableCell align="right" component="th" scope="row">
                {numberWithCommas(cash)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Giá trị chứng khoán</TableCell>
              <TableCell align="right" component="th" scope="row">
                {numberWithCommas(stockValue)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tổng tiền còn lại</TableCell>
              <TableCell align="right" component="th" scope="row">
                {numberWithCommas(stockValue + parseFloat(cash))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lời / Lỗ</TableCell>
              <TableCell align="right" component="th" scope="row">
                {numberWithCommas(
                  stockValue + parseFloat(cash) - profile.balance
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
