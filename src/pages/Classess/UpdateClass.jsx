import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import { getAcademicList } from "../../services/acedamicYear";
import {
  addClass,
  getSingleClass,
  updateClass,
} from "../../services/ClassServices";
import { getCourses } from "../../services/CourseServices";
import { getSchoolList } from "../../services/schoolServices";

function UpdateClass() {
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object().shape({});

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const {
    fields,
    append,
    remove,
    errors: fielderrors,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "courses", // unique name for your Field Array
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

  const { data: academicYearList } = useQuery({
    queryKey: ["academicYear"],
    queryFn: () => getAcademicList(),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });
  const { data: coursesList } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });

  const { mutate: update, isLoading } = useMutation({
    mutationFn: (data) => updateClass(data, id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const { isFetching: fetching } = useQuery({
    queryKey: ["getClassById"],
    queryFn: () => getSingleClass(id),
    onSuccess: async (data) => {
      console.log(data, "dataaaaa");
      if (data.success) {
        toast.success(data?.message);
        reset(data.data);
      } else {
        toast.error(data?.message);
      }
    },
    refetchOnWindowFocus: false,
    enabled: id ? true : false,
  });

  const handleformSubmit = (data) => {
    const courseIds = data?.courses?.map((obj) => obj.id);
    update({ ...data, courses: courseIds });
  };

  return (
    <>
      <Toaster />
      <div className="p-10 ">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  pb-20">
          {/* student-form */}
          {isLoading || fetching ? (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          ) : (
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold">{t("classes_information")}</h2>
              <form onSubmit={handleSubmit(handleformSubmit)}>
                <div className=" flex  flex-wrap">
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("class_name")}
                          placeholder={t("classname_placeholder")}
                        />
                      )}
                    />
                  </div>

                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="department"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("department")}
                          placeholder={t("department_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="section"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("section")}
                          placeholder={t("section_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="grade"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("grade")}
                          placeholder={t("grade_placeholder")}
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
                  {/* <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="year_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("acedamic_year")}
                          placeholder={t("acedamic_year_placeholder")}
                          list={academicYearList}
                        />
                      )}
                    />
                  </div> */}
                  <div className="w-[30%] mr-5 mt-11">
                    <Controller
                      control={control}
                      name="active"
                      render={({ field }) => (
                        <CustomCheckBox
                          {...field}
                          errors={errors}
                          label={t("status")}
                        />
                      )}
                    />
                  </div>
                  <h2 className="text-lg font-bold w-full mt-2">Add Courses</h2>
                  <div className=" w-full border p-4 text-primary_color mt-2">
                    <p
                      onClick={() => {
                        append({
                          id: "",
                        });
                      }}
                      className="text-primary_orange capitalize cursor-pointer font-bold mt-2  underline"
                    >
                      {t("add_courses")}
                    </p>
                    {/* <div className=" flex w-full flex-wrap"> */}
                    <div className="w-full mr-5 mt-5">
                      {fields.map((item, index) => {
                        return (
                          <li className="flex" key={item.id}>
                            <div className="w-[30%] mr-5 mt-5">
                              <Controller
                                errors={fielderrors}
                                control={control}
                                name={`courses.${index}.id`}
                                render={({ field }) => (
                                  <ValidationSelect
                                    {...field}
                                    label={t("courses_list")}
                                    placeholder={t("select_course")}
                                    list={coursesList}
                                  />
                                )}
                              />
                              {errors?.courses?.[index]?.id && (
                                <p className="!text-red-600"> Required</p>
                              )}
                            </div>
                            <div className="mt-9">
                              <CommonButton
                                type="button"
                                onClick={() => remove(index)}
                                text={t("delete")}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </div>
                    {/* </div> */}
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
          {/* <div className=" text-primary_color px-[10em] mt-[2em]">
            <h2 className="text-lg font-bold mb-5">Member of Groups</h2>
            <div className="flex justify-between">
              <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer w-max mb-4 hover:text-primary_orange flex items-center text-primary_color font-bold pt-3 text-base"
              >
                <div>
                  <AiFillPlusCircle size={23} />
                </div>
                <div className="pl-3 uppercase text-cm">
                  <h4>add to a group </h4>
                </div>
              </div>
              <p className="text-primary_orange capitalize font-bold  underline">
                see more groups +
              </p>
            </div>
            <div>
              <CustomTable data={data} columns={columns} noPagination />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UpdateClass;
