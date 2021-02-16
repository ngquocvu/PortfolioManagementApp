import { atom } from "recoil";
const selfStockState = atom({
  key: "selfStockKey",
  default: [],
});

const loginState = atom({
  key: "loginState",
  default: false,
});

const tokenState = atom({
  key: "tokenState",
  default: null,
});

export { selfStockState, loginState, tokenState };
