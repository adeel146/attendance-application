import {
  GET_GROUPS_LIST,
  GET_NAVLIST,
  GET_PERMISSIONS,
  GET_USER_PERMISSIONS,
} from "../constants/apiURLS";
import { getDataMethod } from "./NetworkServices";

export const getAllGroups = async () => {
  let url = GET_GROUPS_LIST;
  return await getDataMethod(url);
};
export const getAllPermissions = async () => {
  let url = GET_PERMISSIONS;
  return await getDataMethod(url);
};
export const getUserPermissions = async () => {
  let url = GET_USER_PERMISSIONS;
  return await getDataMethod(url);
};
export const getNavList = async (year_id) => {
  let url = GET_NAVLIST + year_id;
  return await getDataMethod(url);
};
