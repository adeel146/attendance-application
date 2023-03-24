import React, { useState } from "react";
import Modal from "react-modal";

import { useQuery } from "@tanstack/react-query";

import "../Modals/AddGroup.scss";

import CrossIcon from "../assets/icons/CrossIcon";
import CommonButton from "../Components/CommonComponents/CommonButton";
import CommonDropDown from "../Components/CommonComponents/CommonDropdown";
import CustomTable from "../Components/CommonComponents/CommonTable/CustomTable";
import { InvolvedSchoolHeader } from "../constants/constants";
import { getUsersList } from "../services/usersServices";

const InvolvedSchoolModal = ({ isOpen, handleClose, data, handleClick }) => {
  const [selectedGroup, setselectedGroup] = useState();

  const columns = React.useMemo(() => InvolvedSchoolHeader(handleClick), []);
  // const data = React.useMemo(() => GroupsData, [GroupsData]);

  return (
    <>
      <div className="container mx-auto">
        <Modal
          isOpen={isOpen}
          style={{
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-55%, -45%)",
              width: "50%",
              justifyContent: "center",
              alignSelf: "center",
              height: "maxContent",
              maxHeight: "90vh",
            },
          }}
        >
          <div className="Header">
            <div className="title">
              <h3>ADD TO A School</h3>
            </div>
            <div className="CrossIcon">
              <CrossIcon onClick={handleClose} />
            </div>
          </div>
          <div className="mt-5">
            <CustomTable data={data || []} columns={columns} noPagination />
          </div>
          <div className="flex justify-end bottom-5	 right-5">
            <CommonButton onClick={handleClose} text="Save" width="10%" />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default InvolvedSchoolModal;
