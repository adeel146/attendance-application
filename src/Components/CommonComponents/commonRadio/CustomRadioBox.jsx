import React from "react";
import { Controller, useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";

const CustomRadioBox = ({ control, errors, name, label, options }) => {
  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="text-primary_color capitalize flex space-x-10">
            {options.map((val) => {
              return (
                <div className="flex space-x-4 w-[250px] mt-6">
                  <div>
                    <label className="text-[14px]">{val.label}</label>
                  </div>
                  <div>
                    <input
                      {...field}
                      value={val.value}
                      label={val.label}
                      type="radio"
                      className={` border placeholder:capitalize w-full placeholder:text-sm placeholder:font-normal border-primary_color rounded h-[20px] outline-none placeholder-primary_color_60 pl-2 ml-2`}
                    />
                    {errors && (
                      <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                          <p className="!text-red-600">{message}</p>
                        )}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default CustomRadioBox;
