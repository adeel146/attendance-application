import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Select, { components } from "react-select";

import { ErrorMessage } from "@hookform/error-message";

function ValidationSelect(props) {
  const { list, value, placeholder, width, label, name, errors } = props;
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <AiFillCaretDown color="pink" />
      </components.DropdownIndicator>
    );
  };

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--parentColor");
  const parentOrange60 = rootStyles.getPropertyValue("--parentOrange60");

  const style = {
    control: (base) => ({
      ...base,
      border: `1px solid ${parentOrange60}`,
      boxShadow: "none",
      cursor: "pointer",
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        cursor: "pointer",
        color: "black",

        ":active": {
          ...styles[":active"],
          backgroundColor: `${parentOrange60}`,
        },
        ":hover": {
          ...styles[":hover"],
          backgroundColor: `${parentOrange60}`,
        },
        ":focus": {
          ...styles[":focus"],
          backgroundColor: `${parentOrange60}`,
        },
      };
    },
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .5s ease",
      transform: state.isFocused ? "rotate(180deg)" : null,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: ` ${primaryColor} `,
      };
    },
    options: (styles) => ({ ...styles, border: `1px solid ${primaryColor} ` }),
    value: (styles) => ({ ...styles, color: ` ${primaryColor} ` }),
  };

  const obj = list?.find(({ value }) => value == props.value);
  return (
    <div className="dropdown-container">
      <p>{label}</p>
      <div style={{ width: `${width ? width : "100%"}` }}>
        <Select
          {...props}
          className="basic-single"
          classNamePrefix="select"
          defaultValue={obj}
          value={props?.isMulti ? value : obj}
          placeholder={placeholder}
          onChange={(e) => {
            console.log(e, "e");
            props?.isMulti ? props.onChange(e) : props.onChange(e.value);
          }}
          components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          styles={style}
          options={list}
        />
        {errors && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className="!text-red-600">{message}</p>}
          />
        )}
      </div>
    </div>
  );
}

export default ValidationSelect;
