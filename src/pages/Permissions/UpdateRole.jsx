import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdArrowForward, MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import CommonButton from "../../Components/CommonComponents/CommonButton";
import CommonDropDown from "../../Components/CommonComponents/CommonDropdown";
import CommonInput from "../../Components/CommonComponents/CommonInput";
import CommonProfile from "../../Components/CommonComponents/CommonProfile";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import ValidationSelect from "../../Components/CommonComponents/ValidationSelect";
import {
  GroupsHeader,
  GuardianList,
  HistoryData,
  HistoryHeader,
} from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import AddGroupModal from "../../Modals/AddGroupModal";
import AddNewRoleModal from "../../Modals/AddNewRoleModal";
import { getParentsList } from "../../services/parentServices";
import { getRoleById, getRoleDetailById } from "../../services/RolesServices";
import { getSchoolList } from "../../services/schoolServices";
import {
  addStudent,
  getOperatorList,
  getSingleStudent,
  updateStudent,
} from "../../services/studentServices";

function UpdateRole() {
  const navigate = useNavigate();
  console.log("running");
  const [GroupsData, setGroupsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [AddRoleModal, setAddRoleModal] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const { id: roleId } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const {
    data: RoleDetail,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["RoleDetail"],
    queryFn: () => getRoleDetailById(roleId),
    select: (data) => data?.data,
    refetchOnWindowFocus: false,
  });

  const handleGroupSubmit = (group) => {
    setGroupsData((prev) => [...prev, group]);
  };

  const data = React.useMemo(() => RoleDetail?.logs || [], [RoleDetail?.logs]);
  const columns = React.useMemo(HistoryHeader, []);


  return (
    <>
      <Toaster />
      {isOpen && (
        <AddGroupModal
          handleSubmit={handleGroupSubmit}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      )}
      {isFetching ? (
        <div className="h-[50vh] flex justify-center items-center">
          {customSpinner()}
        </div>
      ) : (
        <div className="p-10">
          <div className="w-3 mb-2 text-sm">
            <CommonButton text={t("go_back")} onClick={() => navigate(-1)} />
          </div>
          {/* general information section */}
          <div className="parent-information px-5 py-7  border-2 mb-7">
            <div className="flex justify-between px-10">
              <h1 className="text-primary_color font-semibold text-[20px]">
                General Information
              </h1>
              <MdEdit
                onClick={() => setAddRoleModal("Update")}
                className=" cursor-pointer mr-2 rounded-full  hover:bg-primary_orange hover:text-white text-primary_color"
                size={30}
              />
            </div>
            <div className="flex space-x-12 pt-6  text-primary_color font-semibold px-10">
              <h1>Role Name</h1>
              <h1>: {RoleDetail?.name}</h1>
            </div>
            <div className="horizontal-line border-t-2 border-dashed mt-10 border-gray-300 "></div>
            <div className="flex pt-6 justify-between px-10">
              <div className="flex text-primary_color font-semibold w-1/2">
                <div className="w-2/5">
                  <h1>Create by</h1>
                </div>
                <div className="w-2/5">
                  <h1>: {RoleDetail?.createdBy}</h1>
                </div>
              </div>
              {RoleDetail?.lastUpdatedBy && (
                <div className="flex  text-primary_color font-semibold w-1/2">
                  <div className="w-2/5">
                    <h1>Last Edited by</h1>
                  </div>
                  <div className="w-2/5">
                    <h1>: {RoleDetail?.lastUpdatedBy}</h1>
                  </div>
                </div>
              )}
            </div>
            {/* second */}
            <div className="flex pt-6 justify-between px-10">
              <div className="flex text-primary_color font-semibold w-1/2">
                <div className="w-2/5">
                  <h1>Creating Date</h1>
                </div>
                <div className="w-2/5">
                  <h1>: {RoleDetail?.createdAt?.slice(0, 10)} </h1>
                </div>
              </div>
              {RoleDetail?.lastUpdatedAt && (
                <div className="flex  text-primary_color font-semibold w-1/2">
                  <div className="w-2/5">
                    <h1>Last Edited Date</h1>
                  </div>
                  <div className="w-2/5">
                    <h1>: {RoleDetail?.lastUpdatedAt?.slice(0, 10)}</h1>
                  </div>
                </div>
              )}
            </div>
            {/* third */}
            <div className="flex pt-6 justify-between px-10">
              <div className="flex text-primary_color font-semibold w-1/2">
                <div className="w-2/5">
                  <h1>Creating Time</h1>
                </div>
                <div className="w-2/5">
                  <h1>: {RoleDetail?.createdAt?.slice(11, 16)}</h1>
                </div>
              </div>
            </div>
            {/* fourth */}
            <div className="flex pt-6 justify-between px-10">
              <div className="flex text-primary_color font-semibold w-1/2">
                <div className="w-2/5">
                  <h1>Inovlved Members</h1>
                </div>
                <div className="w-2/5">
                  <h1>: {RoleDetail?.memberCount} user</h1>
                </div>
              </div>
            </div>
            {/* fifth */}
            <div className="flex pt-6 justify-between px-10">
              <div className="flex text-primary_color font-semibold w-1/2">
                <div className="w-2/5">
                  <h1>School Names</h1>
                </div>
                <div className="w-2/5">
                  {RoleDetail?.schools?.length > 0 ? (
                    RoleDetail?.schools?.map(
                      (school) => school.selected && <h1>: {school.name}</h1>
                    )
                  ) : (
                    <h1>: NA</h1>
                  )}
                </div>
              </div>
            </div>

            <div className="permissions-and-modules mt-[8rem] px-10 mb-[2rem]">
              <h1 className=" text-primary_color font-semibold text-[20px]">
                Permissions and Modules
              </h1>
              <div className="flex flex-wrap">
                {RoleDetail?.modules?.map((val, index) => {
                  return (
                    <div key={index} className="w-1/3">
                      <h1 className="mt-5 text-primary_color font-semibold text-[18px]">
                        {index + 1}&nbsp; {val?.moduleName}
                      </h1>

                      {val?.list?.map((child, i) => {
                        return (
                          <ul
                            key={i}
                            style={{
                              listStyleType: "square",
                              paddingLeft: "20px",
                            }}
                            className="text-primary_color font-semibold "
                          >
                            <li>{child.moduleName}</li>
                          </ul>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* table */}
          <div className=" text-sm border-2 py-7 px-6 h-[30vh] overflow-auto ">
            <CustomTable data={data} columns={columns} noPagination />
          </div>
        </div>
      )}
      {AddRoleModal && (
        <AddNewRoleModal
          roleId={roleId}
          isOpen={AddRoleModal}
          handleClose={() => setAddRoleModal(false)}
          data={RoleDetail}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default UpdateRole;
