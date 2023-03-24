import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getAcademicList } from "../../services/acedamicYear";

function AcademicYearModule({ setacademicYearId }) {
  const { data: academicList } = useQuery({
    queryKey: ["AcademicList"],
    queryFn: () => getAcademicList(),
    select: (res) =>
      res?.data?.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <div className=" border border-slate-200 p-2 w-[15%]">
      <h2 className="bg-primary_color p-3 mb-2 text-white font-bold rounded-full">
        Academic Year
      </h2>
      <div>
        <ul>
          {academicList?.map((obj) => {
            return (
              <li className=" mt-2 px-4 py-1">
                <input
                  className="lg w-4 h-4"
                  name="academic_year"
                  type="radio"
                  onChange={() => setacademicYearId(obj.value)}
                />
                <label className="ml-2">{obj.label}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AcademicYearModule;
