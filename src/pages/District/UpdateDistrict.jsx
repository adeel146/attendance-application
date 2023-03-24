import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import {
  getByDistrictId,
  updateDistrict,
} from "../../services/districtServices";

function UpdateDistrict() {
  const navigate = useNavigate();
  const params = useParams();

  // const [isOpen, setIsOpen] = useState(false);

  // const data = React.useMemo(GroupsData, []);
  // const columns = React.useMemo(GroupsHeader, []);

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { id } = useParams();

  const { mutate: updateDistrictData, isLoading } = useMutation({
    mutationFn: (data) => updateDistrict(id, data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const {} = useQuery({
    queryKey: ["district_by_id"],
    queryFn: () => getByDistrictId(id),
    onSuccess: async (data) => {
      console.log(data, "ressss");
      if (data?.success) {
        toast.success(data?.message);
        reset(data.data);
      } else {
        toast.error(data?.message);
      }
    },
    refetchOnWindowFocus: false,
  });

  const handleformSubmit = (data) => {
    // const groupIds = GroupsData.map((obj) => obj.id);

    updateDistrictData({ ...data });
  };

  return (
    <>
      <Toaster />
      {/* <AddGroupModal isOpen={isOpen} handleClose={() => setIsOpen(false)} /> */}
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
          <div className=" text-primary_color px-[10em] mt-[2em]">
            <h2 className="text-lg font-bold">
              {t("district_default_information")}
            </h2>
            {isLoading ? (
              <div className="h-[50vh] flex justify-center items-center">
                {customSpinner()}
              </div>
            ) : (
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
                          label={t("name")}
                          placeholder={t("enter_name_placeholder")}
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
            )}
          </div>
          {/* <div className=" text-primary_color px-[10em] mt-[2em]">
            <h2 className="text-lg font-bold mb-5">{t("member")}</h2>
            <div className="flex justify-between">
              <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer w-max mb-4 hover:text-primary_orange flex items-center text-primary_color font-bold pt-3 text-base"
              >
                <div>
                  <AiFillPlusCircle size={23} />
                </div>
                <div className="pl-3 uppercase text-cm">
                  <h4>{t("add_group")}</h4>
                </div>
              </div>
              <p className="text-primary_orange capitalize font-bold  underline">
                {t("more_group")}
              </p>
            </div>
            <div>
              <CustomTable data={data} columns={columns} noPagination />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UpdateDistrict;
