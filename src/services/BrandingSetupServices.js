import {
  ADD_BRANDING_SETUP,
  DELETE_BRANDING_SETUP,
  GET_BRANDING_SETUP_LIST,
  GET_SINGLE_BRANDING_SETUP,
  GET_SINGLE_BUSINESS,
  UPDATE_BRANDING_SETUP,
} from "../constants/apiURLS";
import {
  deleteDataMethod,
  getDataMethod,
  postDataMethod,
  updateDataMethod,
} from "./NetworkServices";

export const getBrandingSetupList = async (props) => {
  const { name = "", page_size, page_index } = props;
  let url =
    GET_BRANDING_SETUP_LIST +
    `name=${name}&page_size=${page_size}&page_index=${page_index}`;
  return await getDataMethod(url);
};

export const addBrandingSetup = async (payload) => {
  let url = ADD_BRANDING_SETUP;
  return await postDataMethod(url, payload);
};
export const deleteBrandingSetup = async (id) => {
  let url = DELETE_BRANDING_SETUP + id;
  return await deleteDataMethod(url);
};
export const updateBrandingSetup = async (payload) => {
  let url = UPDATE_BRANDING_SETUP;
  return await postDataMethod(url, payload);
};

export const getSingleBrandingSetup = async (id) => {
  let url = GET_SINGLE_BRANDING_SETUP + id;
  return await getDataMethod(url);
};
