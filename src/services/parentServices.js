import {
  ADD_PARENT,
  DEL_PARENT,
  DEL_STUDENT,
  GET_PARENT_BY_ID,
  GET_PARENTS_LIST,
  GET_STUDENTS_LIST,
  UPDATE_PARENT,
} from "../constants/apiURLS";
import { GET_OPERATOR_LIST } from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getParentsList = async (props) => {
  const { name, page_size, page_index, school_id } = props;
  let url =
    GET_PARENTS_LIST +
    `name=${name}&page_size=${page_size}&page_index=${page_index}`;
  if (school_id) {
    url = `${url}&school_id=${school_id}`;
  }
  return await getDataMethod(url);
};
export const getParentById = async (id) => {
  let url = GET_PARENT_BY_ID + id;
  return await getDataMethod(url);
};
export const updateParent = async (id, payload) => {
  let url = UPDATE_PARENT + id;
  return await updateDataMethod(url, payload);
};

export const getOperatorList = async (props) => {
  let url = GET_OPERATOR_LIST;

  return await getDataMethod(url);
};

export const delParent = async (id) => {
  let url = DEL_PARENT + id;
  return await deleteDataMethod(url);
};
export const addNewParent = async (payload) => {
  let url = ADD_PARENT;
  return await postDataMethod(url, payload);
};
