import {
  ADD_PERIOD,
  ADD_TERM,
  DEL_PERIOD,
  DEL_TERM,
  GET_LECTURE_DETAIL,
  GET_PERIODS,
  GET_SCHOOL,
  GET_TERM,
  GET_USERS,
  GET_YEAR,
  UPDATE_PERIOD,
  UPDATE_PERIOD_STATUS,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const addPeriod = async (props) => {
  let url = ADD_PERIOD;
  return await postDataMethod(url, props);
};

export const getPeriodsList = async (props) => {
  let url;
  const { page_Size, page_Index, active } = props;
  url =
    GET_PERIODS +
    `pageSize=${page_Size}&pageIndex=${page_Index}&active=${active}`;

  return await getDataMethod(url);
};
export const getLectureDetail = async (classId) => {
  let url;
  url = GET_LECTURE_DETAIL + classId;

  return await getDataMethod(url);
};

export const deletePeriod = async (id) => {
  let url = DEL_PERIOD + id;
  return await deleteDataMethod(url);
};
export const updatePeriod = async (id, payload) => {
  let url = UPDATE_PERIOD + id;
  return await updateDataMethod(url, payload);
};
export const updatePeriodStatus = async (id, status) => {
  let url = UPDATE_PERIOD_STATUS + `${id}?status=${status}`;
  return await updateDataMethod(url);
};
