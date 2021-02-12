import { atom } from "recoil";
const selfStockState = atom({
  key: "selfStockKey",
  default: [],
});

const loginState = atom({
  key: "loginState",
  default: false,
});

export { selfStockState, loginState };
