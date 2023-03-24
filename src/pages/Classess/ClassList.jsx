import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
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
import useDebounce from "../../Components/hooks/useDebounce";
import {
  ClassHeader,
  commonPageSize,
  StudentsHeaders,
} from "../../constants/constants";
import { customSpinner, singlevsplural } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import {
  delClass,
  getClases,
  updateClassStatus,
} from "../../services/ClassServices";
import { getSchoolList } from "../../services/schoolServices";
import { delStudent, getStudentsList } from "../../services/studentServices";

function Classes() {
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenConfirmationModal, setisOpenConfirmationModal] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [schoolId, setschoolId] = useState();
  const [obj, setobj] = useState({});
  const navigate = useNavigate();

  const debounceSearch = useDebounce(searchVal);
  const {
    data: classesList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "classesList",
      { pageNumber, pageSize, debounceSearch, schoolId },
    ],
    queryFn: () =>
      getClases({
        name: debounceSearch,
        page_size: pageSize,
        page_index: pageNumber,
        school_id: schoolId?.value,
      }),
    keepPreviousData: true,
  });

  const { data: SchoolList } = useQuery({
    queryKey: ["schooList"],
    queryFn: () => getSchoolList(),
    select: (res) =>
      res.data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      }),
    refetchOnWindowFocus: false,
  });
  const { mutate: delUser, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => delClass(id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setisOpenDeleteModal(false);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
  });
  const { mutate: mutateClassStatus, isLoading: statusChanging } = useMutation({
    mutationFn: () =>
      updateClassStatus(obj.row.original.id, !obj.row.original.active),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setisOpenConfirmationModal(false);
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
  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
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

  const handleUpdate = (props) => {
    console.log(props, "update-running");
    navigate(`update-class/${props.row.original.id}`);
  };
  const handleUpdateStatus = (cell) => {
    setobj(cell);
    setisOpenConfirmationModal(true);
  };

  const deleteUser = () => {
    delUser(obj.row.original.id);
  };
  const handleSchollChange = (obj) => {
    setschoolId(obj);
  };

  const data = React.useMemo(() => classesList?.data ?? [], [classesList]);
  const columns = React.useMemo(
    () => ClassHeader(handleDelete, handleUpdate, handleUpdateStatus),
    []
  );

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={deleteUser}
        text="Class"
        loading={loadingDelete}
      />
      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        handleClose={() => setisOpenConfirmationModal(false)}
        handleSubmit={mutateClassStatus}
        loading={statusChanging}
        statusConfirmation
      />
      <Toaster />
      <div>
        <DetailBar
          total={`${classesList?.total_records} Classes`}
          heading="classes list"
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />
        <div className="p-8">
          {/* <div className="mb-4">new user</div> */}
          <div
            onClick={() => navigate("add-class")}
            className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
          >
            <div>
              <AiFillPlusCircle size={23} />
            </div>
            <div className="pl-3 uppercase text-xs">
              <h4>{t("new_class")}</h4>
            </div>
          </div>
          <div className="flex  justify-between">
            <div className="flex">
              <div className="w-[18em] mr-5">
                <InputwithIcons
                  value={searchVal}
                  name={t("seacrh_feild_placeholder")}
                  clearInput={clearInput}
                  onChange={(e) => setsearchVal(e.target.value)}
                />
              </div>
              <div className="min-w-[18em]">
                <CommonDropDown
                  isClearable
                  value={schoolId}
                  onChange={handleSchollChange}
                  placeholder={t("select_school")}
                  list={SchoolList}
                />
              </div>
            </div>
            <FilterIcon
              className="cursor-pointer"
              onClick={() => setIsOpenDrawyer(true)}
            />
          </div>
          <div className="mt-2">
            <CustomTable
              isLoading={isLoading}
              data={data}
              columns={columns}
              setpageNumber={setpageNumber}
              totalPages={classesList?.total_pages}
              setpageSize={setpageSize}
              page_number={classesList?.page_number}
            />
          </div>
        </div>
      </div>
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
export default Classes;
