import {
  ADD_BUSINESS,
  ADD_SUBSCRIPTION,
  ADD_TERM,
  DEL_TERM,
  DELETE_SUBSCRIPTION,
  GET_BUSINESS_LIST,
  GET_SCHOOL,
  GET_SINGLE_BUSINESS,
  GET_SUBSCRIPTION_LIST,
  GET_TERM,
  GET_YEAR,
  UPDATE_BUSINESS,
  UPDATE_SUBSCRIPTION,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getBusinessList = async (props) => {
  const { name, page_size, page_index } = props;
  let url =
    GET_BUSINESS_LIST +
    `name=${name}&page_size=${page_size}&page_index=${page_index}`;
  return await getDataMethod(url);
};
export const getSingleBusiness = async (id) => {
  let url = GET_SINGLE_BUSINESS + id;
  return await getDataMethod(url);
};

export const addBusiness = async (props) => {
  let url = ADD_BUSINESS;
  return await postDataMethod(url, props);
};
export const deleteSubscription = async (id) => {
  let url = DELETE_SUBSCRIPTION + id;
  return await deleteDataMethod(url);
};
export const updateSubscription = async (id, payload) => {
  let url = UPDATE_SUBSCRIPTION + id;
  return await updateDataMethod(url, payload);
};
export const updateBusiness = async (id, payload) => {
  let url = UPDATE_BUSINESS + id;
  return await updateDataMethod(url, payload);
};
