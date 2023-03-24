import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router";

import { Disclosure } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import FilterIcon from "../../assets/icons/FilterIcon";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../../Components/CommonComponents/CustomCheckBox";
import DetailBar from "../../Components/CommonComponents/DetailBar";
import Drawyer from "../../Components/CommonComponents/Drawyer";
import { commonPageSize, DistrictHeader } from "../../constants/constants";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import {
  deleteDistrict,
  getDistrictList,
} from "../../services/districtServices";

function District() {
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [obj, setobj] = useState({});

  const navigate = useNavigate();

  const {
    data: distictData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getDistrictList", { pageNumber, pageSize }],
    queryFn: () =>
      getDistrictList({
        page_size: pageSize,
        page_index: pageNumber,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };

  const { mutate: delDistrict, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => deleteDistrict(id),
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

  const handleUpdate = (props) => {
    navigate(`/district-list/update-district/${props.row.original.id}`);
  };

  const data = React.useMemo(() => distictData?.data, [distictData]);
  const columns = React.useMemo(
    () => DistrictHeader(handleDelete, handleUpdate),
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

  const handledeleteDistrict = () => {
    delDistrict(obj.row.original.id);
  };

  return (
    <>
      <Toaster />
      {isOpenDeleteModal && (
        <ConfirmationModal
          isOpen={isOpenDeleteModal}
          handleClose={() => setisOpenDeleteModal(false)}
          handleSubmit={handledeleteDistrict}
          text="District"
          loading={loadingDelete}
        />
      )}
      <div>
        <DetailBar
          total={`${distictData?.total_records} Districts`}
          heading="District List"
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />
        <div className="p-8">
          {/* <div className="mb-4">new user</div> */}
          <div
            onClick={() => navigate("add-district")}
            className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
          >
            <div>
              <AiFillPlusCircle size={23} />
            </div>
            <div className="pl-3 uppercase text-xs">
              <h4> {t("add_new_district")}</h4>
            </div>
          </div>
          <div className="flex  justify-between">
            <div className="w-[18em]">
              {/* <InputwithIcons
                value={searchVal}
                name={t("search_feild_placeholder")}
                clearInput={clearInput}
                onChange={(e) => setsearchVal(e.target.value)}
              /> */}
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
              setpageNumber={setpageNumber}
              setpageSize={setpageSize}
              totalPages={distictData?.total_pages}
              page_number={distictData?.page_number}
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

export default District;
