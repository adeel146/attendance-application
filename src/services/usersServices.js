import {
  ADD_TERM,
  DEL_TERM,
  GET_SCHOOL,
  GET_TERM,
  GET_USERS,
  GET_YEAR,
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

export const getUsersList = async (props) => {
  let url;
  if (props?.page_size) {
    const { page_size, page_index, business_id } = props;
    url =
      GET_USERS +
      `page_size=${page_size}&page_index=${page_index}&business_id=${business_id}`;
  } else {
    url = GET_USERS;
  }

  return await getDataMethod(url);
};

export const deleteTermList = async (id) => {
  let url = DEL_TERM + id;
  return await deleteDataMethod(url);
};

export const getYear = async (props) => {
  let url = GET_YEAR;
  return await getDataMethod(url);
};

export const assignToSchool = async (props) => {
  let url = GET_SCHOOL;
  return await getDataMethod(url);
};
