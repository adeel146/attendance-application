import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { weekList } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import { getCalenderList } from "../../services/calenderProfileServices";
import { getClases } from "../../services/ClassServices";
import { addPeriod } from "../../services/PeriodServices";

function PeriodsAdd() {
  const navigate = useNavigate();
  const year_id = localStorage.getItem("academic_Year");

  const schema = yup.object().shape({
    active: yup.boolean().required("Required"),
    classes: yup.array().required("Required"),
    calenderProfile_Id: yup.string().required("Required"),
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  console.log(watch("day"), "day");

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
  const { mutate: createPeriod, isLoading } = useMutation({
    mutationFn: (data) => addPeriod(data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          navigate(-1);
        }, 700);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleFormSubmit = (data) => {
    const classes = data?.classes.map((obj) => obj.value);
    console.log(data);
    let payload = { ...data, classes };
    createPeriod(payload);
  };

  return (
    <>
      <Toaster />
      <div className="p-10">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  ">
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
                      name="classes"
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
                          name="active"
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

export default PeriodsAdd;
