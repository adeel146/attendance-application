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
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import {
  DubaiLandlineRegex,
  DubaiPhoneNumberRegex,
  emiratesIdRegex,
  GroupsHeader,
  GuardianList,
} from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { getClases } from "../../services/ClassServices";
import { getParentsList } from "../../services/parentServices";
import { getSchoolList } from "../../services/schoolServices";
import {
  getOperatorList,
  getSingleStudent,
  updateStudent,
} from "../../services/studentServices";

function UpdateStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "params");

  const [GroupsData, setGroupsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState();
  const year_id = localStorage.getItem("academic_Year");

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    // mobile: yup.string().required("Required"),
    // phone: yup.string().matches(DubaiLandlineRegex, "Invalid Phone").required(),
  });

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
    name: "guardians", // unique name for your Field Array
  });

  const operator = watch("operator_Id");
  const school_id = watch("school_Id");

  const { data: parentList } = useQuery({
    queryKey: ["parentList"],
    queryFn: () =>
      getParentsList({
        name: "",
        page_size: 1000,
        page_index: 0,
      }),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.title, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });

  const { data: studentData } = useQuery({
    queryKey: ["studentData"],
    queryFn: () => getSingleStudent(id),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data?.message);
        setGroupsData(data.data.groups);
        setImage(data.data.image);
        let classes = data.data.classes.map((obj) => {
          return {
            label: obj.className,
            value: obj.class_Id,
          };
        });
        reset({ ...data.data, classes });
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

  const { mutate: update, isLoading } = useMutation({
    mutationFn: (data) => updateStudent(data, id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

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

  const { data: classesList } = useQuery({
    queryKey: ["classesList", { school_id }],
    queryFn: () =>
      getClases({
        year_id: year_id,
        school_id: school_id,
      }),
    select: (data) =>
      data?.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    enabled: !!school_id,
    refetchOnWindowFocus: false,
  });

  const handleformSubmit = (data) => {
    const groupIds = GroupsData.map((obj) => obj.id);
    const classes = data?.classes?.map((val) => {
      return val?.value;
    });
    update({ ...data, groups: groupIds, image, classes: classes });
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
          <CommonProfile
            UserID="58974598984"
            checkProfile
            CreatedAt={studentData?.data.createdAt}
            CreatedBy={studentData?.data.createdBy}
            setImage={setImage}
            image={studentData?.data.image?.file_path}
          />

          {/* student-form */}

          {!isLoading ? (
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold">{t("student_default")}</h2>
              <form onSubmit={handleSubmit(handleformSubmit)}>
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
                      name="username"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label={t("username")}
                          placeholder={t("enter_username")}
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
                          label={t("mobile_number")}
                          placeholder={t("mobile_number_placeholder")}
                          type="number"
                        />
                      )}
                    />
                  </div>
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
                  </div> */}
                  {/* <div className="w-[30%] mr-5 mt-5">
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
                          label="Assign Class"
                          placeholder={
                            !school_id ? "Select School First" : "Select Class"
                          }
                          list={classesList}
                          isDisabled={!school_id}
                          isMulti
                        />
                      )}
                    />
                  </div>
                  {/* <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="guardian_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("guardion")}
                          placeholder={t("select_guardion")}
                          list={parentList}
                        />
                      )}
                    />
                  </div> */}
                  {/* <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="relation"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("relation")}
                          placeholder={t("realation_placeholder")}
                          list={GuardianList}
                        />
                      )}
                    />
                  </div> */}
                </div>
                <h2 className="text-lg font-bold mt-2">Guardion List</h2>
                <div className=" border p-4 text-primary_color mt-2">
                  <p
                    onClick={() => {
                      append({
                        guardian_Id: "",
                        relation: "",
                      });
                    }}
                    className="text-primary_orange capitalize cursor-pointer font-bold mt-2  underline"
                  >
                    Add Guardion
                  </p>
                  <div className=" flex w-full flex-wrap">
                    <div className="w-full   mr-5 mt-5">
                      {fields.map((item, index) => {
                        return (
                          <li className="flex" key={item.id}>
                            <div className="w-[30%] mr-5 mt-5">
                              <Controller
                                errors={fielderrors}
                                control={control}
                                name={`guardians.${index}.guardian_Id`}
                                render={({ field }) => (
                                  <ValidationSelect
                                    {...field}
                                    errors={errors}
                                    label={t("guardion")}
                                    placeholder={t("select_guardion")}
                                    list={parentList}
                                  />
                                )}
                              />
                              {errors?.guardians?.[index]?.guardian_Id && (
                                <p className="!text-red-600"> Required</p>
                              )}
                            </div>
                            <div className="w-[30%] mr-5 mt-5">
                              <Controller
                                control={control}
                                errors={fielderrors}
                                name={`guardians.${index}.relation`}
                                render={({ field }) => (
                                  <ValidationSelect
                                    {...field}
                                    list={GuardianList}
                                    label={t("relation")}
                                    placeholder={t("relation_placeholder")}
                                  />
                                )}
                              />
                              {errors?.guardians?.[index]?.relation && (
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
                        <h4>{t("add_group")}</h4>
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
                  <input type="submit" className="hidden" />
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
          ) : (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateStudent;
