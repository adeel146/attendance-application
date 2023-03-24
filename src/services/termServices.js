import {
  ADD_TERM,
  DEL_TERM,
  GET_SCHOOL,
  GET_TERM,
  GET_TERM_BY_ID,
  GET_YEAR,
  UPDATE_TERM,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const addTermList = async (props) => {
  let url = ADD_TERM;
  return await postDataMethod(url, props);
};

export const getTermList = async (props) => {
  const { name, page_size, page_index, school_id } = props;
  let url =
    GET_TERM + `name=${name}&pageSize=${page_size}&pageIndex=${page_index}`;
  if (school_id) {
    url = `${url}&school_id=${school_id}`;
  }
  return await getDataMethod(url);
};

export const deleteTermList = async (id) => {
  let url = DEL_TERM + id;
  return await deleteDataMethod(url);
};
export const getTermById = async (id) => {
  let url = GET_TERM_BY_ID + id;
  return await getDataMethod(url);
};

export const getYear = async (props) => {
  let url = GET_YEAR;
  return await getDataMethod(url);
};

export const assignToSchool = async (props) => {
  let url = GET_SCHOOL;
  return await getDataMethod(url);
};

export const updateTerm = async (id, payload) => {
  let url = UPDATE_TERM + id;
  return await updateDataMethod(url, payload);
};
