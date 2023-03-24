import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router";

import { useMutation, useQuery } from "@tanstack/react-query";
import { t } from "i18next";

import InputwithIcons from "../../Components/CommonComponents/CommonInput/InputwithIcons";
import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import useDebounce from "../../Components/hooks/useDebounce";
import { commonPageSize, RolesHeaders } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import AddNewRoleModal from "../../Modals/AddNewRoleModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import { deleteRole, getRoles } from "../../services/RolesServices";

function RolesList() {
  const [searchVal, setsearchVal] = useState("");
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [pageNumber, setpageNumber] = useState(0);
  const [obj, setobj] = useState({});
  const [AddRoleModal, setAddRoleModal] = useState("");
  const navigate = useNavigate();

  const clearInput = () => {
    setsearchVal("");
  };
  const debounceSearch = useDebounce(searchVal);

  const {
    data: rolesList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Roleslist", { pageNumber, pageSize, debounceSearch }],
    queryFn: () =>
      getRoles({
        name: debounceSearch,
        page_size: pageSize,
        page_index: pageNumber,
      }),
    keepPreviousData: true,
  });

  const { mutate: delRole, isLoading: loadingDelete } = useMutation({
    mutationFn: () => deleteRole(obj?.cell.row.original.id),
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
    // setAddRoleModal("Update");
    // setobj(props);
    navigate(`update/${props.row.original.id}`);
  };
  const handleDelete = (props) => {
    setisOpenDeleteModal(true);
    setobj(props);
  };

  const data = React.useMemo(() => rolesList?.data, [rolesList]);
  const columns = React.useMemo(
    () => RolesHeaders(handleDelete, handleUpdate),
    []
  );

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setisOpenDeleteModal(false)}
        handleSubmit={delRole}
        text="User"
        loading={loadingDelete}
      />
      {AddRoleModal && (
        <AddNewRoleModal
          roleId={obj?.cell?.row?.original?.id}
          isOpen={AddRoleModal}
          handleClose={() => setAddRoleModal(false)}
          refetch={refetch}
        />
      )}
      <Toaster />
      <div className="p-8">
        {/* <div className="mb-4">new user</div> */}
        <div
          onClick={() => setAddRoleModal("Add")}
          className="cursor-pointer w-max mb-4 flex items-center text-primary_color font-bold pt-3 text-base"
        >
          <div>
            <AiFillPlusCircle size={23} />
          </div>
          <div className="pl-3 uppercase text-xs">
            <h4>New Role</h4>
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
          </div>
        </div>
        <div className="mt-2">
          <CustomTable
            data={data || []}
            columns={columns}
            setpageNumber={setpageNumber}
            totalPages={rolesList?.total_pages}
            setpageSize={setpageSize}
            isLoading={isLoading}
            page_number={rolesList?.page_number}

          />
        </div>
      </div>
    </>
  );
}

export default RolesList;
