import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineEye } from "react-icons/hi";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";

import "./LoginStyle.css";

import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import { customSpinner } from "../../constants/utilis";
import { loginUser } from "../../services/AuthenticationServices";
import CTS_LOGO_SMALL from "./loginImages/CTS-Logo-2022.png";
import CTS_LOGO_LARGE from "./loginImages/CTS-Logo-png.png";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginCard = () => {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const toggle = () => {
    setopen(!open);
  };

  useEffect(() => {
    localStorage.getItem("token") && navigate("/dashboard");
  }, []);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data?.message);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("user", JSON.stringify(data.data.role));
        setTimeout(() => {
          reset(defaultValues);
          if (data?.data?.user?.requirePasswordUpdate) {
            navigate("/change-password");
          } else if (data?.data?.user?.isSubscriptionExpired) {
            navigate("/subscription-packages");
          } else {
            navigate("dashboard");
          }
          toast.dismiss();
        }, 500);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const defaultValues = {
    username: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <Toaster />
      <div className="bg-[#ffffff] h-[100vh]">
        <div className="container mx-auto px-7 lg:px-14 pt-10 ">
          <div className="flex lg:space-x-20">
            <div className="bg-[#f5f5f7] text-center gutter-row h-[90vh] md:w-2/5 w-full ">
              <div className="lg:p-20 p-10 flex flex-col content-between h-full  ">
                <form
                  className="h-full flex justify-between flex-col "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="inputstyling placeholder-[#588298]"
                          placeholder={t("username_placeholder")}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="username"
                      render={({ message }) => (
                        <p className="!text-red-600 text-left	">{message}</p>
                      )}
                    />
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <div className="flex">
                          <input
                            {...field}
                            type={open === false ? "password" : "text"}
                            className="inputstyling mt-10  placeholder-[#588298] "
                            placeholder={t("password_placeholder")}
                          />
                          <div className=" relative ">
                            {open === false ? (
                              <HiOutlineEye
                                className="w-[25px] h-[25px] text-[#658b9e] right-[0px] top-[40px] absolute"
                                onClick={toggle}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                className="w-[25px] h-[25px] text-[#658b9e] right-[0px] top-[40px] absolute "
                                onClick={toggle}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <p className="!text-red-600 text-left	">{message}</p>
                      )}
                    />
                    <div className="mt-7">
                      <CustomCheckBox label="Remember Me" />
                    </div>
                  </div>
                  <div>
                    <button
                      className="w-full bg-[#00466a]  py-[10px]  text-white hover:bg-[#E28743] rounded font-bold text-[22px] tracking-[3px]"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? customSpinner() : t("login_button")}
                    </button>
                    <p
                      onClick={() => navigate("resetPassword")}
                      className="text-[#E28743] cursor-pointer hover:text-primary_orange_60 flex justify-start mt-2 font-bold text-sm"
                    >
                      {t("forget_password")}
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className=" h-[90vh]  max-md:hidden ">
              <div className="lg:px-12 flex h-[90vh] justify-center items-center flex-col">
                <img
                  src={CTS_LOGO_SMALL}
                  alt="cts-logo"
                  className="w-[300px] h-[60px]"
                />
                <img
                  src={CTS_LOGO_LARGE}
                  className="h-[300px] w-[450px] mt-14"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
