import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { customSpinner } from "../../constants/utilis";
import { addGroup } from "../../services/GroupsServices";
import { updateGroups } from "../../services/GroupsServices";
import { getGroupsById } from "../../services/GroupsServices";
import { getSchoolList } from "../../services/schoolServices";

const schema = yup.object().shape({
  name: yup.string().required(),
});
function UpdateGroup() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { fieldName: "" },
    resolver: yupResolver(schema),
  });

  const {} = useQuery({
    queryKey: ["group_by_id"],
    queryFn: () => getGroupsById(id),
    onSuccess: async (data) => {
      console.log(data, "ressss");
      if (data?.success) {
        toast.success(data?.message);
        reset(data?.data);
      } else {
        toast.error(data?.message);
      }
    },
    refetchOnWindowFocus: false,
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

  const { mutate: updateGroupList, isLoading } = useMutation({
    mutationFn: (data) => updateGroups(id, data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        navigate(-1);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleformSubmit = (data) => {
    const payload = data;
    updateGroupList(payload);
  };

  return (
    <>
      <Toaster />
      <div className="p-10 ">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  pb-20">
          {/* profile information starting  */}

          <CommonProfile
            UserID="58974598984"
            CreatedAt="9/10/2011"
            CreatedBy="Yousuf Abdulaziz Ebrahim Hassan"
          />
          {/* student-form */}
          <div className=" text-primary_color px-[10em] mt-[2em]">
            <h2 className="text-lg font-bold">{t("group_info")}</h2>
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
                          label={t("name_of_group")}
                          placeholder={t("namegroup_placeholder")}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateGroup;
