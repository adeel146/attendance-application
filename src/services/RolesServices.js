import {
  ADD_PARENT,
  ADD_ROLE,
  DEL_PARENT,
  DEL_STUDENT,
  DELETE_ROLE,
  GET_PARENT_BY_ID,
  GET_PARENTS_LIST,
  GET_ROLE,
  GET_ROLE_BY_ID,
  GET_ROLE_DETAIL_BY_ID,
  GET_STUDENTS_LIST,
  UPDATE_PARENT,
  UPDATE_ROLE,
} from "../constants/apiURLS";
import { GET_OPERATOR_LIST } from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getRoles = async (props) => {
  let url = GET_ROLE;
  if (!props) {
    url = url;
  } else if (props?.school_id) {
    url = `${url}&school_id=${school_id}`;
  } else {
    const { page_size, page_index } = props;
    url = `${url}pageSize=${page_size}&pageIndex=${page_index}`;
  }
  return await getDataMethod(url);
};
export const getRoleById = async (id, academicYear) => {
  let url =
    GET_ROLE_BY_ID +
    `${id}?year_id=${academicYear}
  `;
  return await getDataMethod(url);
};
export const getRoleDetailById = async (id) => {
  let url =
    GET_ROLE_DETAIL_BY_ID +
    `${id}
  `;
  return await getDataMethod(url);
};
export const updateRole = async (id, payload) => {
  let url = UPDATE_ROLE + id;
  return await updateDataMethod(url, payload);
};

export const getOperatorList = async (props) => {
  let url = GET_OPERATOR_LIST;

  return await getDataMethod(url);
};

export const deleteRole = async (id) => {
  let url = DELETE_ROLE + id;
  return await deleteDataMethod(url);
};
export const addRole = async (payload) => {
  let url = ADD_ROLE;
  return await postDataMethod(url, payload);
};
