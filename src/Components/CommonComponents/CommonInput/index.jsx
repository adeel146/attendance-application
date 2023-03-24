import React from "react";

import { ErrorMessage } from "@hookform/error-message";

function CommonInput(props) {
  const { name, label, errors } = props;
  return (
    <div className="text-primary_color capitalize">
      <h2 className=" font-bold text-sm mb-1">{label}</h2>
      <input
        {...props}
        className={`${props?.className} border placeholder:capitalize w-full placeholder:text-sm placeholder:font-normal border-primary_color rounded h-[37px] outline-none placeholder-primary_color_60 pl-2`}
      />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p className="!text-red-600">{message}</p>}
        />
      )}
    </div>
  );
}

export default CommonInput;
