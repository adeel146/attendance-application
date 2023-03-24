import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsDashCircleFill } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import { Disclosure } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  ProfilesData,
  ProfilesHeaders,
  StudentsHeaders,
} from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import {
  deleteCalenderList,
  getCalenderList,
  updateCalenderList,
} from "../../services/calenderProfileServices";
import { assignToSchool } from "../../services/termServices";

function CalendarProfile() {
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [schoolId, setschoolId] = useState(1);
  const [delId, setdelId] = useState();

  const [obj, setobj] = useState({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: calenderListData, isLoading } = useQuery({
    queryKey: ["calenderList", { pageNumber, pageSize }],
    queryFn: () =>
      getCalenderList({
        page_size: pageSize,
        page_index: pageNumber,
      }),

    keepPreviousData: true,
  });

  const { mutate: delCalender, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => deleteCalenderList(id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setisOpenDeleteModal(false);
        queryClient.invalidateQueries(["calenderList"]);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const { mutate: updateCalender } = useMutation({
    mutationFn: (props) => {
      return updateCalenderList(props.id, props.status);
    },
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success("status updated successfully");
        queryClient.invalidateQueries(["calenderList"]);
      } else {
        toast.error(data?.message);
      }
    },
  });

  const { data: assignToSchoolData = [] } = useQuery(
    ["getBySchoolId"],
    assignToSchool,
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

  const deleteAcademicList = () => {
    delCalender(delId);
  };
  function deleteCalender(id) {
    setisOpenDeleteModal(true);
    setdelId(id);
  }
  const handleDownloadClose = () => {
    setIsOpen(false);
  };

  const handleCloseBulUser = () => {
    setisOpenBulkUser(false);
  };

  const handleCloseUserSetting = () => {
    setisOpenUserSetting(false);
  };

  const handleExcelSubmit = (data) => {
    console.log(data);
  };
  const handlePdfSubmit = (data) => {
    console.log(data);
  };

  const clearInput = () => {
    setsearchVal("");
  };

  function updateCal(id, status) {
    updateCalender({ id, status });
  }

  const handleUpdate = (props) => {
    navigate(`edit/${props?.row?.original?.id}`);
  };

  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };
  const handledeleteProfile = () => {
    delCalender(obj?.row?.original?.id);
  };

  const data = React.useMemo(() => calenderListData?.data, [calenderListData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Profile Name",
        accessor: "name",
      },
      {
        Header: "Color",
        Cell: (row) => (
          <div className="flex">
            <div
              className="w-[60px] h-[25px]"
              style={{ background: `${row?.row?.original?.color}` }}
            ></div>
          </div>
        ),
      },
      {
        Header: "Active",
        Cell: (row) => (
          <div className="flex">
            <div
              className=" hover:bg-white hover:text-primary_color  rounded-full"
              onClick={() => {
                updateCal(row?.row?.original?.id, !row?.row?.original?.active);
              }}
            >
              {row?.row?.original?.active ? (
                <BsCheckCircleFill className="text-[#1A9202]" />
              ) : (
                <BsDashCircleFill className="text-[#FF0A16]" />
              )}
            </div>
          </div>
        ),
      },

      {
        Header: "Actions",
        Cell: (cell) => {
          return (
            <div className="flex">
              <MdDelete
                className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
                onClick={() => handleDelete(cell)}
                size={20}
              />
              <MdEdit
                className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
                onClick={() => handleUpdate(cell)}
                size={20}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const handleSchollChange = (obj) => {
    setschoolId(obj);
  };
  return (
    <>
      <Toaster />
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={handledeleteProfile}
        text="Calender"
        loading={loadingDelete}
      />
      <DownloadModal
        isOpen={isOpen}
        handleClose={handleDownloadClose}
        handleExcelSubmit={handleExcelSubmit}
        handlePdfSubmit={handlePdfSubmit}
      />
      <BulkUserModal isOpen={isOpenBulkUser} handleClose={handleCloseBulUser} />
      <UserSettingModal
        isOpen={isOpenUserSetting}
        handleClose={handleCloseUserSetting}
      />
      <div className="p-8">
        {/* <div className="mb-4">new user</div> */}
        <div
          onClick={() => navigate("add-profile")}
          className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
        >
          <div>
            <AiFillPlusCircle size={23} />
          </div>
          <div className="pl-3 uppercase text-xs">
            <h4>{t("new_profile")} </h4>
          </div>
        </div>
        <div className="flex  justify-between">
          <div className="flex">
            <div className="min-w-[18em]">
              <CommonDropDown
                isClearable
                // value={schoolId}
                // onChange={handleSchollChange}
                placeholder={t("select_school")}
                list={assignToSchoolData}
              />
            </div>
          </div>
          <FilterIcon
            className="cursor-pointer"
            onClick={() => setIsOpenDrawyer(true)}
          />
        </div>
        <div className="mt-2">
          {isLoading ? (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          ) : (
            <CustomTable
              data={data || []}
              columns={columns}
              setpageNumber={setpageNumber}
              totalPages={calenderListData?.total_pages}
              setpageSize={setpageSize}
              page_number={calenderListData?.page_number}
            />
          )}
        </div>
      </div>
      <Drawyer isOpen={isOpenDrawyer} setIsOpen={setIsOpenDrawyer}>
        {" "}
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center font-extrabold	 w-full justify-between rounded-lg px-4  text-left text-sm  text-primary_color hover:bg-primary_orange_60 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>GROUPS</span>
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
export default CalendarProfile;
