import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
// import { DubaiLandlineRegex, GradeHigh } from "../../constants/constants";
// import { GradeLow } from "../../constants/constants";
// import { GradeHighEnum } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import { addSchoolList } from "../../services/schoolServices";
import { getOperatorList } from "../../services/studentServices";

function AddDistrict() {
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const schema = yup.object().shape({
    name: yup.string().required(),
    schoolNumber: yup
      .number()
      .typeError("School Number must be a number")
      .positive("School Number must be greater than zero")
      .required("School Number is required"),
    gradeLow: yup.string().required(),
    nceS_Id: yup
      .number()
      .min(0)
      .transform((value) =>
        isNaN(value) || value === undefined ? null : value
      )
      .nullable(),

    state_Id: yup
      .number()
      .min(0)
      .transform((value) =>
        isNaN(value) || value === undefined ? null : value
      )
      .nullable(),
    gradeLow: yup.string().required(),
    gradeHigh: yup.string().required(),
    principleName: yup.string().required(),
    principleEmail: yup.string().email().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
    zip: yup.number().integer().required().nullable(),
    // phone: yup.string().matches(DubaiLandlineRegex, "Invalid Phone").required(),
    phone: yup
      .number()
      .min(0)
      .transform((value) =>
        isNaN(value) || value === undefined ? null : value
      )
      .nullable(),
    zone: yup
      .number()
      .min(0)
      .transform((value) =>
        isNaN(value) || value === undefined ? null : value
      )
      .nullable(),
    operator_Id: yup.number().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: schema.noUnknown().cast(),
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data: OperatorData = [] } = useQuery(
    ["operatorData"],
    getOperatorList,
    {
      select: (res) =>
        res.data.map((val) => {
          return {
            value: val.id,
            label: val.name,
          };
        }),
    }
  );

  const { mutate: addSchool, isLoading } = useMutation({
    mutationFn: (data) => {
      return addSchoolList(data);
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        reset(schema.noUnknown().cast());
        setTimeout(() => {
          navigate("/schools-list");
        }, 2000);
      } else {
        toast.error(res?.message);
      }
    },
  });

  const GradeLow = [
    {
      label: "Kg 1",
      value: "Kg 1",
    },
    {
      label: "Kg 2",
      value: "Kg 2",
    },
    {
      label: "Grade 1",
      value: "Grade 1",
    },
    {
      label: "Grade 2",
      value: "Grade 2",
    },
    {
      label: "Grade 3",
      value: "Grade 3",
    },
    {
      label: "Grade 4",
      value: "Grade 4",
    },
    {
      label: "Grade 5",
      value: "Grade 5",
    },

    {
      label: "Grade 6",
      value: "Grade 6",
    },
    {
      label: "Grade 7",
      value: "Grade 7",
    },

    {
      label: "Grade 8",
      value: "Grade 8",
    },

    {
      label: "Grade 9",
      value: "Grade 9",
    },

    {
      label: "Grade 10",
      value: "Grade 10",
    },
    {
      label: "Grade 11",
      value: "Grade 11",
    },
    {
      label: "Grade 12",
      value: "Grade 12",
    },
  ];

  const GradeHighEnum = [
    {
      label: "Kg 1",
      value: "Kg 1",
    },
    {
      label: "Kg 2",
      value: "Kg 2",
    },
    {
      label: "Grade 1",
      value: "Grade 1",
    },
    {
      label: "Grade 2",
      value: "Grade 2",
    },
    {
      label: "Grade 3",
      value: "Grade 3",
    },
    {
      label: "Grade 4",
      value: "Grade 4",
    },
    {
      label: "Grade 5",
      value: "Grade 5",
    },

    {
      label: "Grade 6",
      value: "Grade 6",
    },
    {
      label: "Grade 7",
      value: "Grade 7",
    },

    {
      label: "Grade 8",
      value: "Grade 8",
    },

    {
      label: "Grade 9",
      value: "Grade 9",
    },

    {
      label: "Grade 10",
      value: "Grade 10",
    },
    {
      label: "Grade 11",
      value: "Grade 11",
    },
    {
      label: "Grade 12",
      value: "Grade 12",
    },
  ];

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data?.countries);
        setValue("country", data?.userSelectValue?.value);
      });
  }, []);

  const onSubmit = (formData) => {
    const body = {
      name: formData.name,
      schoolNumber: formData?.schoolNumber.toString(),
      nceS_Id: formData?.nceS_Id && formData?.nceS_Id.toString(),
      state_Id: formData?.state_Id && formData?.state_Id.toString(),
      gradeLow: formData?.gradeLow,
      gradeHigh: formData.gradeHigh,
      principleName: formData.principleName,
      principleEmail: formData.principleEmail,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zip: formData.zip.toString(),
      phone: formData.phone && formData.phone.toString(),
      zone: formData.zone && formData.zone.toString(),
      operator_Id: formData.operator_Id,
      business_Id: formData.business_Id,
    };

    console.log(body.state, "logggg");

    console.log(body.nceS_Id, "nceS_IdnceS_Id");

    addSchool(body);
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="h-[50vh] flex justify-center items-center">
          {customSpinner()}
        </div>
      ) : (
        <>
          <AddGroupModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
          <div className="p-10">
            <div className="w-3 mb-2 text-sm">
              <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
            </div>
            <div className=" text-sm border-2  ">
              {/* profile information starting  */}

              {/* <CommonProfile
                UserID="58974598984"
                CreatedAt="9/10/2011"
                CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
              /> */}
              {/* student-form */}
              <div className=" text-primary_color px-[10em] mt-[7em] pb-[2rem]">
                <h2 className="text-lg font-bold">{t("school_default")}</h2>
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
                            label={t("name")}
                            placeholder={t("enter_name_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="schoolNumber"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            type="number"
                            errors={errors}
                            label={t("school_number")}
                            placeholder={t("school_number_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="nceS_Id"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            type="number"
                            errors={errors}
                            label="School NCESID"
                            placeholder="Enter School NCESID"
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="state_Id"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            type="number"
                            errors={errors}
                            label={t("state_id")}
                            placeholder={t("state_id_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="gradeLow"
                        render={({ field }) => (
                          <ValidationSelect
                            {...field}
                            errors={errors}
                            label="Grade Low"
                            placeholder="Grade Low"
                            list={GradeLow}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="gradeHigh"
                        render={({ field }) => (
                          <ValidationSelect
                            {...field}
                            errors={errors}
                            label="Grade High"
                            placeholder="Grade High"
                            list={GradeHighEnum}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="principleName"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            errors={errors}
                            label="Enter Principal Name"
                            placeholder="Enter Principal Name"
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="principleEmail"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            errors={errors}
                            label="Principal Email"
                            placeholder="Enter Principal Email "
                          />
                        )}
                      />
                    </div>

                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="address"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            errors={errors}
                            label={t("address")}
                            placeholder={t("address_placeholder")}
                          />
                        )}
                      />
                    </div>

                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="city"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            errors={errors}
                            label={t("city")}
                            placeholder={t("city_placeholder")}
                          />
                        )}
                      />
                    </div>

                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="state"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            errors={errors}
                            label={t("state")}
                            placeholder={t("state_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                          <ValidationSelect
                            {...field}
                            errors={errors}
                            label={t("country")}
                            list={countries}
                            placeholder={t("country_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="zip"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            type="number"
                            errors={errors}
                            label="Zip Code/Postal Code"
                            placeholder="Enter Zip Code/Postal Code"
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            type="number"
                            errors={errors}
                            label={t("phone")}
                            placeholder={t("phone_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="zone"
                        render={({ field }) => (
                          <CommonInput
                            {...field}
                            errors={errors}
                            label={t("zone")}
                            placeholder={t("zone_placeholder")}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[30%] mr-5 mt-5">
                      <Controller
                        control={control}
                        name="operator_Id"
                        render={({ field }) => (
                          <ValidationSelect
                            {...field}
                            errors={errors}
                            label={t("operator_id")}
                            placeholder={t("operator_id_placeholder")}
                            list={OperatorData}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {/* <input type="submit" className="hidden" /> */}
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddDistrict;
