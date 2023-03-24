import {
  ADD_STAFF,
  DEL_PARENT,
  DEL_STUDENT,
  GET_PARENTS_LIST,
  GET_SINGLE_STAFF,
  GET_STAFF_LIST,
  GET_STUDENTS_LIST,
  UPDATE_STAFF,
} from "../constants/apiURLS";
import { GET_OPERATOR_LIST } from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getStaffList = async (props) => {
  let url;
  if (!props) {
    url = GET_STAFF_LIST;
  } else {
    const { name, page_size, page_index, school_id } = props;
    url =
      GET_STAFF_LIST +
      `name=${name}&page_size=${page_size}&page_index=${page_index}`;

    if (school_id) {
      url = `${url}&school_id=${school_id}`;
    }
  }
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
export const addStaff = async (props) => {
  let url = ADD_STAFF;
  return await postDataMethod(url, props);
};

export const delParent = async (id) => {
  let url = DEL_PARENT + id;
  return await deleteDataMethod(url);
};

export const updateStaff = async (id, payload) => {
  let url = UPDATE_STAFF + id;
  return await updateDataMethod(url, payload);
};
