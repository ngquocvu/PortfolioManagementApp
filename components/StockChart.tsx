import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";
import { numberWithCommas } from "../utils/stock";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  handleClose,
  name,
  stockStat,
}) {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClose()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {"Tình hình cổ phiếu " + name}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Container>
          <MaterialTable
            style={{ textAlign: "center" }}
            title=""
            columns={[
              {
                title: "Giá",
                field: "open",
                render: (rowData) => numberWithCommas(rowData.open),
              },

              {
                title: "KL giao dịch",
                field: "volume",
                render: (rowData) => numberWithCommas(rowData.open * 1000),
              },
              { title: "Ngày", field: "date", type: "date" },
            ]}
            data={stockStat.data}
            icons={TableIcons}
          />
        </Container>
      </Dialog>
    </>
  );
}
