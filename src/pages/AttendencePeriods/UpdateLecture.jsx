import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import moment from "moment";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { weekList } from "../../constants/constants";
import { customSpinner, UTCtoCurrent } from "../../constants/utilis";
import { convertToUTC } from "../../constants/utilis";
import { getClases } from "../../services/ClassServices";
import {
  addLecture,
  getCourses,
  updateLecture,
} from "../../services/CourseServices";
import { addPeriod } from "../../services/PeriodServices";
import { getStaffList } from "../../services/StaffServices";

function UpdateLecture() {
  const navigate = useNavigate();
  const {
    state: { data: previousData, class_Id },
  } = useLocation();
  console.log(previousData, "previousData");

  const schema = yup.object().shape({
    course_Id: yup.number().required("Required"),
    teacher_Id: yup.number().required("Required"),
    startTime: yup.string().required("Required"),
    endTime: yup.string().required("Required"),
    day: yup.number().required("Required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(previousData);
    console.log(
      previousData.startDate.slice(11, 18),
      "previousData.startDate.slice(11, 18)"
    );

    setValue("startTime", UTCtoCurrent(previousData.startDate).slice(11, 16));
    setValue("endTime", UTCtoCurrent(previousData.endDate).slice(11, 16));
  }, []);

  const { data: coursesList } = useQuery({
    queryKey: ["getCourses"],
    queryFn: () => getCourses({ class_id: class_Id }),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });

  const { data: StaffList } = useQuery({
    queryKey: ["getStaffList"],
    queryFn: () => getStaffList(),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.firstName + " " + obj.lastName, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });
  const { mutate: handleUpdateLecture, isLoading } = useMutation({
    mutationFn: (data) => updateLecture(previousData.id, data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleFormSubmit = (data) => {
    let payload = {
      teacher_Id: data.teacher_Id,
      period_Id: data.period_Id,
      day: data.day,
      startTime: convertToUTC(data.startTime),
      endTime: convertToUTC(data.endTime),
    };
    handleUpdateLecture(payload);
  };

  return (
    <>
      <Toaster />
      <div className="p-10">
        <div className="mb-2 flex">
          <div className="w-30 mr-5  text-sm">
            <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
          </div>
          <div className="w-3  text-sm">
            <CommonButton text={"Periods"} onClick={() => navigate(-2)} />
          </div>
        </div>
        <div className=" text-sm border-2  ">
          {/* <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          /> */}

          <div className=" text-primary_color px-[10em] my-[7em]">
            <h2 className="text-lg font-bold">Lecture Information</h2>
            {isLoading ? (
              <div className="h-[50vh] flex justify-center items-center">
                {customSpinner()}
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className=" flex  flex-wrap">
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="course_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          isDisabled={true}
                          {...field}
                          errors={errors}
                          label="Select Course"
                          placeholder="Select..."
                          list={coursesList}
                        />
                      )}
                    />
                  </div>

                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="teacher_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          isDisabled={true}
                          errors={errors}
                          label="Select Teacher"
                          placeholder="Select..."
                          list={StaffList}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      isDisabled={true}
                      name="day"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Select Day"
                          placeholder="Select Day"
                          list={weekList}
                          isDisabled={true}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[15%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="startTime"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="Start Time"
                          placeholder="Enter Start Time"
                          type="time"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[15%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="endTime"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="End Time"
                          placeholder="Enter End Time"
                          type="time"
                        />
                      )}
                    />
                  </div>
                </div>
                <input className="hidden" type="submit" />
                <div className="flex justify-end mt-5 mb-10">
                  <CommonButton
                    onClick={() => navigate(-1)}
                    className="mr-2"
                    text="Cancel"
                    width="10%"
                  />
                  <CommonButton type="submit" text="save" width="10%" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateLecture;
