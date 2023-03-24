import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router";

function AddNewButton(props) {
  const { navigate: target, text } = props;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(target)}
      className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
    >
      <div>
        <AiFillPlusCircle size={23} />
      </div>
      <div className="pl-3 uppercase text-xs">
        <h4>{text}</h4>
      </div>
    </div>
  );
}

export default AddNewButton;
