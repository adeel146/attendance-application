import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import { getRoles } from "../../services/RolesServices";

function RolesModule({ selectedRoles, setselectedRoles }) {
  const [rolesList, setrolesList] = useState([]);
  const [selectallRole, setselectallRole] = useState(false);

  const {} = useQuery({
    queryKey: ["Roleslist"],
    queryFn: () => getRoles(),
    onSuccess: (res) =>
      setrolesList(
        res.data.map((val) => {
          return {
            value: val.id,
            label: val.name,
            selected: false,
          };
        })
      ),
    refetchOnWindowFocus: false,
  });
  const handleSelectAllRoles = (status) => {
    if (selectallRole) {
      setselectedRoles([]);
    } else {
      let result = rolesList.map((element) => element.value);
      setselectedRoles(result);
    }
    let result = rolesList.map((element) => {
      return { ...element, selected: status };
    });
    setrolesList(result);
  };

  const handelRoleChange = (roleId) => {
    let role = selectedRoles?.find((id) => id == roleId);
    let rolechecked = rolesList.map((element) => {
      if (element.value == roleId) {
        return { ...element, selected: !element.selected };
      } else {
        return element;
      }
    });
    setrolesList(rolechecked);
    if (role) {
      let result = selectedRoles.filter((id) => id !== roleId);
      setselectedRoles(result);
    } else {
      setselectedRoles((arg) => [...arg, roleId]);
    }
  };

  return (
    <div className=" border border-slate-200 p-2 w-[30%]">
      <h2 className="bg-primary_color p-3 mb-2 text-white font-bold rounded-full">
        Roles
      </h2>
      <div>
        <ul>
          <li className=" mt-2 px-4 py-1">
            <CustomCheckBox
              label="Select All"
              value={selectallRole}
              onChange={(e) => {
                setselectallRole(e.target.checked);
                handleSelectAllRoles(e.target.checked);
              }}
            />
          </li>
          {rolesList?.map((role) => {
            return (
              <li className=" mt-2 px-4 py-1">
                <CustomCheckBox
                  label={role.label}
                  value={role.selected}
                  onChange={() => handelRoleChange(role.value)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default RolesModule;
