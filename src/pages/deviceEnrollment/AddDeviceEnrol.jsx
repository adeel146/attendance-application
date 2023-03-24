import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
// import { RiAddCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import moment from "moment/moment";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { deviceTypeList } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { addDevice } from "../../services/DeviceEnrollmentServices";
import { getSchoolList } from "../../services/schoolServices";
import { getYear } from "../../services/termServices";

const schema = yup.object().shape({
  name: yup.string().required(),
  identifier: yup.string().required(),
  deviceType: yup.number().required(),
  school_Id: yup.number().required(),
});
function AddDeviceEnrol() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { data: SchoolList } = useQuery({
    queryKey: ["getSchoolList_TERMS"],
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

  const { mutate: addDeviceEnrollment, isLoading } = useMutation({
    mutationFn: (data) => {
      return addDevice(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        // reset(schema.noUnknown().cast());
        setTimeout(() => {
          navigate("/device-enrollment");
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const onSubmit = (formData) => {
    addDeviceEnrollment(formData);
  };

  return (
    <>
      <AddGroupModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <div className="p-10 ">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  pb-20">
          {/* profile information starting  */}
          {/* 
          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          /> */}
          {/* student-form */}
          {isLoading ? (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          ) : (
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold">
                Device Enrollment Information
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
                          type="text"
                          errors={errors}
                          label="Name"
                          placeholder="Name"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="identifier"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="Identifier"
                          placeholder="Enter Identifier"
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
                          list={getByIdData}
                        />
                      )}
                    />
                  </div> */}

                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="school_Id"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label={t("assign_school")}
                          placeholder={t("assign_school_placeholder")}
                          list={SchoolList}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="deviceType"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Device Type"
                          placeholder="Select Device Type"
                          list={deviceTypeList}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10 ">
                  <CommonButton
                    onClick={() => navigate(-1)}
                    className="mr-2"
                    text={t("cancel")}
                    width="10%"
                  />
                  <CommonButton type="submit" text={t("add")} width="10%" />
                </div>{" "}
              </form>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default AddDeviceEnrol;
