import {
  ADD_CALENDER,
  DEL_CALENDER,
  GET_CALENDER,
  PROFILE_GET_BY_ID,
  UPDATE_CALENDER,
  UPDATE_CALENDER_PROFILE,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const addCalenderList = async (props) => {
  let url = ADD_CALENDER;
  return await postDataMethod(url, props);
};

export const getCalenderList = async (props) => {
  const { page_size = "", page_index = "" } = props;
  let url = GET_CALENDER + `page_size=${page_size}&page_index=${page_index}`;
  return await getDataMethod(url);
};

export const deleteCalenderList = async (id) => {
  let url = DEL_CALENDER + id;
  return await deleteDataMethod(url);
};

export const updateCalenderList = async (id, status) => {
  let url = UPDATE_CALENDER + id + `?status=${status}`;
  return await updateDataMethod(url);
};

export const updateCalenders = async (id, payload) => {
  let url = UPDATE_CALENDER_PROFILE + id;
  return await updateDataMethod(url, payload);
};

export const getProfileId = async (id) => {
  let url = PROFILE_GET_BY_ID + id;
  return await getDataMethod(url);
};
