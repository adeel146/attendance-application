import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import { getClases } from "../../services/ClassServices";
import {
  enrollDevice,
  getDeviceList,
} from "../../services/DeviceEnrollmentServices";
import { getSchoolList } from "../../services/schoolServices";
import { getOperatorList } from "../../services/studentServices";

const schema = yup.object().shape({
  deviceType: yup.array().required(),
  school_Id: yup.number().required(),
});
function DeviceAssignAdd() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const operator = watch("operator_Id");
  const school_id = watch("school_Id");
  const classId = watch("class_Id");

  const { data: OperatorData = [] } = useQuery(
    ["operatorData"],
    getOperatorList,
    {
      select: (res) =>
        res.data.map((val) => {
          return {
            value: val.id,
            label: val.name,
          };
        }),
      refetchOnWindowFocus: false,
    }
  );

  const { data: schoolListData, isFetching: isloadingSchools } = useQuery({
    queryKey: ["schoollist", { operator }],
    queryFn: () =>
      getSchoolList({
        operator_id: operator,
      }),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
    enabled: !!operator,
  });

  const { data: classesList, isFetching: isClassesLoading } = useQuery({
    queryKey: ["classesList", { school_id }],
    queryFn: () =>
      getClases({
        school_id: school_id,
      }),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    enabled: !!school_id,
    refetchOnWindowFocus: false,
  });

  const { mutate: handelEnrollmentDevice, isLoading } = useMutation({
    mutationFn: (data) => {
      return enrollDevice(classId, data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const { data: deviceData } = useQuery({
    queryKey: ["getDeviceList"],
    queryFn: () => getDeviceList(),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
  });
  const onSubmit = (data) => {
    let model = data.deviceType.map((obj) => obj.value);
    console.log(model);
    handelEnrollmentDevice(model);
  };

  return (
    <>
      <div className="p-10 ">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  pb-20">
          {/* profile information starting  */}
          {/* 
          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          /> */}
          {/* student-form */}
          {isLoading ? (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          ) : (
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold">
                Device Assignment Information
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" flex  flex-wrap">
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="operator_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("operator_name")}
                          placeholder={t("operator_name_placeholder")}
                          list={OperatorData}
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
                          label={t("district_school")}
                          placeholder={
                            !operator
                              ? "Select Operator First"
                              : "Select School"
                          }
                          list={schoolListData}
                          isDisabled={!operator}
                          isLoading={isloadingSchools}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="class_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Assign Class"
                          placeholder={
                            !school_id ? "Select School First" : "Select Class"
                          }
                          list={classesList}
                          isDisabled={!school_id}
                          isLoading={isClassesLoading}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="deviceType"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Device Type"
                          placeholder="Select Device Type"
                          list={deviceData}
                          isMulti={true}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10 ">
                  <CommonButton
                    onClick={() => navigate(-1)}
                    className="mr-2"
                    text={t("cancel")}
                    width="10%"
                  />
                  <CommonButton type="submit" text={t("add")} width="10%" />
                </div>{" "}
              </form>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default DeviceAssignAdd;
