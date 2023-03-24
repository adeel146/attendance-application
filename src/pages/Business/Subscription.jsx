import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import { customSpinner } from "../../constants/utilis";
import { getSubscriptionList } from "../../services/SubscriptionServices";
import { updateBusiness } from "../../services/SubscriptionServices";

function Subscription(props) {
  const { businessobj, setRefetchUserInformation } = props;
  const [indexId, setindexId] = useState();
  console.log(businessobj, "businessobj");

  const { data: subscriptionList } = useQuery({
    queryKey: ["subcription_list"],
    queryFn: getSubscriptionList,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateSub } = useMutation({
    mutationFn: (subscriptionId) =>
      updateBusiness(subscriptionId, businessobj?.business_Id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setindexId(null);
        setRefetchUserInformation((prev) => !prev);
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
          <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
            {subscriptionList?.data?.map((val, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    val.id == businessobj?.currentSubscription?.plan_Id &&
                    "grayscale"
                  }`}
                >
                  <div
                    className={`${
                      val.id == businessobj?.currentSubscription?.plan_Id
                        ? ""
                        : " hover:translate-y-[-5px] "
                    }transition-all w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y`}
                  >
                    <div className="  pb-[25px]">
                      <div className="bg-[#AFC2F5] h-[6rem] w-full rounded-t-md"></div>
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
                        {val.id == businessobj?.currentSubscription?.plan_Id ? (
                          <CommonButton
                            text="Current Plan"
                            width="35%"
                            disabled={true}
                            className=" !cursor-not-allowed "
                          />
                        ) : (
                          <CommonButton
                            text={
                              indexId == val.id ? customSpinner() : "Subscribe"
                            }
                            width="35%"
                            onClick={() => {
                              setindexId(val?.id);
                              updateSub(val?.id);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscription;
