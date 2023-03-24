import {
  ADD_SUBSCRIPTION,
  BUSINESS_UPDATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  GET_SUBSCRIPTION_LIST,
  UPDATE_SUBSCRIPTION,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getSubscriptionList = async (props) => {
  const { name, page_size, page_index } = props;
  let url = GET_SUBSCRIPTION_LIST;
  return await getDataMethod(url);
};

export const deleteSubscription = async (id) => {
  let url = DELETE_SUBSCRIPTION + id;
  return await deleteDataMethod(url);
};

export const addSubscription = async (props) => {
  let url = ADD_SUBSCRIPTION;
  return await postDataMethod(url, props);
};
export const updateSubscription = async (id, payload) => {
  let url = UPDATE_SUBSCRIPTION + id;
  return await updateDataMethod(url, payload);
};

export const updateBusiness = async (subscriptionId, BusinessID) => {
  let url;
  if (BusinessID) {
    url =
      BUSINESS_UPDATE_SUBSCRIPTION +
      `${subscriptionId}?business_id=${BusinessID}`;
  } else {
    url = BUSINESS_UPDATE_SUBSCRIPTION + subscriptionId;
  }
  return await updateDataMethod(url);
};
