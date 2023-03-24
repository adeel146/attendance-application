import React from "react";

import "./button.scss";

import { customSpinner } from "../../../constants/utilis";

function CommonButton(props) {
  const { text, onClick, type, width, className, isLoading } = props;
  return isLoading ? (
    <button
      style={{ width: width ? width : "100%" }}
      className={`main-button ${className}`}
      type="button"
      disabled
    >
      {customSpinner()}
    </button>
  ) : (
    <button
      style={{ width: width ? width : "100%" }}
      className={`main-button ${className}`}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default CommonButton;
