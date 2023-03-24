import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import { getSchoolList } from "../../services/schoolServices";

function SchoolModule({ selectedSchools, setselectedSchools }) {
  const [SchoolList, setSchoolList] = useState([]);
  const [selectallSchool, setselectallSchool] = useState(false);

  const {} = useQuery({
    queryKey: ["schooList"],
    queryFn: () => getSchoolList(),
    onSuccess: (res) =>
      setSchoolList(
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

  const handleSelectAllSchool = (status) => {
    if (selectallSchool) {
      setselectedSchools([]);
    } else {
      let result = SchoolList.map((element) => element.value);
      setselectedSchools(result);
    }

    let result = SchoolList.map((element) => {
      return { ...element, selected: status };
    });
    setSchoolList(result);
  };
  const handelSchooolChange = (schoolId) => {
    let school = selectedSchools?.find((id) => id == schoolId);
    let schoolchecked = SchoolList.map((element) => {
      if (element.value == schoolId) {
        return { ...element, selected: !element.selected };
      } else {
        return element;
      }
    });
    setSchoolList(schoolchecked);
    if (school) {
      let result = selectedSchools.filter((id) => id !== schoolId);
      setselectedSchools(result);
    } else {
      setselectedSchools((arg) => [...arg, schoolId]);
    }
  };
  return (
    <div className=" border border-slate-200 p-2 w-[20%]">
      <h2 className="bg-primary_color p-3 mb-2 text-white font-bold rounded-full">
        Schools
      </h2>
      <div>
        <ul>
          <li className=" mt-2 px-4 py-1">
            <CustomCheckBox
              label="Select All"
              value={selectallSchool}
              onChange={(e) => {
                setselectallSchool(e.target.checked);
                handleSelectAllSchool(e.target.checked);
              }}
            />
          </li>
          {SchoolList?.map((school) => {
            return (
              <li className=" mt-2 px-4 py-1">
                <CustomCheckBox
                  label={school.label}
                  value={school.selected}
                  onChange={() => handelSchooolChange(school.value)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SchoolModule;
