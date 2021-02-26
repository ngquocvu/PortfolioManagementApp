export const PROXY = "https://tidus-cors.herokuapp.com/";
export const API_URL = PROXY + "https://finfo-api.vndirect.com.vn/";
// "https://dchart-api.vndirect.com.vn/dchart/history?resolution=D&from=1609465803&to=1614095882&symbol=";
export const HISTORYCAL_DATA_URL =
  PROXY +
  "https://dchart-api.vndirect.com.vn/dchart/history?resolution=D&from=1598925003&symbol=";

export const HISTORYCAL_DATA_URL_WITHOUT_PARAM =
  PROXY + "https://dchart-api.vndirect.com.vn/dchart/history?resolution=D&";
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

export const GET_TRADE_MARKET_INDEX =
  PROXY +
  "https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:VNINDEX,HNX,UPCOM,VN30,VN30F1M~period:1D";

export const BUY_COLOR = "#1eb800";
export const SELL_COLOR = "#f22e1f";
