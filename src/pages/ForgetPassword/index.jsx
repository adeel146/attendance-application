import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import { PasswordRegex } from "../../constants/constants";
import { forgetPassword } from "../../services/AuthenticationServices";

function ForgetPassword() {
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
    username: yup.string().required("Required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { mutate: changePassword, isLoading } = useMutation({
    mutationFn: (data) => forgetPassword(data),
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

  const handleformSubmit = (data) => {
    let payload = data;
    changePassword(payload);
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
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="hover:text-primary_orange_60 text-primary_orange cursor-pointer "
            />
            <h2 className="my-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit(handleformSubmit)}
            >
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <CommonInput
                    {...field}
                    errors={errors}
                    label="Enter UserName"
                    placeholder="Enter UserName"
                  />
                )}
              />
              <div className=" mt-5">
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
              </div>
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

export default ForgetPassword;
