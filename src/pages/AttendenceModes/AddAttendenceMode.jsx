import React, { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomRadioBox from "../../Components/CommonComponents/commonRadio/CustomRadioBox";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { addAttendenceModeList } from "../../services/attendenceModeServices";
import { addCalenderList } from "../../services/calenderProfileServices";
import { getClases } from "../../services/ClassServices";
import { getSchoolList } from "../../services/schoolServices";

const schema = yup.object().shape({
  id: yup.number().required(),
  applicationMode: yup.number().required(),
  attendenceMode: yup.number().required(),
});

function AddAttendenceMode() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { data: SchoolList } = useQuery({
    queryKey: ["getSchoolList"],
    queryFn: getSchoolList,
    select: (res) =>
      res.data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
    refetchOnWindowFocus: false,
  });

  const { mutate: AddModeList, isLoading } = useMutation({
    mutationFn: (data) => {
      return addAttendenceModeList(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const onSubmit = (formData) => {
    localStorage.setItem("attendenceModeId", formData?.id);
    AddModeList(formData);
  };

  const applicationModes = [
    {
      label: "Live Mode",
      value: 1,
    },

    {
      label: "Kiosk Mode",
      value: 2,
    },
  ];

  const attendenceModes = [
    {
      label: "Period by Period",
      value: 1,
    },

    {
      label: "One-time attendance/day",
      value: 2,
    },
    {
      label: "  2-time attendance/day",
      value: 3,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          {customSpinner()}
        </div>
      ) : (
        <div className="p-10 py-[5rem]">
          <div className="w-3 mb-2 text-sm">
            <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
          </div>
          <div className=" text-sm border-2  ">
            {/* profile information starting  */}

            {/* student-form */}
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold capitalize ">
                Attendence Application Modes
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" flex  flex-wrap  mt-2">
                  <div className="">
                    <CustomRadioBox
                      name="applicationMode"
                      control={control}
                      errors={errors}
                      options={applicationModes}
                    />
                  </div>
                </div>
                <h2 className="text-lg font-bold capitalize pt-10">
                  Attendence Periods Modes
                </h2>
                <div className="flex space-x-5">
                  <div>
                    <CustomRadioBox
                      name="attendenceMode"
                      control={control}
                      errors={errors}
                      options={attendenceModes}
                    />
                  </div>
                </div>
                <div className="w-[30%] mr-5 mt-10">
                  <Controller
                    control={control}
                    name="id"
                    render={({ field }) => (
                      <ValidationSelect
                        {...field}
                        errors={errors}
                        label={t("assign_school")}
                        placeholder={t("assign_school_placeholder")}
                        list={SchoolList}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-end my-10">
                  <CommonButton
                    onClick={() => navigate(-1)}
                    className="mr-2"
                    text={t("cancel")}
                    width="10%"
                  />
                  <CommonButton type="submit" text={t("save")} width="10%" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default AddAttendenceMode;
