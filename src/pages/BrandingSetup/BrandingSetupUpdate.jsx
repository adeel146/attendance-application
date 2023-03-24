import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import {
  addBrandingSetup,
  getSingleBrandingSetup,
  updateBrandingSetup,
} from "../../services/BrandingSetupServices";
import { getSchoolList } from "../../services/schoolServices";

const schema = yup.object().shape({
  name: yup.string().required("Required"),
  parentColor: yup.string().required("Required"),
  parentColor60: yup.string().required("Required"),
  parentOrange60: yup.string().required("Required"),
  parentOrange: yup.string().required("Required"),
  school_Id: yup.number().required("Required"),
});

function BrandingSetupUpdate() {
  const [logo, setLogo] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { data: SchoolList } = useQuery({
    queryKey: ["getSchoolList"],
    queryFn: getSchoolList,
    select: (res) =>
      res.data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
    refetchOnWindowFocus: false,
  });

  const { mutate: handleUpdateBrandingSetup, isLoading } = useMutation({
    mutationFn: (data) => {
      return updateBrandingSetup(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  useEffect(() => {
    reset(state);
    setValue("school_Id", state.id);
    setLogo(state.logo);
  }, []);

  const onSubmit = (data) => {
    console.log(data, "data");
    let payload = { ...data, logo };
    handleUpdateBrandingSetup(payload);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[100vh] ">
          {customSpinner()}
        </div>
      ) : (
        <div className="p-10">
          <div className="w-3 mb-2 text-sm">
            <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
          </div>
          <div className=" text-sm border-2  ">
            {/* profile information starting  */}
            <CommonProfile
              image={state?.logo?.file_path}
              checkProfile
              setImage={setLogo}
            />

            {/* student-form */}
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold capitalize ">
                {"Brand Default Information"}
              </h2>
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
                          label={t("profile_name")}
                          placeholder={t("enter_profile_name")}
                          onChnage={onchange}
                          disabled
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
                          list={SchoolList}
                          label="School Name"
                          placeholder="Select School"
                          isDisabled={true}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[10%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="parentColor"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="color"
                          errors={errors}
                          label="Primary Color"
                          className="!p-0 cursor-pointer "
                        />
                      )}
                    />
                  </div>
                  <div className="w-[10%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="parentColor60"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="color"
                          errors={errors}
                          label="Primary Light"
                          className="!p-0 cursor-pointer "
                        />
                      )}
                    />
                  </div>
                  <div className="w-[10%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="parentOrange"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="color"
                          errors={errors}
                          label="Secondary Color"
                          className="!p-0 cursor-pointer "
                        />
                      )}
                    />
                  </div>
                  <div className="w-[10%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="parentOrange60"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="color"
                          errors={errors}
                          label="Secondary light"
                          className="!p-0 cursor-pointer "
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end my-10">
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
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default BrandingSetupUpdate;
