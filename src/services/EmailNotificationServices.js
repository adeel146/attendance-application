import {
  ADD_EMAIL_NOTIFICATION,
  DELETE_EMAIL_NOTIFICATION,
  GET_EMAIL_NOTIFICATION,
  GET_EMAIL_NOTIFICATION_ID,
  UPDATE_EMAIL_NOTIFICATION,
  UPDATE_EMAIL_NOTIFICATION_STATUS,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

//   export const createCourse = async (props) => {
//     let url = ADD_COURSE;
//     return await postDataMethod(url, props);
//   };

export const getNotification = async (props) => {
  const { page_size, page_index } = props;
  let url =
    GET_EMAIL_NOTIFICATION + `?page_size=${page_size}&page_index=${page_index}`;
  return await getDataMethod(url);
};

export const getNotificationById = async (id) => {
  let url = GET_EMAIL_NOTIFICATION_ID + id;
  return await getDataMethod(url);
};

export const deleteNotification = async (id) => {
  let url = DELETE_EMAIL_NOTIFICATION + id;
  return await deleteDataMethod(url);
};
export const updateNotification = async (id, body) => {
  let url = UPDATE_EMAIL_NOTIFICATION + id;
  return await updateDataMethod(url, body);
};

export const addNotification = async (payload) => {
  let url = ADD_EMAIL_NOTIFICATION;
  return await postDataMethod(url, payload);
};

export const updateNotificationStatus = async (id, status) => {
  let url = UPDATE_EMAIL_NOTIFICATION_STATUS + `${id}?status=${status}`;
  return await updateDataMethod(url);
};
