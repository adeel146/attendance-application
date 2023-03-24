import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import { customSpinner } from "../../constants/utilis";
import { formatDate } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { addAcademicList } from "../../services/acedamicYear";
import {
  getAcademicSingleList,
  updateAcademicList,
} from "../../services/acedamicYear";

const schema = yup.object().shape({
  name: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  active: yup.bool().oneOf([true]),
});

function UpdateAcademicYear() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const { mutate: updateList, isLoading } = useMutation({
    mutationFn: (data) => {
      return updateAcademicList(id, data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const { data: setUpdateList } = useQuery({
    queryKey: ["academic_year_by_id"],
    queryFn: () => getAcademicSingleList(id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        reset(data?.data);
      } else {
        toast.error(data?.message);
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (setUpdateList) {
      setValue("endDate", formatDate(setUpdateList?.data?.endDate), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("startDate", formatDate(setUpdateList?.data?.startDate), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [setUpdateList]);

  const onSubmit = (formData) => {
    console.log(formData);
    updateList(formData);
  };

  return (
    <>
      <Toaster />
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
              <h2 className="text-lg font-bold">{t("acedamic_info")}</h2>
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
                          label={t("duration")}
                          placeholder={t("duration_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="date"
                          errors={errors}
                          label={t("start_date")}
                          placeholder={t("start_date_placeholder")}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="date"
                          errors={errors}
                          label={t("end_date")}
                          placeholder={t("end_date_placeholder")}
                        />
                      )}
                    />
                  </div>

                  <div className="w-[30%] mr-5 mt-5 space-x-3">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateAcademicYear;
