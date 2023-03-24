import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
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
import { commonPageSize, CoursesHeaders } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import BulkUserModal from "../../Modals/BulkUserModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import DownloadModal from "../../Modals/DownloadModal";
import UserSettingModal from "../../Modals/UserSettingModal";
import { deleteAcedamicList } from "../../services/acedamicYear";
import {
  deleteCourse,
  getCoursebyId,
  getCourses,
} from "../../services/CourseServices";
import { updateStatusCourse } from "../../services/CourseServices";
import { assignToSchool } from "../../services/termServices";

function Courses() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchVal, setsearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBulkUser, setisOpenBulkUser] = useState(false);
  const [isOpenUserSetting, setisOpenUserSetting] = useState(false);
  const [isOpenDrawyer, setIsOpenDrawyer] = useState(false);
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [pageNumber, setpageNumber] = useState(0);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [delId, setdelId] = useState("");
  const [obj, setobj] = useState({});
  const [isOpenConfirmationModal, setisOpenConfirmationModal] = useState(false);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({});

  const schoolById = watch("school_id");

  const {
    data: coursesListData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coursesList", { pageNumber, pageSize, searchVal, schoolById }],
    queryFn: () =>
      getCourses({
        name: searchVal,
        page_size: pageSize,
        page_index: pageNumber,
        school_id: schoolById,
      }),

    keepPreviousData: true,
  });

  const { mutate: delCourse, isLoading: loadingDelete } = useMutation({
    mutationFn: (id) => deleteCourse(id),
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
      updateStatusCourse(obj.row.original.id, !obj.row.original.active),
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

  const { data: assignToSchoolData = [] } = useQuery(
    ["bySchoolId"],
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
    delCourse(obj.row.original.id);
  };

  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };

  const handleUpdate = (props) => {
    navigate(`update-course/${props.row.original.id}`);
  };

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

  const handleUpdateStatus = (cell) => {
    setobj(cell);
    setisOpenConfirmationModal(true);
  };

  const clearInput = () => {
    setsearchVal("");
  };
  const data = React.useMemo(() => coursesListData?.data, [coursesListData]);
  const columns = React.useMemo(
    () => CoursesHeaders(handleDelete, handleUpdate, handleUpdateStatus),
    []
  );
  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={deleteAcademicList}
        text="Course"
        loading={loadingDelete}
      />
      <div>
        <ConfirmationModal
          isOpen={isOpenConfirmationModal}
          handleClose={() => setisOpenConfirmationModal(false)}
          handleSubmit={mutateClassStatus}
          loading={statusChanging}
          statusConfirmation
        />
        <DetailBar
          total={`${coursesListData?.total_records} Schools`}
          heading={"Courses"}
          handleDownloadModalOpen={handleDownloadModalOpen}
          handleOpenBulkUser={handleOpenBulkUser}
          handleOpenUserSetting={handleOpenUserSetting}
        />
        <div className="p-8">
          <div
            onClick={() => navigate("add-course")}
            className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
          >
            <div>
              <AiFillPlusCircle size={23} />
            </div>
            <div className="pl-3 uppercase text-xs">
              <h4>{t("new_course")}</h4>
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
              data={data || []}
              columns={columns}
              setpageNumber={setpageNumber}
              totalPages={coursesListData?.total_pages}
              setpageSize={setpageSize}
              page_number={coursesListData?.page_number}
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
      <Toaster />
    </>
  );
}

export default Courses;
