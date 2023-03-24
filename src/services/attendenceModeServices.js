import {
  ADD_ATTENDENCE_MODE,
  ADD_SCHOOL_LIST,
  DEL_SCHOOL,
  GET_ATTENDENCE_MODE_BY_ID,
  GET_SCHOOL_BY_ID,
  GET_SCHOOL_LIST,
  UPDATE_SCHOOL,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const addAttendenceModeList = async (props) => {
  let url = ADD_ATTENDENCE_MODE;
  return await postDataMethod(url, props);
};

// export const getSchoolList = async (props) => {
//   let url;
//   if (props?.page_size) {
//     const { name, page_size, page_index } = props;
//     url =
//       GET_SCHOOL_LIST +
//       `name=${name}&page_size=${page_size}&page_index=${page_index}`;
//   } else if (props?.operator_id) {
//     const { operator_id } = props;
//     url = `${GET_SCHOOL_LIST}&operator_id=${operator_id}`;
//   } else {
//     url = GET_SCHOOL_LIST;
//   }

//   return await getDataMethod(url);
// };

// export const deleteSchool = async (id) => {
//   let url = DEL_SCHOOL + id;
//   return await deleteDataMethod(url);
// };

//   export const updateSchoolList = async (id, props) => {
//     let url = UPDATE_SCHOOL + id;
//     return await updateDataMethod(url, props);
//   };

export const getSchoolListById = async (id) => {
  let url = GET_SCHOOL_BY_ID + id;
  return await getDataMethod(url);
};

export const getAcademicSingleList = async (id) => {
  let url = GET_ATTENDENCE_MODE_BY_ID + id;
  return await getDataMethod(url);
};
