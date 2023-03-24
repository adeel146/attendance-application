import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import { Disclosure } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import FilterIcon from "../../assets/icons/FilterIcon";
import InputwithIcons from "../../Components/CommonComponents/CommonInput/InputwithIcons";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import DetailBar from "../../Components/CommonComponents/DetailBar";
import Drawyer from "../../Components/CommonComponents/Drawyer";
import { commonPageSize } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import { getSchoolList } from "../../services/schoolServices";
import { deleteSchool } from "../../services/schoolServices";

function School() {
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [delId, setDelId] = useState();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: schoolListData, isLoading } = useQuery({
    queryKey: ["schoollist", { pageNumber, pageSize, searchVal }],
    queryFn: () =>
      getSchoolList({
        name: searchVal,
        page_size: pageSize,
        page_index: pageNumber,
      }),

    keepPreviousData: true,
  });

  const { mutate: delSchool, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => deleteSchool(id),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        setisOpenDeleteModal(false);
        queryClient.invalidateQueries(["schoollist"]);
      } else {
        toast.error(data?.message);
      }
    },
  });

  function deleteList(id) {
    setisOpenDeleteModal(true);
    setDelId(id);
  }

  function deleteSingle() {
    delSchool(delId);
  }

  const data = React.useMemo(() => schoolListData?.data, [schoolListData]);

  const columns = React.useMemo(
    () => [
      {
        Header: " Name",
        accessor: "name",
      },
      {
        Header: "Principle Name",
        accessor: "principleName",
      },
      {
        Header: "Principle Email",
        accessor: "principleEmail",
      },
      {
        Header: "School Number",
        accessor: "schoolNumber",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Actions",
        Cell: (row) => (
          <div className="flex space-x-4 flex-row items-center">
            <div className=" hover:bg-white hover:text-primary_color  rounded-full">
              <MdDelete
                size={20}
                onClick={() => {
                  deleteList(row?.row?.original?.id);
                }}
              />
            </div>
            <div className=" hover:bg-white hover:text-primary_color  rounded-full">
              <MdEdit
                size={20}
                onClick={() => {
                  navigate(`update-school/${row?.row?.original?.id}`);
                }}
              />
            </div>
          </div>
        ),
      },
    ],
    []
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

  const updateSchool = () => {};

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={deleteSingle}
        text="School"
        loading={loadingDelete}
      />
      <div>
        <DetailBar
          total={`${schoolListData?.total_records} Schools`}
          heading={t("school_list")}
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />
        <div className="p-8">
          {/* <div className="mb-4">new user</div> */}
          <div
            onClick={() => navigate("add-school")}
            className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
          >
            <div>
              <AiFillPlusCircle size={23} />
            </div>
            <div className="pl-3  text-sm">
              <h4>Add New School</h4>
            </div>
          </div>
          <div className="flex  justify-between">
            <div className="w-[18em]">
              <InputwithIcons
                value={searchVal}
                name={t("seacrh_feild_placeholder")}
                clearInput={clearInput}
                onChange={(e) => setsearchVal(e.target.value)}
              />
            </div>
            <FilterIcon
              onClick={() => setIsOpenDrawyer(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="mt-2">
            <CustomTable
              isLoading={isLoading}
              data={data || []}
              columns={columns}
              // handleRowClick={handleRowClick}
              setpageNumber={setpageNumber}
              totalPages={schoolListData?.total_pages}
              setpageSize={setpageSize}
              page_number={schoolListData?.page_number}
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
      <Toaster />
    </>
  );
}

export default School;
