import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";

import InputwithIcons from "../../Components/CommonComponents/CommonInput/InputwithIcons";
import { addTermList } from "../../services/termServices";
import AcademicYearModule from "./AcademicYearModule";
import RolesModule from "./RolesModule";
import SchoolModule from "./SchoolModule";

const schema = yup.object().shape({
  name: yup.string().required(),
  school_Id: yup.number().required(),
  year_Id: yup.number().required(),
});
function UserRoleManagement() {
  const navigate = useNavigate();

  const [searchVal, setsearchVal] = useState("");
  const [selectedUser, setselectedUser] = useState();
  const [academicYearId, setacademicYearId] = useState("");
  const [selectedSchools, setselectedSchools] = useState([]);
  const [selectedRoles, setselectedRoles] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { mutate: addTerm, isLoading } = useMutation({
    mutationFn: (data) => {
      return addTermList(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/Term");
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const onSubmit = (formData) => {
    addTerm(formData);
  };
  const clearInput = () => {
    setsearchVal("");
  };

  const usersList = [
    "Test User 1",
    "Test User 2",
    "Test User 3",
    "Test User 4",
  ];

  const handleSelectUser = (userId) => {
    setselectedUser(userId);
  };

  return (
    <>
      <div className="p-10 ">
        <div className="flex">
          <div className=" border border-slate-200 p-2 w-[25%] mr-2">
            <h2 className="bg-primary_orange p-3 mb-2 text-white font-bold rounded-md">
              Users
            </h2>
            <InputwithIcons
              value={searchVal}
              name={t("seacrh_feild_placeholder")}
              clearInput={clearInput}
              onChange={(e) => setsearchVal(e.target.value)}
            />
            <div>
              <ul>
                {usersList.map((user) => {
                  return (
                    <li className=" mt-2 flex text-white justify-between px-4 py-1 bg-slate-500">
                      <p>{user}</p>
                      <MdArrowForward
                        className=" cursor-pointer mr-2 rounded-full  hover:bg-white hover:text-primary_color "
                        onClick={() => handleSelectUser(user)}
                        size={20}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {selectedUser ? (
            <>
              <AcademicYearModule setacademicYearId={setacademicYearId} />
              <SchoolModule
                selectedSchools={selectedSchools}
                setselectedSchools={setselectedSchools}
              />
              <RolesModule
                setselectedRoles={setselectedRoles}
                selectedRoles={selectedRoles}
              />
            </>
          ) : (
            <div className="text-2xl text-primary_red flex justify-center aign-center m-auto	">
              Select A User
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default UserRoleManagement;
