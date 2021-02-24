export const PROXY = "https://private-cors-server.herokuapp.com/";
export const API_URL = PROXY + "https://finfo-api.vndirect.com.vn/";
export const HISTORYCAL_DATA_URL =
  PROXY +
  "https://dchart-api.vndirect.com.vn/dchart/history?resolution=D&from=1582991822&to=1614095882&symbol=";
export const EVENT_URL =
  PROXY + "https://api-finfo.vndirect.com.vn/events?symbols=";
export const DCHART_URL =
  "https://dchart.vndirect.com.vn/?domain=https://banggia.vndirect.com.vn&timeframe=D&language=vi&symbol=ITA";
export const FIND_STOCKS_URL =
  PROXY +
  "https://api-finfo.vndirect.com.vn/v4/stocks?q=type:STOCK~status:LISTED";

//https://api-finfo.vndirect.com.vn/events?fromEffDate=2021-02-23&toEffDate=2021-02-23
export const GET_EVENTS_URL =
  PROXY + "https://api-finfo.vndirect.com.vn/events/";
