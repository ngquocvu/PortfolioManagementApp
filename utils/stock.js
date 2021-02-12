// Input: lịch sử giao dịch => Output:tính toán để đưa ra các mã CK còn nắm giữ và giá trung bình mua.
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

  return stocks.filter((x) => x.vol !== 0);
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export { getAvailableStock, numberWithCommas };
