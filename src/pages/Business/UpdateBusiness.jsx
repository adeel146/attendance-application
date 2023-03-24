import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import { Tab } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import { BusinessTabsList } from "../../constants/constants";
import {
  addBusiness,
  getSingleBusiness,
  updateBusiness,
} from "../../services/BusinessServices";
import Subscription from "./Subscription";
import UserInformation from "./UserInformation";
import UserInformationUpdate from "./UserInformationUpdate";
import UsersList from "./UsersList";

function UpdateBusiness() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "id");
  const [image, setImage] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [businessobj, setBusinessobj] = useState();
  const [refetchUserInformation, setRefetchUserInformation] = useState(false);

  const { mutate: handleupdateBusiness, isLoading: updatingBusiness } =
    useMutation({
      mutationKey: "updateBusiness",
      mutationFn: (data) =>
        updateBusiness(businessobj?.business_Id, {
          ...data,
          image,
          owner_Id: data.id,
        }),
      onSuccess: async (data) => {
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });

  const {} = useQuery({
    queryKey: ["singleBusiness", { refetchUserInformation }],
    queryFn: () => getSingleBusiness(id),
    onSuccess: (data) => {
      if (data.success) {
        setImage(data.data.image);
        setBusinessobj(data.data);
      } else {
        toast.error(data.message);
      }
    },
    refetchOnWindowFocus: false,
  });

  console.log(businessobj, "businessobj");

  const handleCreateBusiness = (data) => {
    const payload = { ...data, image };
    createBusiness(payload);
  };

  return (
    <>
      <Toaster />
      <div className="p-10">
        <div className="w-3 mb-2 text-sm">
          <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
        </div>
        <div className=" text-sm border-2  ">
          {/* profile information starting  */}
          <CommonProfile setImage={setImage} checkProfile />
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className=" mt-5 flex w-4/5 m-auto space-x-1 rounded-xl bg-primary_color_60 p-1">
              {BusinessTabsList.map((tab, index) => {
                return (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        "w-full min-w-max rounded-lg py-2.5 text-sm font-medium leading-5 text-primary_orange",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "!text-white hover:bg-white hover:!text-primary_orange"
                      )
                    }
                  >
                    {tab}
                  </Tab>
                );
              })}
            </Tab.List>

            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <UserInformationUpdate
                  isLoading={updatingBusiness}
                  handleupdateBusiness={handleupdateBusiness}
                  businessobj={businessobj}
                />
              </Tab.Panel>
            </Tab.Panels>

            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <Subscription
                  businessobj={businessobj}
                  setRefetchUserInformation={setRefetchUserInformation}
                />
              </Tab.Panel>
            </Tab.Panels>

            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <UsersList business_id={businessobj?.business_Id} />;
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {/* student-form */}
        </div>
      </div>
    </>
  );
}

export default UpdateBusiness;
