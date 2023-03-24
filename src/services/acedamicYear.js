import {
  ACEDAMIC_YEAR_BY_ID,
  ADD_ACEDAMIC_LIST,
  DEL_ACEDAMIC_YEAR,
  GET_ACEDAMIC_LIST,
  UPDATE_ACEDAMIC_YEAR,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const addAcademicList = async (props) => {
  let url = ADD_ACEDAMIC_LIST;
  return await postDataMethod(url, props);
};

export const getAcademicList = async (props) => {
  let url = GET_ACEDAMIC_LIST;
  if (!props) {
    url = url;
  } else if (props?.school_id) {
    url = `${url}&school_id=${school_id}`;
  } else {
    const { name, page_size, page_index } = props;
    url = `${url}name=${name}&page_size=${page_size}&page_index=${page_index}`;
  }
  return await getDataMethod(url);
};

export const deleteAcedamicList = async (id) => {
  let url = DEL_ACEDAMIC_YEAR + id;
  return await deleteDataMethod(url);
};

export const updateAcademicList = async (id, props) => {
  let url = UPDATE_ACEDAMIC_YEAR + id;
  return await updateDataMethod(url, props);
};

export const getAcademicSingleList = async (id) => {
  let url = ACEDAMIC_YEAR_BY_ID + id;
  return await getDataMethod(url);
};
