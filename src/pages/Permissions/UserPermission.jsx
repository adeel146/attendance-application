import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineMinus } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { Disclosure } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import InputwithIcons from "../../Components/CommonComponents/CommonInput/InputwithIcons";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import {
  addTermList,
  assignToSchool,
  getYear,
} from "../../services/termServices";

const schema = yup.object().shape({
  name: yup.string().required(),
  school_Id: yup.number().required(),
  year_Id: yup.number().required(),
});
function UserPermission() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setsearchVal] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { data: getByIdData = [] } = useQuery(["yearData"], getYear, {
    select: (res) =>
      res?.data?.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
  });

  const { data: assignToSchoolData = [] } = useQuery(
    ["assignDataSchool"],
    assignToSchool,
    {
      select: (res) =>
        res?.data?.map((val) => {
          return {
            value: val.id,
            label: val.name,
          };
        }),
    }
  );
  const { mutate: addTerm, isLoading } = useMutation({
    mutationFn: (data) => {
      return addTermList(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        // reset(schema.noUnknown().cast());
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

  const AcademicsList = [
    "Test Academics 1",
    "Test Academics 2",
    "Test Academics 3",
    "Test Academics 4",
  ];
  const AttendanceList = [
    "Test Attendance 1",
    "Test Attendance 2",
    "Test Attendance 3",
    "Test Attendance 4",
    "Test Attendance 5",
    "Test Attendance 6",
    "Test Attendance 7",
    "Test Attendance 8",
  ];
  const CoursesList = ["Test Courses 1", "Test Courses 2", "Test Courses 3"];
  return (
    <>
      <AddGroupModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <div className="p-10 ">
        <div className="flex">
          <div className=" border border-slate-200 p-2 w-[30%] mr-2">
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
                        onClick={() => handleUpdate(cell)}
                        size={20}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className=" border border-slate-200 p-2 w-[70%]">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`bg-primary_color_60  p-3 mb-2 text-white  flex items-center font-extrabold	 w-full justify-between rounded-lg px-4  text-left text-sm  hover:bg-primary_orange hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                  >
                    <span>Academics</span>
                    <AiOutlineMinus
                      className={`${
                        open ? "rotate-180 transform " : ""
                      } h-8 w-10 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className=" mt-3 px-4 pb-2">
                    {AttendanceList.map((academy) => {
                      return (
                        <div className="flex justify-between">
                          <div className="w-[30%] mt-2 flex text-white justify-between px-4 py-1 bg-slate-500">
                            <CustomCheckBox label={academy} />
                          </div>
                          <div className="flex">
                            <div className="mr-2">
                              <CustomCheckBox label="Read" />
                            </div>
                            <div className="mr-2">
                              <CustomCheckBox label="Read/Write" />
                            </div>
                            <div className="mr-2">
                              <CustomCheckBox label="Update" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`bg-primary_color_60  p-3 mb-2 text-white  flex items-center font-extrabold	 w-full justify-between rounded-lg px-4  text-left text-sm  hover:bg-primary_orange hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                  >
                    <span>Attendance</span>
                    <AiOutlineMinus
                      className={`${
                        open ? "rotate-180 transform " : ""
                      } h-8 w-10 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className=" mt-3 px-4 pb-2">
                    {AcademicsList.map((academy) => {
                      return (
                        <div className="flex justify-between">
                          <div className="w-[30%] mt-2 flex text-white justify-between px-4 py-1 bg-slate-500">
                            <CustomCheckBox label={academy} />
                          </div>
                          <div className="flex">
                            <div className="mr-2">
                              <CustomCheckBox label="Read" />
                            </div>
                            <div className="mr-2">
                              <CustomCheckBox label="Read/Write" />
                            </div>
                            <div className="mr-2">
                              <CustomCheckBox label="Update" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`bg-primary_color_60  p-3 mb-2 text-white  flex items-center font-extrabold	 w-full justify-between rounded-lg px-4  text-left text-sm  hover:bg-primary_orange hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                  >
                    <span>Courses Module</span>
                    <AiOutlineMinus
                      className={`${
                        open ? "rotate-180 transform " : ""
                      } h-8 w-10 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className=" mt-3 px-4 pb-2">
                    {CoursesList.map((academy) => {
                      return (
                        <div className="flex justify-between">
                          <div className="w-[30%] mt-2 flex text-white justify-between px-4 py-1 bg-slate-500">
                            <CustomCheckBox label={academy} />
                          </div>
                          <div className="flex">
                            <div className="mr-2">
                              <CustomCheckBox label="Read" />
                            </div>
                            <div className="mr-2">
                              <CustomCheckBox label="Read/Write" />
                            </div>
                            <div className="mr-2">
                              <CustomCheckBox label="Update" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default UserPermission;
