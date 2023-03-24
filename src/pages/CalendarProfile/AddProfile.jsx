import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { addCalenderList } from "../../services/calenderProfileServices";
import { getClases } from "../../services/ClassServices";
import { getSchoolList } from "../../services/schoolServices";

const schema = yup.object().shape({
  name: yup.string().required(),
  color: yup.string().required(),
  // active: yup.boolean().required(),
});

function AddProfile() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
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

  const { mutate: AddCalenderData, isLoading } = useMutation({
    mutationFn: (data) => {
      return addCalenderList(data);
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
    console.log(formData, "data");
    AddCalenderData(formData);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          {customSpinner()}
        </div>
      ) : (
        <div className="p-10">
          <div className="w-3 mb-2 text-sm">
            <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
          </div>
          <div className=" text-sm border-2  ">
            {/* profile information starting  */}
            {/* <CommonProfile
              UserID="58974598984"
              CreatedAt="9/10/2011"
              CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
            /> */}

            {/* student-form */}
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold capitalize ">
                {t("profile_default")}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" flex  flex-wrap">
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("profile_name")}
                          placeholder={t("enter_profile_name")}
                          onChnage={onchange}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="school_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          list={SchoolList}
                          label="School Name"
                          placeholder="Select School"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[10%] mt-5">
                    <Controller
                      control={control}
                      name="color"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="color"
                          errors={errors}
                          label={t("color")}
                          className="!p-0 cursor-pointer "
                        />
                      )}
                    />
                  </div>
                  <div className="w-[20%] mt-10 flex space-x-4 ml-4 items-center ">
                    <Controller
                      name="active"
                      control={control}
                      errors={errors}
                      render={({ field }) => (
                        <CustomCheckBox
                          {...field}
                          label="Active"
                          error={errors}
                        />
                      )}
                    />
                  </div>
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

export default AddProfile;
