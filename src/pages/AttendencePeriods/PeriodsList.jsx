import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import { Disclosure } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import FilterIcon from "../../assets/icons/FilterIcon";
import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import InputwithIcons from "../../Components/CommonComponents/CommonInput/InputwithIcons";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import DetailBar from "../../Components/CommonComponents/DetailBar";
import Drawyer from "../../Components/CommonComponents/Drawyer";
import {
  commonPageSize,
  PeriodsData,
  PeriodsHeader,
  statusList,
} from "../../constants/constants";
import { singlevsplural } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import {
  deletePeriod,
  getPeriodsList,
  updatePeriodStatus,
} from "../../services/PeriodServices";
import { assignToSchool } from "../../services/termServices";

function PeriodsList() {
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [statusFilter, setStatusFilter] = useState(true);
  const [obj, setobj] = useState({});
  const [isOpenConfirmationModal, setisOpenConfirmationModal] = useState(false);

  const navigate = useNavigate();

  // const { data: assignToSchoolData = [] } = useQuery(
  //   ["getBySchoolId"],
  //   assignToSchool,
  //   {
  //     select: (res) =>
  //       res?.data?.map((val) => {
  //         return {
  //           value: val.id,
  //           label: val.name,
  //         };
  //       }),
  //   }
  // );
  const {
    data: PeriodsList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getPeriodsList", { statusFilter, pageSize, pageNumber }],
    queryFn: () =>
      getPeriodsList({
        page_Size: pageSize,
        page_Index: pageNumber,
        active: statusFilter,
      }),
  });

  const { mutate: delPeriod, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => deletePeriod(id),
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

  const { mutate: mutatePeriodStatus, isLoading: statusChanging } = useMutation(
    {
      mutationKey: "changemutatePeriodStatus",
      mutationFn: () =>
        updatePeriodStatus(obj.row.original.id, !obj.row.original.active),
      onSuccess: async (data) => {
        if (data?.success) {
          toast.success(data?.message);
          setisOpenConfirmationModal(false);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
    }
  );

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
    delPeriod(obj.row.original.id);
  };
  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };
  const handleUpdate = (props) => {
    navigate(`update-periods/${props.row.original.id}`, {
      state: props.row.original,
    });
  };
  const handlePeriodDetail = (props) => {
    navigate(`period-detail`, { state: props.row.original });
  };
  const handleUpdateStatus = (cell) => {
    setobj(cell);
    setisOpenConfirmationModal(true);
  };

  const data = React.useMemo(() => PeriodsList?.data || [], [PeriodsList]);
  const columns = React.useMemo(
    () =>
      PeriodsHeader(
        handleDelete,
        handleUpdate,
        handlePeriodDetail,
        handleUpdateStatus
      ),
    []
  );

  const handleStatusChange = (obj) => setStatusFilter(obj.value);

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={handleDeletePeriod}
        text="Period"
        loading={loadingDelete}
      />
      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        handleClose={() => setisOpenConfirmationModal(false)}
        handleSubmit={mutatePeriodStatus}
        loading={statusChanging}
        statusConfirmation
      />
      <div>
        <DetailBar
          total={`${PeriodsList?.total_records} ${singlevsplural(
            PeriodsList?.total_records,
            "period"
          )}`}
          heading="Periods"
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />
        <div className="p-8">
          {/* <div className="mb-4">new user</div> */}
          <div
            onClick={() => navigate("add-period")}
            className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
          >
            <div>
              <AiFillPlusCircle size={23} />
            </div>
            <div className="pl-3 uppercase text-xs">
              <h4> Add Period</h4>
            </div>
          </div>
          <div className="flex  justify-between ">
            <div className="flex space-x-4">
              <div className="w-[18em]">
                <InputwithIcons
                  value={searchVal}
                  name={t("search_feild_placeholder")}
                  clearInput={clearInput}
                  onChange={(e) => setsearchVal(e.target.value)}
                />
              </div>
              {/* <div className="min-w-[18em]">
                <CommonDropDown
                  isClearable
                  // value={schoolId}
                  // onChange={handleSchollChange}
                  placeholder="Select School"
                  list={assignToSchoolData}
                />
              </div> */}
              <div className="min-w-[18em]">
                <CommonDropDown
                  isClearable
                  value={statusFilter}
                  onChange={handleStatusChange}
                  placeholder="Status"
                  list={statusList}
                />
              </div>
            </div>
            <FilterIcon
              onClick={() => setIsOpenDrawyer(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="mt-2">
            <CustomTable
              setpageNumber={setpageNumber}
              setpageSize={setpageSize}
              data={data}
              columns={columns}
              isLoading={isLoading}
              totalPages={PeriodsList?.total_pages}
              page_number={PeriodsList?.page_number}
            />
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

export default PeriodsList;
