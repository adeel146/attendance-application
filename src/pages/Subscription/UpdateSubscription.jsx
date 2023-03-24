import React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import { updateSubscription } from "../../services/SubscriptionServices";

function UpdateSubscription() {
  const navigate = useNavigate();
  const {
    state,
    state: { id },
  } = useLocation();

  console.log(id, "iddd");

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    numberOfUsers: yup
      .number()
      .typeError("user must be a number")
      .positive("user must be greater than zero")
      .required("user is required"),
    priceInUSD: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    durationDays: yup
      .number()
      .typeError("Duration Days must be a number")
      .positive("Duration Days must be greater than zero")
      .required("Duration Days is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset(state);
  }, []);

  const { mutate: update, isLoading } = useMutation({
    mutationFn: (data) => updateSubscription(id, data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleformSubmit = (formData) => {
    // const body = {
    //   description: formData.description,
    //   durationDays: formData.durationDays,
    //   id: formData.id,
    //   name: formData.name,
    //   numberOfUsers: ~~formData.numberOfUsers,
    //   priceInUSD: formData.priceInUSD,
    //   subscription_Type: formData.subscription_Type,
    // };
    update(formData);
  };

  return (
    <>
      <Toaster />

      <div className="p-10">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  ">
          {/* student-form */}

          {!isLoading ? (
            <div className=" text-primary_color px-[10em] mt-[2em]">
              <h2 className="text-lg font-bold">Subscription Information</h2>
              <form onSubmit={handleSubmit(handleformSubmit)}>
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
                      name="description"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="Description"
                          placeholder="Enter Description"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[15%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="durationDays"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="Duration Days"
                          placeholder="Enter Duration Days"
                          type="number"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[15%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="priceInUSD"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="price ($)"
                          placeholder="Enter priceInUSD"
                          type="number"
                          step="0.01"
                        />
                      )}
                    />
                  </div>
                  <div className="w-[30%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="subscription_Type"
                      render={({ field }) => (
                        <ValidationSelect
                          {...field}
                          errors={errors}
                          label="Type"
                          placeholder="Select Type"
                          list={[
                            { label: "Accounts", value: 1 },
                            { label: "Users", value: 2 },
                          ]}
                        />
                      )}
                    />
                  </div>
                  <div className="w-[15%] mr-5 mt-5">
                    <Controller
                      control={control}
                      name="numberOfUsers"
                      render={({ field }) => (
                        <CommonInput
                          {...field}
                          errors={errors}
                          label="No of Users"
                          placeholder="Enter No of Users "
                          type="number"
                          step="0.01"
                        />
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
                  <CommonButton type="submit" text={t("save")} width="10%" />
                </div>
              </form>
            </div>
          ) : (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateSubscription;
