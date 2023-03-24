import {
  FORGET_PASSWORD,
  LOGIN_URL,
  RESET_PASSWORD,
} from "../constants/apiURLS";
import {
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const loginUser = async (dataObject) => {
  let url = LOGIN_URL;
  return await postDataMethod(url, dataObject);
};
export const resetPassword = async (dataObject) => {
  let url = RESET_PASSWORD;
  return await updateDataMethod(url, dataObject);
};
export const forgetPassword = async (dataObject) => {
  let url = FORGET_PASSWORD;
  return await updateDataMethod(url, dataObject);
};
