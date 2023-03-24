import React from "react";

import { ErrorMessage } from "@hookform/error-message";

import "./checkbox.scss";

function CustomCheckBox(props) {
  const { label, errors, name, type } = props;
  return (
    <>
      <div className="flex space-x-4 items-center">
        <input
          id={name}
          {...props}
          className="w-4 h-4 border border-gray-600 text-blue-600 bg-gray-100 rounded cursor-pointer	"
          checked={props.value}
          type={type ? type : "checkbox"}
        />
        <label for={name}>{label}</label>
      </div>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p className="!text-red-600">{message}</p>}
        />
      )}
    </>
  );
}

export default CustomCheckBox;
