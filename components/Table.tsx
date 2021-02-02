import React from "react";
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

const useStyles = makeStyles({
  table: {},
});

export default function AcccessibleTable({ transactions }) {
  const classes = useStyles();

  return (
    <MaterialTable
      title="Self Finance Management"
      columns={[
        { title: "Stock", field: "stock" },
        { title: "Volume", field: "vol" },
        { title: "Unit Price", field: "unit_price" },
        { title: "Order", field: "order" },
        { title: "Time", field: "create_at", type: "date" },
      ]}
      data={transactions}
      icons={TableIcons}
    />
  );
}
