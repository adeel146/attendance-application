import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import { commonPageSize } from "../../constants/constants";
import { getSubscriptionList } from "../../services/SubscriptionServices";
import { updateBusiness } from "../../services/SubscriptionServices";

function SubscriptionPackages() {
  const [pageNumber, setpageNumber] = useState(0);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: subscriptionList } = useQuery({
    queryKey: ["subcription_list", { pageNumber, pageSize }],
    queryFn: () =>
      getSubscriptionList({
        // name: searchVal,
        // page_size: pageSize,
        // page_index: pageNumber,
      }),

    keepPreviousData: true,
  });

  const { mutate: updateSub } = useMutation({
    mutationFn: (id) => updateBusiness(id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries("subcription_list");
        setTimeout(() => {
          navigate("/");
        }, 700);
      } else {
        toast.error(data?.message);
      }
    },
  });

  return (
    <>
      <Toaster />

      <div className="flex min-h-screen pt-[30px] px-[40px] pb-[1rem]">
        <div className="min-w-full">
          <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
            Your Subscription
          </p>

          <div>
            <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
              Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi
              eleifend faucibus.
            </p>
          </div>

          <div className="mt-[30px] inline-flex border border-[#E1E3E5] shadow-[0px 1px 2px #E1E3E5] divide-[#E1E3E5] divide-x rounded-[5px]">
            <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] leading-[16px] text-[13px] font-semibold font-bold py-[15px] px-[25px] rounded-l">
              Monthly
            </button>
            <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] text-[13px] leading-[16px] font-semibold font-bold py-[15px] px-[25px] rounded-r">
              Annual
            </button>
          </div>

          <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
            {subscriptionList?.data?.map((val, index) => {
              return (
                <div key={index}>
                  <div
                    key="1"
                    className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
                  >
                    <div className="  pb-[25px]">
                      <div className="bg-[#AFC2F5] h-[6rem] w-full rounded-t-md"></div>
                      <div className="flex ">
                        <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px] mt-[0.5rem]">
                          <p className="text-[#00153B] text-[14px] leading-[28px] font-bold ">
                            Starter
                          </p>
                        </div>
                      </div>

                      <div className="text-center ">
                        <p className="text-[#E28743] text-[19px] leading-[24px] font-bold">
                          {val.name}
                        </p>
                        <p className="text-[#E28743] text-[50px] leading-[63px] font-bold">
                          {val.priceInUSD}$
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-[#E28743] text-[18px] leading-[28px] font-medium">
                          {val?.durationDays} Duration Days
                        </p>
                        <p className="text-[#E28743] text-[18px] leading-[28px] font-medium">
                          {val.numberOfUsers} Users
                        </p>
                      </div>
                    </div>

                    <div className="pt-[25px] px-[25px] pb-[35px] bg-[#E28743] text-center rounded-b-md">
                      <div>
                        <p className="text-[white] text-[14px] leading-[24px] font-medium">
                          Direct Phone Numbers
                        </p>
                        <p className="text-[white] text-[14px] leading-[24px] font-medium">
                          Landline Phone Numbers
                        </p>
                        <p className="text-[white] text-[14px] leading-[24px] font-medium">
                          Corporate email addresses
                        </p>
                        <p className="text-[white] text-[14px] leading-[24px] font-medium">
                          Propsetcs
                        </p>
                        <p className="text-[white] text-[14px] leading-[24px] font-medium">
                          Chrome Extension
                        </p>
                      </div>

                      <div className="mt-[25px]">
                        <CommonButton
                          text="Subscribe"
                          width="35%"
                          onClick={() => {
                            updateSub(val?.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div
              key="2"
              className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
            >
              <div className=" pb-[25px]">
                <div className="bg-[#AFC2F5] h-[6rem] w-full rounded-t-md"></div>
                <div className="flex ">
                  <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px] mt-[0.5rem]">
                    <p className="text-[#00153B] text-[14px] leading-[28px] font-bold">
                      Value
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#AFC2F5] text-[19px] leading-[24px] font-bold">
                    Fast Start
                  </p>
                  <p className="text-[#AFC2F5] text-[50px] leading-[63px] font-bold">
                    $49
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[#AFC2F5] text-[18px] leading-[28px] font-medium">
                    50 Credits per month
                  </p>
                  <p className="text-[#AFC2F5] text-[18px] leading-[28px] font-medium">
                    Unlimited users
                  </p>
                </div>
              </div>

              <div className="pt-[25px] px-[25px] pb-[35px] bg-[#AFC2F5] text-center  rounded-b-md">
                <div>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Direct Phone Numbers
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Landline Phone Numbers
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Corporate email addresses
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Propsetcs
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Chrome Extension
                  </p>
                </div>

                <div className="mt-[25px]">
                  <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                    Current Plan
                  </button>
                </div>
              </div>
            </div> */}
            {/* <div
              key="2"
              className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
            >
              <div className=" pb-[25px]">
                <div className="bg-[#E28743] h-[6rem] w-full rounded-t-md"></div>
                <div className="flex ">
                  <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px] mt-[0.5rem]">
                    <p className="text-[#00153B] text-[14px] leading-[28px] font-bold">
                      Value
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#E28743] text-[19px] leading-[24px] font-bold">
                    Fast Start
                  </p>
                  <p className="text-[#E28743] text-[50px] leading-[63px] font-bold">
                    $49
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-[#E28743] text-[18px] leading-[28px] font-medium">
                    50 Credits per month
                  </p>
                  <p className="text-[#E28743] text-[18px] leading-[28px] font-medium">
                    Unlimited users
                  </p>
                </div>
              </div>

              <div className="pt-[25px] px-[25px] pb-[35px] bg-[#E28743] text-center  rounded-b-md">
                <div>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Direct Phone Numbers
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Landline Phone Numbers
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Corporate email addresses
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Propsetcs
                  </p>
                  <p className="text-[white] text-[14px] leading-[24px] font-medium">
                    Chrome Extension
                  </p>
                </div>

                <div className="mt-[25px]">
                  <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                    Current Plan
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscriptionPackages;
