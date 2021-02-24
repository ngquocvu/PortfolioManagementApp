import { CardContent, Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import React, { useEffect } from "react";
import * as Constants from "./constants";
import { useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
const useStyles = makeStyles({
  root: {
    margin: "0 1rem",
    minHeight: 125,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface News {
  totalCount: number;
  data: [
    {
      id: string;
      symbol: string;
      typeDesc: string;
      content: string;
    }
  ];
}

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

function formatDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const NewsArea = () => {
  const classes = useStyles();
  const query = "Chứng khoán";

  const [news, setNews] = useState<News>({
    data: [{ id: "0", symbol: "", typeDesc: "", content: "" }],
    totalCount: 0,
  });

  const defaultProps = {
    borderColor: "text.primary",

    style: { cursor: "pointer", margin: "20" },
    border: 1,
  };

  useEffect(() => {
    axios
      .get(
        Constants.GET_EVENTS_URL +
          "?fromEffDate=" +
          formatDate() +
          "&toEffDate=" +
          formatDate(),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setNews(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {news.totalCount !== 0 ? (
        <ScrollMenu
          data={news.data.map((each) => {
            return (
              <Card
                className={classes.root}
                style={{ cursor: "pointer" }}
                onClick={() => {}}
                {...defaultProps}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {each.typeDesc}
                  </Typography>
                  {/* <Typography
              variant="body2"
              gutterBottom
              color="textSecondary"
              component="p"
            >
             {each.title}
            </Typography> */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="right"
                  >
                    {each.content}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
          wheel={false}
        />
      ) : (
        <div>a</div>
      )}
    </div>
  );
};
export default NewsArea;

// <Grid container spacing={4}>
// {news.totalCount !== 0 ? (
//   news.data.map((each) => (
//     <Grid item sm={12} md={3}>
//       <Card
//         style={{ cursor: "pointer" }}
//         onClick={() => {
//           openInNewTab("https://stackoverflow.com");
//         }}
//         {...defaultProps}
//       >
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {each.typeDesc}
//           </Typography>
//           {/* <Typography
//           variant="body2"
//           gutterBottom
//           color="textSecondary"
//           component="p"
//         >
//          {each.title}
//         </Typography> */}
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             align="right"
//           >
//             {each.content}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   ))
// ) : (
//   <>
//     <Typography
//       variant="body2"
//       gutterBottom
//       color="textSecondary"
//       align="center"
//       component="p"
//     >
//       Không có tin tức mới
//     </Typography>
//   </>
// )}
// </Grid>
