import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import { Disclosure } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import FilterIcon from "../../assets/icons/FilterIcon";
import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import InputwithIcons from "../../Components/CommonComponents/CommonInput/InputwithIcons";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import DetailBar from "../../Components/CommonComponents/DetailBar";
import Drawyer from "../../Components/CommonComponents/Drawyer";
import { commonPageSize, UsersListHeader } from "../../constants/constants";
import { customSpinner, singlevsplural } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import { getUsersList } from "../../services/usersServices";

function UserList(props) {
  const { permission } = props;
  console.log(permission, "permission");
  const navigate = useNavigate();
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [schoolId, setschoolId] = useState(1);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);

  const { data: usersList, isLoading } = useQuery({
    queryKey: ["usersList", { pageNumber, pageSize }],
    queryFn: () =>
      getUsersList({
        page_size: pageSize,
        page_index: pageNumber,
        business_id: "",
      }),
  });

  const data = React.useMemo(() => usersList?.data || [], [usersList?.data]);
  const columns = React.useMemo(UsersListHeader, []);

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
  const handleExcelSubmit = () => {
    console.log("Excel clicked");
  };
  const handlePdfSubmit = () => {
    console.log("Pdf clicked");
  };

  const clearInput = () => {
    setsearchVal("");
  };
  const handleSchollChange = (obj) => {
    setschoolId(obj);
  };

  return (
    <>
      <div>
        <DetailBar
          total={`${usersList?.total_records} Users (Staff ${usersList?.staffCount},Teacher ${usersList?.teacherCount}, Student ${usersList?.studentCount})`}
          heading={t("users_list")}
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />{" "}
        {isLoading ? (
          <div className="h-[50vh] flex justify-center items-center">
            {customSpinner()}
          </div>
        ) : (
          <div className="p-8">
            {/* <div className="mb-4">new user</div> */}

            {/* <div
              onClick={() => navigate("add-user")}
              className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
            >
              <div>
                <AiFillPlusCircle size={23} />
              </div>
              <div className="pl-3 uppercase text-xs">
                <h4>New user</h4>
              </div>
            </div> */}
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
                {/* <div className="min-w-[18em]">
                  <CommonDropDown
                    isClearable
                    value={schoolId}
                    onChange={handleSchollChange}
                    placeholder="Select School"
                    list={[
                      {
                        label: "Allied School",
                        value: 1,
                      },
                      {
                        label: "Garrision School",
                        value: 2,
                      },
                      {
                        label: "Punjab School",
                        value: 3,
                      },
                    ]}
                  />
                </div> */}
              </div>
              <FilterIcon
                className="cursor-pointer"
                onClick={() => setIsOpenDrawyer(true)}
              />
            </div>
            <div className="mt-2">
              <CustomTable
                data={data}
                columns={columns}
                setpageNumber={setpageNumber}
                setpageSize={setpageSize}
                totalPages={usersList?.total_pages}
                page_number={usersList?.page_number}
              />
            </div>
          </div>
        )}
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

export default UserList;
