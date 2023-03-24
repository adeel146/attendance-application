import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCalendarAlt, FaTable } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";

import { Disclosure } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import Drawyer from "../../Components/CommonComponents/Drawyer";
import { commonPageSize, PeriodsDetailHeader } from "../../constants/constants";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import { deleteLecture } from "../../services/CourseServices";
import { deletePeriod, getLectureDetail } from "../../services/PeriodServices";
import CalendarView from "./CalendarView";

function PeriodsDetail() {
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [obj, setobj] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();
  const {
    state: { id, class_Id },
    state,
  } = useLocation();

  const {
    data: PeriodDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getLectureDetail"],
    queryFn: () => getLectureDetail(id),
  });

  const { mutate: handleLecture, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => deleteLecture(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setisOpenDeleteModal(false);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleDownloadClose = () => {
    setIsOpen(false);
  };
  const handleDownloadModalOpen = () => {
    setIsOpen(true);
  };
  const handleOpenBulkUser = () => {
    setisOpenBulkUser(true);
  };
  const handleCloseBulUser = () => {
    setisOpenBulkUser(false);
  };
  const handleOpenUserSetting = () => {
    setisOpenUserSetting(true);
  };
  const handleCloseUserSetting = () => {
    setisOpenUserSetting(false);
  };

  const clearInput = () => {
    setsearchVal("");
  };

  const handleDeletePeriod = () => {
    handleLecture(obj.row.original.id);
  };
  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };
  const handleUpdate = (props) => {
    navigate(`update-lecture`, {
      state: { data: props.row.original, class_Id },
    });
  };

  const data = React.useMemo(() => PeriodDetail?.data || [], [PeriodDetail]);
  const columns = React.useMemo(
    () => PeriodsDetailHeader(handleDelete, handleUpdate),
    []
  );
  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={handleDeletePeriod}
        text="Period"
        loading={loadingDelete}
      />
      <div>
        <div className="p-8">
          {/* <div className="mb-4">new user</div> */}
          <div className="w-3 mb-2 text-sm">
            <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
          </div>
          <div className="flex justify-between ">
            <div
              onClick={() => navigate("add-lecture", { state })}
              className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
            >
              <div>
                <AiFillPlusCircle size={23} />
              </div>
              <div className="pl-3 uppercase text-xs">
                <h4> Add Lecture</h4>
              </div>
            </div>
            <div className="mr-10 underline flex  uppercase text-primary_orange bold text-xs">
              <FaTable
                size={32}
                className={`ml-2  cursor-pointer ${
                  !showCalendar ? "text-primary_orange" : ""
                }`}
                onClick={() => setShowCalendar(false)}
              />
              <FaCalendarAlt
                size={30}
                className={`ml-2  cursor-pointer ${
                  showCalendar ? "text-primary_orange" : ""
                }`}
                onClick={() => setShowCalendar(true)}
              />
            </div>
          </div>
          <div className="mt-2">
            {showCalendar ? (
              <CalendarView data={PeriodDetail?.data} />
            ) : (
              <CustomTable
                setpageNumber={setpageNumber}
                setpageSize={setpageSize}
                data={data}
                columns={columns}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
      <DownloadModal isOpen={isOpen} handleClose={handleDownloadClose} />
      <BulkUserModal isOpen={isOpenBulkUser} handleClose={handleCloseBulUser} />
      <UserSettingModal
        isOpen={isOpenUserSetting}
        handleClose={handleCloseUserSetting}
      />
      <Drawyer isOpen={isOpenDrawyer} setIsOpen={setIsOpenDrawyer}>
        {" "}
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center font-extrabold	 w-full justify-between rounded-lg px-4  text-left text-sm  text-primary_color hover:bg-primary_orange_60 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>{t("groups")}</span>
                    <RiArrowDropDownLine
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-8 w-10 text-primary_color`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className=" mt-3 px-4 pb-2">
                    <div className="flex justify-between">
                      <CustomCheckBox label="Group Name" />
                      <CustomCheckBox label="Group Name" />
                    </div>
                    <div className="flex justify-between mt-3">
                      <CustomCheckBox label="Group Name" />
                      <CustomCheckBox label="Group Name" />
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center	 w-full justify-between rounded-lg  px-4 text-left text-sm font-extrabold text-primary_color hover:bg-primary_orange_60 hover:text-white focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                    <span>COURSES</span>
                    <RiArrowDropDownLine
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-8 w-10  text-primary_color`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-3 px-4 pb-2 flex flex-col space-y-2">
                    <CustomCheckBox label="Group Name" />
                    <CustomCheckBox label="Group Name" />
                    <CustomCheckBox label="Group Name" />
                    <CustomCheckBox label="Group Name" />
                    <CustomCheckBox label="Group Name" />
                    <CustomCheckBox label="Group Name" />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center	 w-full justify-between rounded-lg  px-4 text-left text-sm font-extrabold text-primary_color hover:bg-primary_orange_60 hover:text-white focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                    <span>COURSES</span>
                    <RiArrowDropDownLine
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-8 w-10  text-primary_color`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-3 px-4 pb-2 flex flex-col space-y-2">
                    <CustomCheckBox label="1A" />
                    <CustomCheckBox label="1B" />
                    <CustomCheckBox label="1C" />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </Drawyer>
    </>
  );
}

export default PeriodsDetail;
