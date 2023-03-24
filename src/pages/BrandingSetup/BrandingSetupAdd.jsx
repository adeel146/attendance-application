import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
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
import AddGroupModal from "../../Modals/AddGroupModal";
import { addBrandingSetup } from "../../services/BrandingSetupServices";
import { addCalenderList } from "../../services/calenderProfileServices";
import { getClases } from "../../services/ClassServices";
import { getSchoolList } from "../../services/schoolServices";

const schema = yup.object().shape({
  parentColor: yup.string().required("Required"),
  parentColor60: yup.string().required("Required"),
  parentOrange60: yup.string().required("Required"),
  parentOrange: yup.string().required("Required"),
});

function BrandingSetupAdd() {
  const navigate = useNavigate();
  const [image, setImage] = useState({});

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    reset(currentUser?.brandingSetup);
    setImage(currentUser?.brandingSetup?.logo);
  }, []);

  // const { data: SchoolList } = useQuery({
  //   queryKey: ["getSchoolList"],
  //   queryFn: getSchoolList,
  //   select: (res) =>
  //     res.data.map((val) => {
  //       return {
  //         value: val.id,
  //         label: val.name,
  //       };
  //     }),
  //   refetchOnWindowFocus: false,
  // });

  const { mutate: AddBrandingSetup, isLoading } = useMutation({
    mutationFn: (data) => {
      return addBrandingSetup(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const onSubmit = (formData) => {
    console.log(formData, "data");
    let payload = {
      ...formData,
      logo: image,
      business_Id: currentUser?.brandingSetup?.id,
    };
    AddBrandingSetup(payload);
  };
  const handleDefault = () => {
    reset({
      parentColor: "#799AEF",
      parentColor60: "#AFC2F5",
      parentOrange: "#E28743",
      parentOrange60: "#EEB78E",
    });
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
            <CommonProfile checkProfile setImage={setImage} />

            {/* student-form */}
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold capitalize ">
                {"Brand Default Information"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" flex  flex-wrap">
                  {/* <div className="w-[30%] mr-5 mt-5">
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
                        />
                      )}
                    />
                  </div> */}
                  <div className="w-[20%] mr-5 mt-5">
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
                  <div className="w-[20%] mr-5 mt-5">
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
                  <div className="w-[20%] mr-5 mt-5">
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
                  <div className="w-[20%] mr-5 mt-5">
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
                  <div className="w-[15%] mr-5 mt-5">
                    <CommonButton
                      text="Set to Default"
                      onClick={handleDefault}
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

export default BrandingSetupAdd;
