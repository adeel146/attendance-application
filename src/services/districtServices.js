import {
  ADD_DISTRICT,
  ADD_STAFF,
  DEL_PARENT,
  DEL_STUDENT,
  DELETE_DISTRICT,
  GET_DISTRICT_BY_ID,
  GET_DISTRICT_LIST,
  GET_PARENTS_LIST,
  GET_SINGLE_STAFF,
  GET_STAFF_LIST,
  GET_STUDENTS_LIST,
  UPDATE_DISTRICT,
  UPDATE_STAFF,
} from "../constants/apiURLS";
import { GET_OPERATOR_LIST } from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getDistrictList = async (props) => {
  const { page_size, page_index } = props;
  let url =
    GET_DISTRICT_LIST + `page_size=${page_size}&page_index=${page_index}`;
  return await getDataMethod(url);
};
export const getStaffById = async (id) => {
  let url = GET_SINGLE_STAFF + id;
  return await getDataMethod(url);
};

export const getOperatorList = async (props) => {
  let url = GET_OPERATOR_LIST;

  return await getDataMethod(url);
};
export const addDistrict = async (payload) => {
  let url = ADD_DISTRICT;
  return await postDataMethod(url, payload);
};

export const deleteDistrict = async (id) => {
  let url = DELETE_DISTRICT + id;
  return await deleteDataMethod(url);
};

export const updateStaff = async (id, payload) => {
  let url = UPDATE_STAFF + id;
  return await updateDataMethod(url, payload);
};

export const updateDistrict = async (id, payload) => {
  let url = UPDATE_DISTRICT + id;
  return await updateDataMethod(url, payload);
};

export const getByDistrictId = async (id) => {
  let url = GET_DISTRICT_BY_ID + id;
  return await getDataMethod(url);
};
