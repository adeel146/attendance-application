import moment from "moment";

import { extensionArr, weekList } from "./constants";

export const customSpinner = () => (
  <div className="flex justify-center h-max" role="status">
    <svg
      aria-hidden="true"
      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary_orange"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const singlevsplural = (length, name) => {
  if (length < 0) {
    return "< 0";
  } else if (length == 0) {
    return name;
  } else if (length > 0) {
    return name + "s";
  } else {
    return "error";
  }
};
export function getBase64Url(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64Url = reader.result.toString().split(",")[1];

      //  convert base64 to base64URL
      // base64Url = base64Url.replace(/\+/g, "-").replace(/\//g, "_");
      resolve(base64Url);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export const getDayfromId = (id) => {
  if (id < 0 || id > 6) {
    return "Invalid Day";
  }
  let obj = weekList.find((obj) => obj.value == id);
  return obj.label;
};

export const getToken = () => localStorage.getItem("token");

export function verifyFileExtension(fileextension) {
  if (extensionArr.includes(fileextension)) {
    return true;
  } else {
    return false;
  }
}

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function convertToUTC(timeString) {
  // Convert the time string to a Date object
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  // Convert the Date object to UTC and return the ISO string
  const utcString = date.toISOString();
  return utcString;
}
export function UTCtoCurrent(timeString) {
  var local_date = moment.utc(timeString).local().format("YYYY-MM-DD HH:mm:ss");
  return local_date;
}
export default function setBodyColor(name, color) {
  document.documentElement.style.setProperty(name, color);
}
