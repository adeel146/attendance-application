import {
  ADD_COURSE,
  ADD_LECTURE,
  ADD_TERM,
  DEL_TERM,
  DELETE_COURSE,
  DELETE_LECTURE,
  GET_COURSE_BY_ID,
  GET_COURSES,
  GET_SCHOOL,
  GET_TERM,
  GET_YEAR,
  UPDATE_COURSE,
  UPDATE_COURSE_STATUS,
  UPDATE_LECTURE,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const createCourse = async (props) => {
  let url = ADD_COURSE;
  return await postDataMethod(url, props);
};

export const getCourses = async (props) => {
  let url;
  if (!props) {
    url = GET_COURSES;
  } else if (props.page_size) {
    const { name, page_size, page_index } = props;
    url =
      GET_COURSES +
      `name=${name}&page_size=${page_size}&page_index=${page_index}`;
  } else if (props.school_id) {
    url = `${GET_COURSES}&school_id=${props.school_id}`;
  } else if (props.class_id) {
    url = `${GET_COURSES}&class_id=${props.class_id}`;
  }
  return await getDataMethod(url);
};
export const getCoursebyId = async (id) => {
  let url = GET_COURSE_BY_ID + id;
  return await getDataMethod(url);
};

export const deleteCourse = async (id) => {
  let url = DELETE_COURSE + id;
  return await deleteDataMethod(url);
};
export const deleteLecture = async (id) => {
  let url = DELETE_LECTURE + id;
  return await deleteDataMethod(url);
};
export const updateCourse = async (body, id) => {
  let url = UPDATE_COURSE + id;
  return await updateDataMethod(url, body);
};

export const addLecture = async (payload) => {
  let url = ADD_LECTURE;
  return await postDataMethod(url, payload);
};

export const updateLecture = async (id, payload) => {
  let url = UPDATE_LECTURE + id;
  return await updateDataMethod(url, payload);
};
export const updateStatusCourse = async (id, status) => {
  let url = UPDATE_COURSE_STATUS + `${id}?status=${status}`;
  return await updateDataMethod(url);
};
