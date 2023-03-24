import {
  ADD_ACEDAMIC_LIST,
  ADD_CALENDAR,
  ADD_OFF_DAYS,
  CALENDAR_LIST,
  DEL_ACEDAMIC_YEAR,
  GET_ACEDAMIC_LIST,
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
export const addCalendarList = async (props) => {
  let url = ADD_CALENDAR;
  return await postDataMethod(url, props);
};
export const addOffDays = async (payload) => {
  let url = ADD_OFF_DAYS;
  return await postDataMethod(url, payload);
};

export const getCalendarList = async (props) => {
  const { start_date, end_date, schoolId } = props;
  let url =
    CALENDAR_LIST + `${schoolId}?start_date=${start_date}&end_date=${end_date}`;
  return await getDataMethod(url);
};

export const deleteAcedamicList = async (id) => {
  let url = DEL_ACEDAMIC_YEAR + id;
  return await deleteDataMethod(url);
};

// export const updateSchoolList = async (id, props) => {
//   let url = UPDATE_SCHOOL + id;
//   return await updateDataMethod(url, props);
// };

// export const getSchoolListById = async (id) => {
//   let url = GET_SCHOOL_BY_ID + id;
//   return await getDataMethod(url);
// };
