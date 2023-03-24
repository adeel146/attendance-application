import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import _ from "lodash";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import {
  DubaiLandlineRegex,
  DubaiPhoneNumberRegex,
} from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";

function UserInformation({
  handleCreateBusiness,
  handleupdateBusiness,
  isLoading,
  businessobj,
  singleuserData,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    // phone: yup.string().matches(DubaiLandlineRegex, "Invalid Phone").required(),
    // mobile: yup
    //   .string()
    //   .matches(DubaiPhoneNumberRegex, "Invalid Mobile Number")
    //   .required("Required"),
    phone: yup
      .string()
      .typeError("Phone must be a number")
      // .positive("Phone must be greater than zero")
      .required("Phone is required"),
    mobile: yup
      .string()
      .typeError("Mobile must be a number")
      // .positive("Mobile must be greater than zero")
      .required("Mobile is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset(businessobj);
  }, [businessobj]);

  useEffect(() => {
    reset(singleuserData);
  }, [singleuserData]);

  const handleFormSubmit = (data) => {
    let payload = data;
    if (id || businessobj) {
      handleupdateBusiness(payload);
    } else {
      handleCreateBusiness(payload);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className=" text-primary_color px-[10em] mt-[2em]">
          <h2 className="text-lg font-bold">Tenant Default Information</h2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className=" flex  flex-wrap">
              <div className="w-[30%] mr-5 mt-5">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      errors={errors}
                      label="Name"
                      placeholder="Enter Name"
                    />
                  )}
                />
              </div>
              <div className="w-[30%] mr-5 mt-5">
                <Controller
                  control={control}
                  name="domain"
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      errors={errors}
                      label="Domain"
                      placeholder="Enter Domain"
                    />
                  )}
                />
              </div>
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
              <div className="w-[30%] mr-5 mt-5 flex">
                <div className="w-50">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label={t("password")}
                        placeholder={t("password_placeholder")}
                        type="password"
                      />
                    )}
                  />{" "}
                </div>
                <a
                  onClick={() => setValue("password", "12345678")}
                  className="w-30 text-xs pt-5 my-auto ml-1 hover:underline cursor-pointer  "
                >
                  Generate Password
                </a>
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
                  name="active"
                  render={({ field }) => (
                    <CustomCheckBox {...field} errors={errors} label="Active" />
                  )}
                />
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
              <CommonButton
                isLoading={isLoading}
                type="submit"
                text={t("save")}
                width="10%"
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="h-[50vh] flex justify-center items-center">
          {customSpinner()}
        </div>
      )}
    </>
  );
}

export default UserInformation;
