import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { weekList } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import { getCalenderList } from "../../services/calenderProfileServices";
import { getClases } from "../../services/ClassServices";
import { updatePeriod } from "../../services/PeriodServices";

function UpdatePeriods() {
  const navigate = useNavigate();
  const location = useLocation();
  const year_id = localStorage.getItem("academic_Year");

  const schema = yup.object().shape({
    class_Id: yup.array().required("Required"),
    calenderProfile_Id: yup.string().required("Required"),
    active: yup.boolean().required("Required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { data: CalenderProfileList } = useQuery({
    queryKey: ["getCalenderList"],
    queryFn: getCalenderList,
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });
  const { data: ClasesList } = useQuery({
    queryKey: ["getClases"],
    queryFn: () => getClases({ year_id: year_id }),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });

  console.log(ClasesList, "ClasesList");

  const { mutate: handleupdatePeriod, isLoading } = useMutation({
    mutationFn: (data) => updatePeriod(location.state.id, data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  console.log(location.state, "statee");

  useEffect(() => {
    reset(location.state);
  }, []);

  const handleFormSubmit = (data) => {
    console.log(data, "Data");
    const body = {
      calenderProfile_Id: data.calenderProfile_Id,
      active: data.active,
      classes: data?.class_Id?.map((val) => {
        return val?.value;
      }),

      // should be classes there
    };
    handleupdatePeriod(body);
  };
  return (
    <>
      <Toaster />
      <div className="p-10">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  ">
          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          />

          <div className=" text-primary_color px-[10em] my-[7em]">
            <h2 className="text-lg font-bold">Periods Information</h2>
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
                      name="calenderProfile_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Select CalenderProfile"
                          placeholder="Select..."
                          list={CalenderProfileList}
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
                          label="Select Class"
                          placeholder="Select..."
                          list={ClasesList}
                          isMulti
                        />
                      )}
                    />
                  </div>
                  <div className="w-[15%] flex justify-end mt-auto mr-5">
                    <Controller
                      control={control}
                      name="active"
                      render={({ field }) => (
                        <CustomCheckBox
                          {...field}
                          errors={errors}
                          label="Active"
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

export default UpdatePeriods;
