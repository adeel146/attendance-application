import React from "react";

import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";

function ActionsCheckBox(props) {
  const { parentId, currentObject, setpermissionList } = props;

  const changeModuleValue = (arr, index, e) => {
    arr[index]["module_name"] = e.target.checked;
  };

  const handleChange = (e, index) => {
    setpermissionList((prev) => {
      let permissionList = [...prev];
      if (parentId) {
        let PrentObject = permissionList.find(
          (obj) => obj?.module_id == parentId
        );
        let ChildObject = PrentObject?.children?.find(
          (obj) => obj?.module_id == currentObject.module_id
        );
        changeModuleValue(ChildObject?.actions, index, e);
      } else {
        let result = permissionList.find(
          (obj) => obj?.module_id == currentObject.module_id
        );
        changeModuleValue(result?.actions, index, e);
      }
      return permissionList;
    });
  };

  return (
    <div className="flex justify-between ">
      {currentObject?.actions?.map((obj, index) => {
        return (
          <div key={index} className="mr-4">
            <CustomCheckBox
              label={obj.module_key}
              value={obj.module_name}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ActionsCheckBox;
