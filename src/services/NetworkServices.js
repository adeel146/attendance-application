import axios from "axios";

import { BASE_URL } from "../constants/apiURLS";
const getDataMethod = async (key) => {
  try {
    let result = await axios.get(BASE_URL + key);
    return result?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const postDataMethod = async (key, payload) => {
  try {
    let result = await axios.post(BASE_URL + key, payload);
    return result?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const deleteDataMethod = async (key) => {
  try {
    let result = await axios.delete(BASE_URL + key);
    return result?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const updateDataMethod = async (key, payload) => {
  try {
    let result = await axios.put(BASE_URL + key, payload);
    return result?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export { deleteDataMethod, getDataMethod, postDataMethod, updateDataMethod };
