import {
  ADD_CLASS,
  DEL_CLASS,
  GET_CLASS_BY_ID,
  GET_CLASSES,
  GET_STUDENT_BY_ID,
  UPDATE_CLASS,
  UPDATE_CLASS_STATUS,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getClases = async (props) => {
  let url;
  if (!props?.page_size) {
    const { school_id = "" } = props;
    url = GET_CLASSES + `?school_id=${school_id}`;
  } else {
    const { name, page_size, page_index, school_id = "" } = props;
    url =
      GET_CLASSES +
      `?name=${name}&page_size=${page_size}&page_index=${page_index}&school_id=${school_id}`;
  }
  return await getDataMethod(url);
};
export const getSingleClass = async (id) => {
  let url = GET_CLASS_BY_ID + id;
  return await getDataMethod(url);
};
export const getSingleStudent = async (id) => {
  let url = GET_STUDENT_BY_ID + id;
  return await getDataMethod(url);
};

export const delClass = async (id) => {
  let url = DEL_CLASS + id;
  return await deleteDataMethod(url);
};
export const addClass = async (payload) => {
  let url = ADD_CLASS;
  return await postDataMethod(url, payload);
};
export const updateClass = async (payload, id) => {
  let url = UPDATE_CLASS + id;
  return await updateDataMethod(url, payload);
};
export const updateClassStatus = async (id, status) => {
  let url = UPDATE_CLASS_STATUS + `${id}?status=${status}`;
  return await updateDataMethod(url);
};
