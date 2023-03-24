import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import { GroupsData, GroupsHeader } from "../../constants/constants";
import AddGroupModal from "../../Modals/AddGroupModal";

function UpdateUserList() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const data = React.useMemo(GroupsData, []);
  const columns = React.useMemo(GroupsHeader, []);

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    contactName: yup.string().required(),
    phoneNumber: yup.string().required(),
    assignedAdmins: yup.object().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { fieldName: "" },
    resolver: yupResolver(schema),
  });

  return (
    <>
      {/* <AddGroupModal isOpen={isOpen} handleClose={() => setIsOpen(false)} /> */}
      <div className="p-10 ">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text="Go BAck" onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  pb-20">
          {/* profile information starting  */}

          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          />
          {/* student-form */}
          <div className=" text-primary_color px-[10em] mt-[2em]">
            <h2 className="text-lg font-bold">Users List Information</h2>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div className=" flex  flex-wrap">
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="first_name"
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
                    name="middle_name"
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
                    name="last_name"
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
                    name="full_name"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("full_name")}
                        placeholder={t("full_name_placeholder")}
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
                    name="district_name"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("district_name")}
                        placeholder={t("district_placeholder")}
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
                    name="school_name"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("school_name")}
                        placeholder={t("school_name_placeholder")}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="school_code"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("school_code")}
                        placeholder={t("school_code_placeholder")}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="phone_Number"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("phone_number")}
                        placeholder={t("phone_placeholder")}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="mobile_number"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("mobile_number")}
                        placeholder={t("mobile_number_placeholder")}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="user_id"
                    render={({ field }) => (
                      <CommonDropDown
                        {...field}
                        errors={errors}
                        label={t("user_id")}
                        placeholder={t("user_id_placeholder")}
                        list={[{ label: "test", value: 1 }]}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="assignedAdmins"
                    render={({ field }) => (
                      <CommonDropDown
                        {...field}
                        errors={errors}
                        label={t("assigned_admins")}
                        placeholder={t("assigned_placeholder")}
                        list={[{ label: "test", value: 1 }]}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <CommonDropDown
                        {...field}
                        errors={errors}
                        label={t("gender")}
                        placeholder={t("gender_placeholder")}
                        list={[{ label: "test", value: 1 }]}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="emirates_id"
                    render={({ field }) => (
                      <CommonDropDown
                        {...field}
                        errors={errors}
                        label={t("emirates_id")}
                        placeholder={t("emirates_id_placeholder")}
                        list={[{ label: "test", value: 1 }]}
                      />
                    )}
                  />
                </div>
                <div className="w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="district_id"
                    render={({ field }) => (
                      <CommonDropDown
                        {...field}
                        errors={errors}
                        label={t("district_id")}
                        placeholder={t("district_id_placeholder")}
                        list={[{ label: "test", value: 1 }]}
                      />
                    )}
                  />
                </div>
              </div>
              <input type="submit" className="hidden" />
            </form>
          </div>

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

export default UpdateUserList;
