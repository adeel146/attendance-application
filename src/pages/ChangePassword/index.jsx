import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import { PasswordRegex } from "../../constants/constants";
import { resetPassword } from "../../services/AuthenticationServices";

function ChangePassword() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Required")
      .min(8, "should be 8 chars minimum.")
      .matches(
        PasswordRegex,
        "At least one uppercase letter, one lowercase letter, one number and one special character:"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { mutate: ResetUserPassword, isLoading } = useMutation({
    mutationFn: (data) => resetPassword(data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 700);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleformSubmit = (data) => {
    let payload = { password: data.password };
    ResetUserPassword(payload);
  };
  return (
    <>
      <Toaster />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a> */}
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit(handleformSubmit)}
            >
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <CommonInput
                    {...field}
                    errors={errors}
                    label="Enter New Password"
                    placeholder="Enter Your Password"
                    type="password"
                  />
                )}
              />
              <div className=" mt-5">
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      errors={errors}
                      label="Re Enter Password"
                      placeholder="Enter Your Password"
                      type="password"
                    />
                  )}
                />
              </div>
              <h1 className="text-[#799AEF] font-semibold">
                At least one uppercase letter, one lowercase letter, one number
                and one special character
              </h1>
              <CommonButton
                isLoading={isLoading}
                type="submit"
                text="Reset Password"
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChangePassword;
