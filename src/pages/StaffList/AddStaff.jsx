import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import {
  DubaiLandlineRegex,
  DubaiPhoneNumberRegex,
  emiratesIdRegex,
  GroupsData,
  GroupsHeader,
} from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { getClases } from "../../services/ClassServices";
import { getSchoolList } from "../../services/schoolServices";
import {
  addStaff,
  getStaffById,
  updateStaff,
} from "../../services/StaffServices";
import { getOperatorList } from "../../services/studentServices";

function AddStaff() {
  const navigate = useNavigate();
  const [GroupsData, setGroupsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({});

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    middleName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string().required("Required"),
    phone: yup.string().required(),
    active: yup.boolean().required(),
    password: yup.string().required(),
    username: yup.string().required(),
    title: yup.string().required(),
    // emiratesID: yup
    //   .string()
    //   .matches(emiratesIdRegex, "Invalid Emirates ID")
    //   .required(),
    operator_Id: yup.number().required(),
    gender: yup.number().required(),
    // school_Id: yup.string().required(),
  });

  const params = useParams();
  console.log(params["*"], "params");

  const {
    handleSubmit,
    control,
    reset,
    watch,
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
    name: "schools", // unique name for your Field Array
  });
  const operator = watch("operator_Id");
  const year_id = localStorage.getItem("academic_Year");

  const { data: classesList } = useQuery({
    queryKey: ["classesList"],
    queryFn: () =>
      getClases({
        year_id: year_id,
      }),
    select: (res) =>
      res.data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => addStaff(data),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data?.message);
        reset();
        setTimeout(() => {
          navigate(-1);
        }, 700);
      } else {
        toast.error(data?.message);
      }
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateStaff(params["*"], data),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data?.message);
        reset();
        setTimeout(() => {
          navigate(-1);
        }, 700);
      } else {
        toast.error(data?.message);
      }
    },
  });

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

  if (params["*"]) {
    const {} = useQuery({
      queryKey: ["getStaffById"],
      queryFn: () => getStaffById(params["*"]),
      onSuccess: async (data) => {
        console.log(data, "dataaaaa");
        if (data.success) {
          toast.success(data?.message);
          setGroupsData(data.data.groups);
          reset(data.data);
        } else {
          toast.error(data?.message);
        }
      },
      select: (res) => {
        return {
          ...res,
          data: {
            ...res.data,
            emiratesExpiry: res.data.emiratesExpiry.slice(0, 10),
          },
        };
      },
      refetchOnWindowFocus: false,
    });
  }
  const { data: schoolListData } = useQuery({
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

  const submitForm = (data) => {
    const groupIds = GroupsData.map((obj) => obj.id);
    if (params["*"]) {
      update({ ...data, groups: groupIds });
    } else {
      mutate({ ...data, groups: groupIds, image });
    }
  };
  const handleGroupSubmit = (group) => {
    setGroupsData((prev) => [...prev, group]);
  };

  const data = React.useMemo(() => GroupsData, [GroupsData]);
  const columns = React.useMemo(GroupsHeader, []);
  return (
    <>
      <Toaster />
      {isOpen && (
        <AddGroupModal
          handleSubmit={handleGroupSubmit}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      )}
      <div className="p-10">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  ">
          {/* profile information starting  */}

          <CommonProfile setImage={setImage} checkProfile />
          {/* student-form */}
          <div className=" text-primary_color px-[10em] mt-[2em]">
            <h2 className="text-lg font-bold">
              {t("staff_default_information")}
            </h2>
            {isLoading || isUpdating ? (
              <div className="h-[50vh] flex justify-center items-center">
                {customSpinner()}
              </div>
            ) : (
              <form onSubmit={handleSubmit(submitForm)}>
                <div className=" flex  flex-wrap">
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("first_name")}
                          placeholder={t("first_name_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="middleName"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("middle_name")}
                          placeholder={t("middle_name_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="lastName"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("last_name")}
                          placeholder={t("last_name_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="title"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("title")}
                          placeholder={t("title_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("email")}
                          placeholder={t("email_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("password")}
                          placeholder={t("pasword_placeholder")}
                          type="password"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("phone")}
                          placeholder={t("phone_placeholder")}
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="mobile"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("mobile")}
                          placeholder={t("mobile_number_placeholder")}
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="active"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("status")}
                          placeholder={t("status_placeholder")}
                          list={[
                            { label: "Active", value: true },
                            { label: "InActive", value: false },
                          ]}
                        />
                      )}
                    />
                  </div>

                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("username")}
                          placeholder={t("username_placeholder")}
                        />
                      )}
                    />
                  </div>

                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="operator_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("operator")}
                          placeholder={t("select_operator")}
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
                        />
                      )}
                    />
                  </div>
                  {/* <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="emiratesID"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("emirates_id")}
                          placeholder={t("emirates_id_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="emiratesExpiry"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("emirateExpirey")}
                          placeholder={t("emirateExpirey_placeholder")}
                          type="date"
                        />
                      )}
                    />
                  </div> */}
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("gender")}
                          placeholder={t("gender_placeholder")}
                          list={[
                            { label: "Male", value: 1 },
                            { label: "FeMale", value: 2 },
                          ]}
                        />
                      )}
                    />
                  </div>

                  {/* <div className="w-[30%] mr-5 mt-12 space-x-3">
                    <Controller
                      name="active"
                      control={control}
                      render={({ field }) => (
                        <CustomCheckBox
                          error={errors}
                          {...field}
                          label="Active"
                        />
                      )}
                    />
                  </div> */}
                </div>
                <div>
                  <h2 className="text-lg font-bold mt-2">Assign Classes</h2>
                  <div className=" border p-4 text-primary_color mt-2">
                    <p
                      onClick={() => {
                        append({
                          child_Id: "",
                          relation: "",
                        });
                      }}
                      className="text-primary_orange capitalize cursor-pointer font-bold mt-2  underline"
                    >
                      Add Class
                    </p>
                    <div className=" flex w-full flex-wrap">
                      <div className="w-full   mr-5 mt-5">
                        {fields.map((item, index) => {
                          return (
                            <div className="flex" key={item.id}>
                              <div className="w-[30%] mr-5 mt-5">
                                <Controller
                                  control={control}
                                  errors={fielderrors}
                                  name={`classes.${index}.class`}
                                  render={({ field }) => (
                                    <ValidationSelect
                                      {...field}
                                      list={classesList}
                                      label="Class Name"
                                      placeholder="Select Class"
                                    />
                                  )}
                                />
                                {errors?.classes?.[index]?.class && (
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" text-primary_color mt-[7em]">
                  <h2 className="text-lg font-bold mb-5">{t("member")}</h2>
                  <div className="flex justify-between">
                    <div
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer w-max mb-4 hover:text-primary_orange flex items-center text-primary_color font-bold pt-3 text-base"
                    >
                      <div>
                        <AiFillPlusCircle size={23} />
                      </div>
                      <div className="pl-3 uppercase text-cm">
                        <h4>{t("add_group")} </h4>
                      </div>
                    </div>
                    <p className="text-primary_orange capitalize font-bold  underline">
                      {/* see more groups + */}
                      {t("more_member")}
                    </p>
                  </div>
                  <div>
                    <CustomTable data={data} columns={columns} noPagination />
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStaff;
