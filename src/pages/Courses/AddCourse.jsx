import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
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
import {
  createCourse,
  getCoursebyId,
  updateCourse,
} from "../../services/CourseServices";
import { getSchoolList } from "../../services/schoolServices";

const schema = yup.object().shape({
  name: yup.string().required(),
});

function AddCourse() {
  const params = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { active: false },
    resolver: yupResolver(schema),
  });

  const { mutate: AddList, isLoading } = useMutation({
    mutationFn: (data) => createCourse(data),
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

  const { data: schoolListData } = useQuery({
    queryKey: ["schoollist"],
    queryFn: () => getSchoolList(),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });

  if (params["*"]) {
    const {} = useQuery({
      queryKey: ["courseData"],
      queryFn: () => getCoursebyId(params["*"]),
      onSuccess: async (data) => {
        if (data.success) {
          toast.success(data?.message);
          reset(data.data);
        } else {
          toast.error(data?.message);
        }
      },
      refetchOnWindowFocus: false,
    });
  }

  const { mutate: update } = useMutation({
    mutationFn: (data) => updateCourse(data, params["*"]),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const onSubmit = (data) => {
    if (params["*"]) {
      update(data);
    } else {
      AddList(data);
    }
  };

  return (
    <>
      <Toaster />
      <div className="p-10 ">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  pb-20">
          {/* profile information starting  */}

          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          />
          {/* student-form */}
          {isLoading ? (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          ) : (
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold">Course Information</h2>
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
                          label={t("name")}
                          placeholder={t("enter_name_placeholder")}
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
                          label={t("school_name")}
                          placeholder={t("select_school")}
                          list={schoolListData}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5 space-x-3 flex justify-center items-center ">
                    <Controller
                      name="active"
                      control={control}
                      render={({ field }) => (
                        <CustomCheckBox
                          errors={errors}
                          {...field}
                          label={t("active")}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-5 mb-10">
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
          )}
        </div>
      </div>
    </>
  );
}

export default AddCourse;
