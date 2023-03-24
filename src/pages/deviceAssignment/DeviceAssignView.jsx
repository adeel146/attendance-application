import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
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
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import { commonPageSize, deviceTypeList } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import {
  getAssignedDevicesList,
  getDeviceList,
  removeEnrolledDevice,
} from "../../services/DeviceEnrollmentServices";
import { deleteDevice } from "../../services/DeviceEnrollmentServices";
import { getSchoolList } from "../../services/schoolServices";
import {
  assignToSchool,
  deleteTermList,
  getTermList,
} from "../../services/termServices";

function DeviceAssignView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [delId, setDelId] = useState("");
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [obj, setobj] = useState({});

  // const [schoolId, setschoolId] = useState(1);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({});

  const {
    data: deviceData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getDeviceList", { pageNumber, pageSize }],
    queryFn: () =>
      getAssignedDevicesList({
        page_size: pageSize,
        page_index: pageNumber,
      }),

    keepPreviousData: true,
  });

  // const { data: SchoolList } = useQuery({
  //   queryKey: ["schooList"],
  //   queryFn: () => getSchoolList(),
  //   select: (res) =>
  //     res.data.map((val) => {
  //       return {
  //         value: val.id,
  //         label: val.name,
  //       };
  //     }),
  //   refetchOnWindowFocus: false,
  // });

  // const { data: assignToSchoolData = [] } = useQuery(
  //   ["assignDataSchoolbyId"],
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

  const { mutate: delDeviceEnrol, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) =>
      removeEnrolledDevice(
        obj?.row.original.device_Id,
        obj?.row.original.class_Id
      ),
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

  const deleteEnrol = () => {
    delDeviceEnrol(obj.row.original.id);
  };

  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };
  console.log(obj, "obj");

  const handleUpdate = (props) => {
    navigate(`/device-enrollment/update/${props?.row?.original?.id}`);
  };

  const data = React.useMemo(() => deviceData?.data, [deviceData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Device Name",
        accessor: "deviceName",
      },
      {
        Header: "Class Name",
        accessor: "className",
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
              {/* <MdEdit
                className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
                onClick={() => handleUpdate(cell)}
                size={20}
              /> */}
            </div>
          );
        },
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
  const handleExcelSubmit = () => {
    console.log("Excel clicked");
  };
  const handlePdfSubmit = () => {
    console.log("Pdf clicked");
  };

  const clearInput = () => {
    setsearchVal("");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getTermList(searchVal);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, []);

  return (
    <>
      <div>
        <DetailBar
          total={`${deviceData?.total_records} Device Assigned`}
          heading="Device Assign"
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />
        <div className="p-8">
          {/* <div className="mb-4">new user</div> */}

          <div
            onClick={() => navigate("add")}
            className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
          >
            <div>
              <AiFillPlusCircle size={23} />
            </div>
            <div className="pl-3 uppercase text-xs">
              <h4>Enroll New Device</h4>
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
              {/* <div className="min-w-[18em]">
                <Controller
                  control={control}
                  name="school_id"
                  render={({ field }) => (
                    <ValidationSelect
                      {...field}
                      isClearable
                      errors={errors}
                      placeholder={t("select_school")}
                      list={assignToSchoolData}
                    />
                  )}
                />
              </div> */}
            </div>
            <FilterIcon
              className="cursor-pointer"
              onClick={() => setIsOpenDrawyer(true)}
            />
          </div>
          {isLoading ? (
            customSpinner()
          ) : (
            <div className="mt-2">
              <CustomTable
                data={data || []}
                columns={columns}
                setpageNumber={setpageNumber}
                totalPages={deviceData?.total_pages}
                setpageSize={setpageSize}
                page_number={deviceData?.page_number}
              />
            </div>
          )}
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
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={deleteEnrol}
        text="Assigned Device"
        loading={loadingDelete}
      />
      <Toaster />
    </>
  );
}

export default DeviceAssignView;
