import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "react-modal";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

import "../Modals/AddGroup.scss";

import CrossIcon from "../assets/icons/CrossIcon";
import CommonButton from "../Components/CommonComponents/CommonButton";
import CommonInput from "../Components/CommonComponents/CommonInput";
import CustomTable from "../Components/CommonComponents/CommonTable/CustomTable";
import CustomCheckBox from "../Components/CommonComponents/CustomCheckBox";
import { AddMemberHeader, AddSchoolHeader } from "../constants/constants";
import { customSpinner } from "../constants/utilis";
import ParentModule from "../pages/Permissions/ParentModule";
import { getAcademicList } from "../services/acedamicYear";
import { getUserPermissions } from "../services/CommonServices";
import { addRole, updateRole } from "../services/RolesServices";
import { getSchoolList } from "../services/schoolServices";
import { getUsersList } from "../services/usersServices";
import InvolvedMembersModal from "./InvolvedMembersModal";
import InvolvedSchoolModal from "./InvolvedSchoolModal";

const AddNewRoleModal = (props) => {
  const { roleId, isOpen, handleClose, data, refetch } = props;

  const [permissionList, setpermissionList] = useState([]);
  const [SchoolData, setSchoolData] = useState([]);
  const [membersData, setmembersData] = useState([]);
  const [involvedSchoolModal, setinvolvedSchoolModal] = useState(false);
  const [involvedMembersData, setinvolvedMembersData] = useState(false);
  const [academicYear, setacademicYear] = useState(
    localStorage.getItem("academic_Year")
  );
  const queryClient = useQueryClient();

  const schema = yup.object().shape({});
  const defaultValue = {
    name: "",
    active: false,
    description: "",
    permissions: {
      module_raw_views: [],
    },
  };
  const {
    handleSubmit: SubmitForm,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isOpen == "Update") {
      setValue("name", data?.name);
      setValue("year_id", data?.year_id);
      setValue("active", data?.active);
      setpermissionList(data?.modulePermissions);
      setSchoolData(data?.schools);
      setmembersData(data?.users);
    }
  }, []);

  const { isFetching } = useQuery({
    queryKey: ["getUserPermissions"],
    queryFn: getUserPermissions,
    onSuccess: (data) => setpermissionList(data.data),
    refetchOnWindowFocus: false,
    enabled: isOpen == "Add" ? true : false,
  });

  const { data: academicList } = useQuery({
    queryKey: ["AcademicList"],
    queryFn: () => getAcademicList(),
    select: (data) =>
      data.data.map((obj) => {
        return { label: obj.name, value: obj.id };
      }),
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["getSchoolList"],
    queryFn: getSchoolList,
    select: (data) =>
      data.data.map((obj) => {
        return { ...obj, selected: false };
      }),
    onSuccess: (data) => setSchoolData(data),
    refetchOnWindowFocus: false,
    enabled: isOpen == "Add" ? true : false,
  });

  const {} = useQuery({
    queryKey: ["groupsList"],
    queryFn: getUsersList,
    select: (data) => {
      return { ...data, selected: false };
    },
    onSuccess: (data) => setmembersData(data.data),
    refetchOnWindowFocus: false,
    enabled: isOpen == "Add" ? true : false,
  });

  // const { isFetching: gettingbyID } = useQuery({
  //   queryKey: ["getRoleByID"],
  //   queryFn: () => getRoleById(roleId, academicYear),
  //   onSuccess: (data) => {
  //     reset(data.data);
  //     setpermissionList(data.data.permissions);
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: isOpen == "Update" ? true : false,
  // });

  const { mutate: Add, isLoading: AddingRole } = useMutation({
    mutationFn: (data) => addRole(data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["Roleslist", "RoleDetail"],
        });
        refetch();
        handleClose();
      } else {
        toast.error(data?.message);
      }
    },
  });
  const { mutate: Update, isLoading: updaingRole } = useMutation({
    mutationFn: (data) => updateRole(roleId, data),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["Roleslist", "RoleDetail"],
        });
        refetch();
        handleClose();
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleformSubmit = (data) => {
    console.log(data, "data");
    let selectedSchools = SchoolData?.filter((data) => data.selected)?.map(
      (obj) => obj.id
    );
    let selectedmembers = membersData
      ?.filter((data) => data.selected)
      ?.map((obj) => obj.id);
    let payload = {
      ...data,
      permissions: {
        module_raw_views: permissionList,
      },
      business_Id: null,
      schools: selectedSchools,
      users: selectedmembers,
    };
    console.log(payload, "payload");
    isOpen == "Add" ? Add(payload) : isOpen == "Update" ? Update(payload) : "";
  };

  const handelSchoolChange = (id) => {
    setSchoolData((prev) =>
      prev.map((obj) => {
        if (obj.id == id) {
          return { ...obj, selected: !obj.selected };
        } else {
          return obj;
        }
      })
    );
  };

  const handelMemberChange = (id) => {
    setmembersData((prev) =>
      prev.map((obj) => {
        if (obj.id == id) {
          return { ...obj, selected: !obj.selected };
        } else {
          return obj;
        }
      })
    );
  };

  let AddSchoolData = SchoolData?.filter((obj) => obj.selected);
  const schoolData = React.useMemo(() => AddSchoolData, [AddSchoolData]) || [];
  const schoolColumns = React.useMemo(AddSchoolHeader, []);
  let AddmemberData = () => membersData?.filter((obj) => obj.selected) || [];
  const memberData = React.useMemo(AddmemberData, [AddmemberData]);
  const memberColumns = React.useMemo(AddMemberHeader, []);

  return (
    <>
      <Toaster />
      <div className="container mx-auto">
        <Modal
          isOpen={isOpen == "Add" || isOpen == "Update"}
          style={{
            content: {
              width: "80%",
              margin: "auto",
              top: 100,
            },
          }}
        >
          <div className="Header">
            <div className=" uppercase   title">
              <h3>add new Role</h3>
            </div>
            <div className="CrossIcon">
              <CrossIcon onClick={handleClose} />
            </div>
          </div>
          {isFetching || AddingRole || updaingRole ? (
            <div className="h-[50vh] flex justify-center items-center">
              {customSpinner()}
            </div>
          ) : (
            <form onSubmit={SubmitForm(handleformSubmit)}>
              <div className=" flex  flex-wrap">
                <div className="capatilize w-full mr-5 mt-5">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CommonInput
                        {...field}
                        errors={errors}
                        label="role name"
                        placeholder="enter name"
                      />
                    )}
                  />
                </div>

                {/* <div className="capatilize w-[50%] mr-5 mt-5">
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <CommonInput
                      {...field}
                      errors={errors}
                      label="description"
                      placeholder="enter description"
                    />
                  )}
                />
              </div> */}
                {/* <div className=" capatilize w-[30%] mr-5 mt-5">
                  <Controller
                    control={control}
                    name="year_id"
                    render={({ field }) => (
                      <ValidationSelect
                        {...field}
                        errors={errors}
                        label="Academic Year"
                        placeholder="Select"
                        list={academicList}
                      />
                    )}
                  />
                </div> */}
                <div className=" capatilize w-[10%] mr-5 mt-12">
                  <Controller
                    control={control}
                    name="active"
                    render={({ field }) => (
                      <CustomCheckBox
                        {...field}
                        errors={errors}
                        label="status"
                        name="status"
                      />
                    )}
                  />
                </div>
              </div>
              <div className=" max-h-[50vh] overflow-auto text-primary_color mt-[7em] w-full border p-5 shadow-xl	rounded-md">
                <h2 className="text-lg font-bold mb-5">Involved Schools</h2>
                <div className="flex justify-between">
                  <div
                    onClick={() => setinvolvedSchoolModal(true)}
                    className="cursor-pointer w-max mb-4 hover:text-primary_orange flex items-center text-primary_color font-bold pt-3 text-base"
                  >
                    <div>
                      <AiFillPlusCircle size={23} />
                    </div>
                    <div className="pl-3 uppercase text-cm">
                      <h4> Add A School </h4>
                    </div>
                  </div>
                </div>
                <div>
                  <CustomTable
                    data={schoolData}
                    columns={schoolColumns}
                    noPagination
                  />
                </div>
              </div>
              <div className="border text-primary_color p-5 mt-5 shadow-xl	rounded-md">
                <h2 className="text-lg font-bold mb-5">
                  Permission And Modules
                </h2>
                {permissionList?.map((obj, index) => {
                  return (
                    <div className="border m-2 p-2">
                      <ParentModule
                        key={index}
                        obj={obj}
                        index={index}
                        parentId={null}
                        setpermissionList={setpermissionList}
                      />
                    </div>
                  );
                })}
              </div>
              <div className=" max-h-[50vh] overflow-auto text-primary_color mt-[7em] w-full border p-5 shadow-xl	rounded-md">
                <h2 className="text-lg font-bold mb-5">Role Members</h2>
                <div className="flex justify-between">
                  <div
                    onClick={() => setinvolvedMembersData(true)}
                    className="cursor-pointer w-max mb-4 hover:text-primary_orange flex items-center text-primary_color font-bold pt-3 text-base"
                  >
                    <div>
                      <AiFillPlusCircle size={23} />
                    </div>
                    <div className="pl-3 uppercase text-cm">
                      <h4> Add Member to this role</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <CustomTable
                    data={memberData}
                    columns={memberColumns}
                    noPagination
                  />
                </div>
              </div>
              <div className="flex justify-end mt-5 mb-10">
                <CommonButton
                  onClick={() => handleClose()}
                  className="mr-2"
                  text={t("cancel")}
                  width="10%"
                />
                <CommonButton type="submit" text={t("save")} width="10%" />
              </div>
            </form>
          )}
        </Modal>
      </div>
      {involvedSchoolModal && (
        <InvolvedSchoolModal
          isOpen={involvedSchoolModal}
          handleClose={() => setinvolvedSchoolModal(false)}
          data={SchoolData}
          handleClick={handelSchoolChange}
        />
      )}{" "}
      {involvedMembersData && (
        <InvolvedMembersModal
          isOpen={involvedMembersData}
          handleClose={() => setinvolvedMembersData(false)}
          data={membersData}
          handleClick={handelMemberChange}
        />
      )}
    </>
  );
};
export default AddNewRoleModal;
