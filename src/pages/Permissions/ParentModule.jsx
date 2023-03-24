import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import ActionsCheckBox from "./ActionsCheckBox";

function ParentModule(props) {
  const { obj, setpermissionList, parentId } = props;
  const [classname, setclassname] = useState(false);

  return (
    <>
      <div className=" text-primary_color mt-2 uppercase title flex flex-wrap justify-between">
        <div
          onClick={() => setclassname(!classname)}
          className={`flex items-center	 ${
            obj?.children?.length > 0 ? "cursor-pointer " : ""
          }`}
        >
          {obj?.children?.length > 0 && (
            <FaAngleDown
              size={30}
              className={`flex transition-all	 ${classname ? "rotate-180	" : ""}`}
            />
          )}
          <h3>{obj?.module_name}</h3>
        </div>
        <ActionsCheckBox
          setpermissionList={setpermissionList}
          parentId={parentId}
          currentObject={obj}
        />
      </div>
      <div className={`${classname ? "block" : "hidden"}   px-20`}>
        {obj?.children.map((val, index) => {
          return (
            <ParentModule
              key={index}
              setpermissionList={setpermissionList}
              obj={val}
              parentId={obj?.module_id}
            />
          );
        })}
      </div>
    </>
  );
}

export default ParentModule;
