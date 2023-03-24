import {
  ADD_COURSE,
  ADD_GROUP,
  ADD_LECTURE,
  ADD_TERM,
  DEL_TERM,
  DELETE_COURSE,
  DELETE_GROUP,
  GET_COURSE_BY_ID,
  GET_COURSES,
  GET_GROUPS_LIST,
  GET_SCHOOL,
  GET_TERM,
  GET_YEAR,
  GROUP_BY_ID,
  UPDATE_COURSE,
  UPDATE_GROUP,
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

export const getGroupsList = async (props) => {
  let url;
  if (!props) {
    url = GET_GROUPS_LIST;
  } else if (props?.pageSize) {
    const { name, pageSize, pageIndex } = props;
    url =
      GET_GROUPS_LIST +
      `name=${name}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
  }
  return await getDataMethod(url);
};

export const deleteGroup = async (id) => {
  let url = DELETE_GROUP + id;
  return await deleteDataMethod(url);
};

export const addGroup = async (payload) => {
  let url = ADD_GROUP;
  return await postDataMethod(url, payload);
};
export const getCoursebyId = async (id) => {
  let url = GET_COURSE_BY_ID + id;
  return await getDataMethod(url);
};
export const updateCourse = async (body, id) => {
  let url = UPDATE_COURSE + id;
  return await updateDataMethod(url, body);
};
// FOR GROUPS

export const updateGroups = async (id, payload) => {
  let url = UPDATE_GROUP + id;
  return await updateDataMethod(url, payload);
};

//
export const getGroupsById = async (id) => {
  let url = GROUP_BY_ID + id;
  return await getDataMethod(url);
};
