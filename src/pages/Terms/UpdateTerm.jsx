import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
// import { RiAddCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import moment from "moment/moment";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import { formatDate } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { getSchoolList } from "../../services/schoolServices";
import { getTermById } from "../../services/termServices";
import {
  addTermList,
  assignToSchool,
  getYear,
} from "../../services/termServices";
import { updateTerm } from "../../services/termServices";

const schema = yup.object().shape({
  name: yup.string().required(),
  school_Id: yup.number().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  duration: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(),
});
function UpdateTerm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { data: getByIdData = [] } = useQuery(["yearData"], getYear, {
    select: (res) =>
      res?.data?.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
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

  const from = moment(watch("startDate"), "YYYY-MM-DD");
  const to = moment(watch("endDate"), "YYYY-MM-DD");
  const durationDays = moment.duration(to.diff(from)).asDays();

  useEffect(() => {
    if (durationDays < 0) {
      toast.error("Days can't be Negative");
      setValue("duration", 0);
    } else {
      setValue("duration", durationDays, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [durationDays]);

  useEffect(() => {
    setValue("duration", 0, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, []);

  const { mutate: updateTermList, isLoading } = useMutation({
    mutationFn: (data) => {
      return updateTerm(id, data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        // reset(schema.noUnknown().cast());
        setTimeout(() => {
          navigate("/Term");
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const { data: dataTerm } = useQuery({
    queryKey: ["term_by_id"],
    queryFn: () => getTermById(id),
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
    if (dataTerm) {
      setValue("endDate", formatDate(dataTerm?.data?.endDate), {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("startDate", formatDate(dataTerm?.data?.startDate), {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("school_Id", dataTerm?.data?.school_Id, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [dataTerm]);

  const onSubmit = (formData) => {
    updateTermList(formData);
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

          {/* <CommonProfile
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
              <h2 className="text-lg font-bold">Term Information</h2>
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
                      name="startDate"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          type="date"
                          errors={errors}
                          label="Start Date"
                          placeholder="Start Date"
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
                          label="End Date"
                          placeholder="End Date"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="duration"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          disabled={durationDays}
                          errors={errors}
                          label="Duration Days"
                          placeholder={t("duration_placeholder")}
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
                          label="Select School"
                          placeholder="Select..."
                          list={SchoolList}
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

export default UpdateTerm;
