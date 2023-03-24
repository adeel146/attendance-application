import {
  ADD_DEVICE_ENROLL,
  DELETE_DEVICE_ENROLL,
  ENROLL_DEVICE,
  GET_DEVICE_ENROLL,
  GET_DEVICE_ENROLL_BY_ID,
  GET_ENROLLED_DEVICE_LIST,
  REMOVE_DEVICE_FROM_CLASS,
  UPDATE_DEVICE_ENROLL,
} from "../constants/apiURLS";
import { GET_OPERATOR_LIST } from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getDeviceList = async (props) => {
  let url;
  if (props?.page_size) {
    const { page_size, page_index } = props;
    url = GET_DEVICE_ENROLL + `page_size=${page_size}&page_index=${page_index}`;
  } else {
    url = GET_DEVICE_ENROLL;
  }
  return await getDataMethod(url);
};
export const getAssignedDevicesList = async (props) => {
  let url;
  if (props?.page_size) {
    const { page_size, page_index } = props;
    url =
      GET_ENROLLED_DEVICE_LIST +
      `page_size=${page_size}&page_index=${page_index}`;
  } else {
    url = GET_ENROLLED_DEVICE_LIST;
  }
  return await getDataMethod(url);
};

export const addDevice = async (payload) => {
  let url = ADD_DEVICE_ENROLL;
  return await postDataMethod(url, payload);
};
export const enrollDevice = async (classId, model) => {
  let url = ENROLL_DEVICE + `${classId}?model=${model}`;
  return await postDataMethod(url);
};

export const deleteDevice = async (id) => {
  let url = DELETE_DEVICE_ENROLL + id;
  return await deleteDataMethod(url);
};
export const removeEnrolledDevice = async (id, class_id) => {
  let url = REMOVE_DEVICE_FROM_CLASS + `${id}?class_id=${class_id}`;
  return await deleteDataMethod(url);
};

export const updateDevice = async (id, payload) => {
  let url = UPDATE_DEVICE_ENROLL + id;
  return await updateDataMethod(url, payload);
};

export const getDeviceById = async (id) => {
  let url = GET_DEVICE_ENROLL_BY_ID + id;
  return await getDataMethod(url);
};
