import React from "react";

import CrossIcon from "../../../assets/icons/CrossIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";

function InputwithIcons({ value, onChange, name, clearInput, placeholder }) {
  return (
    <div className=" relative  capitalize">
      <input
        className="rounded-full pl-14 relative border placeholder:capitalize w-full placeholder:text-sm placeholder:font-normal  h-10 outline-none "
        placeholder={placeholder ? placeholder : "search"}
        value={value}
        name={name}
        onChange={onChange}
      />
      <span className=" flex justify-center items-center	  after:content-['|']  after:text-slate-300 absolute left-4 top-1   mt-1">
        <SearchIcon style={{ width: "25px", paddingRight: "10px" }} />
      </span>
      <span
        onClick={clearInput}
        className="absolute cursor-pointer right-4 top-3 p-[2px] hover:bg-slate-400 rounded-full"
      >
        <CrossIcon />
      </span>
    </div>
  );
}

export default InputwithIcons;
