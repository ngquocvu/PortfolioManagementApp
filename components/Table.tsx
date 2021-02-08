import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableIcons from "../components/TableIcons";
import MaterialTable from "material-table";
import { Typography } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  table: {},
});
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const AcccessibleTable = ({ transactions }) => {
  const classes = useStyles();

  return (
    <MaterialTable
      title="Bảng giao dịch"
      columns={[
        { title: "Cổ phiếu", field: "stock" },
        { title: "Khối lượng", field: "vol" },
        {
          title: "Lệnh",
          field: "order",
          render: (rowData) => {
            if (rowData.order == "BUY")
              return <Typography color="primary">Mua</Typography>;
            else return <Typography color="secondary">Bán</Typography>;
          },
        },
        {
          title: "Giá/đơn vị",
          field: "unit_price",
          render: (rowData) => {
            return numberWithCommas(rowData.unit_price);
          },
        },
        {
          title: "Tổng",
          // render: (rowData) => (
          //   <div>{numberWithCommas(rowData.unit_price * rowData.vol)}</div>
          // ),
          render: (rowData) => {
            if (rowData.order == "BUY")
              return (
                <Typography color="primary">
                  {numberWithCommas(rowData.unit_price * rowData.vol)}
                </Typography>
              );
            else
              return (
                <Typography color="secondary">
                  {numberWithCommas(rowData.unit_price * rowData.vol)}
                </Typography>
              );
          },
        },

        { title: "Thời gian", field: "create_at", type: "date" },
      ]}
      data={transactions}
      icons={TableIcons}
    />
  );
};
export default AcccessibleTable;
