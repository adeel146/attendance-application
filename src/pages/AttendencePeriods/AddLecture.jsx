import React, { useState } from "react";
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
import { customSpinner } from "../../constants/utilis";
import { convertToUTC } from "../../constants/utilis";
import { getClases } from "../../services/ClassServices";
import { addLecture, getCourses } from "../../services/CourseServices";
import { addPeriod } from "../../services/PeriodServices";
import { getStaffList } from "../../services/StaffServices";

function AddLecture() {
  const navigate = useNavigate();
  const {
    state: { class_Id, id },
    state,
  } = useLocation();
  console.log(state, "state");

  const schema = yup.object().shape({
    course_Id: yup.number().required("Required"),
    teacher_Id: yup.number().required("Required"),
    startTime: yup.string().required("Required"),
    endTime: yup.string().required("Required"),
    days: yup.array().required("Required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const watchEndTime = watch("endTime");

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
  const { mutate: AddLecture, isLoading } = useMutation({
    mutationFn: (data) => addLecture(data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  // console.log(watchEndTime, "watchEndTime");
  // const utcEndTime = new moment(watchEndTime, "HH:mm").utc();
  // console.log(utcEndTime._d, "utcEndTime");

  const handleFormSubmit = (data) => {
    const days = data.days.map((obj) => obj.value);
    let payload = {
      ...data,
      class_Id,
      days,
      period_Id: id,
      startTime: convertToUTC(data.startTime),
      endTime: convertToUTC(data.endTime),
    };
    AddLecture(payload);
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
                      name="days"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Select Day"
                          placeholder="Select Day"
                          list={weekList}
                          isMulti={true}
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

export default AddLecture;
