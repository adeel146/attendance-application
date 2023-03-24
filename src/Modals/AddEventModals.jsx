import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Modal from "react-modal";

import { useMutation, useQuery } from "@tanstack/react-query";

import "../Modals/AddGroup.scss";

import CrossIcon from "../assets/icons/CrossIcon";
import CommonButton from "../Components/CommonComponents/CommonButton";
import CommonDropDown from "../Components/CommonComponents/CommonDropdown";
import CommonInput from "../Components/CommonComponents/CommonInput";
import { customSpinner, formatDate } from "../constants/utilis";
import { addCalendarList } from "../services/CalendarServices";
import { getCalenderList } from "../services/calenderProfileServices";

const AddEventModal = ({
  isOpen,
  handleClose,
  obj,
  refetchCalendar,
  school_Id,
}) => {
  const [startDate, setStartDate] = useState(formatDate(obj?.start));
  const [endDate, setEndDate] = useState(formatDate(obj?.end - 1));
  const [valueDropdown, setvalueDropdown] = useState();

  const { data: CalenderListData = [] } = useQuery(
    ["getCalenderList"],
    getCalenderList,
    {
      select: (res) =>
        res?.data?.map((val) => {
          return {
            value: val.id,
            label: val.name,
          };
        }),
      refetchOnWindowFocus: false,
    }
  );
  const { mutate: AddcalendarList, isLoading } = useMutation({
    mutationKey: "addCalendarList",
    mutationFn: (data) => addCalendarList(data),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          refetchCalendar();
          handleClose();
        }, 700);
      } else {
        toast.error(data.message);
      }
    },
  });
  useEffect(() => {
    return () => {
      console.log("ruunig Exit");
    };
  }, []);

  const handleOk = () => {
    if (!valueDropdown) {
      toast.error("select Profile", { duration: 1000 });
    } else {
      let payload = {
        profile_Id: valueDropdown.value,
        startDate: startDate,
        endDate: endDate,
        school_Id,
      };
      AddcalendarList(payload);
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            zIndex: 999999999,
          },
        }}
      />
      <div className="container mx-auto">
        <Modal
          isOpen={isOpen}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-55%, -45%)",
              position: "relative",
              width: "30%",
              justifyContent: "center",
              alignSelf: "center",
              height: "70vh",
            },
            overlay: {
              zIndex: "9",
            },
          }}
        >
          <div className="Header">
            <div className="title">
              <h3>Add event</h3>
            </div>
            <div className="CrossIcon">
              <CrossIcon onClick={handleClose} />
            </div>
          </div>
          <div>
            <h5 className="group">Select Profile</h5>
            <CommonDropDown
              list={CalenderListData}
              value={valueDropdown}
              onChange={(value) => setvalueDropdown(value)}
            />
          </div>
          <div>
            <h5 className="">Date From</h5>
            <CommonInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <h5 className="">Date To</h5>
            <CommonInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="btns">
            <div className="btn1">
              <CommonButton onClick={handleClose} text="Cancel" width="30%" />
            </div>
            <div>
              <CommonButton
                onClick={handleOk}
                text={isLoading ? customSpinner() : "Save"}
                width="30%"
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default AddEventModal;
