import {
  ADD_STUDENT,
  DEL_STUDENT,
  GET_STUDENT_BY_ID,
  GET_STUDENTS_LIST,
  UPDATE_STUDENT,
} from "../constants/apiURLS";
import { GET_OPERATOR_LIST } from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getStudentsList = async (props) => {
  let url;
  if (props?.page_size) {
    const { name, page_size, page_index, school_id = "" } = props;
    url =
      GET_STUDENTS_LIST +
      `name=${name}&page_size=${page_size}&page_index=${page_index}&school_id=${school_id}`;
  } else if (props?.operator_id) {
    const { operator_id } = props;
    url = `${GET_STUDENTS_LIST}&operator_id=${operator_id}`;
  } else {
    url = GET_STUDENTS_LIST;
  }
  return await getDataMethod(url);
};
export const getSingleStudent = async (id) => {
  let url = GET_STUDENT_BY_ID + id;
  return await getDataMethod(url);
};

export const getOperatorList = async (props) => {
  let url = GET_OPERATOR_LIST;

  return await getDataMethod(url);
};

export const delStudent = async (id) => {
  let url = DEL_STUDENT + id;
  return await deleteDataMethod(url);
};
export const addStudent = async (payload) => {
  let url = ADD_STUDENT;
  return await postDataMethod(url, payload);
};
export const updateStudent = async (payload, id) => {
  let url = UPDATE_STUDENT + id;
  return await updateDataMethod(url, payload);
};
