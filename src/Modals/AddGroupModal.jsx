import "../Modals/AddGroup.scss";
import Modal from "react-modal";
import React, { useState } from "react";
import CommonButton from "../Components/CommonComponents/CommonButton";
import CrossIcon from "../assets/icons/CrossIcon";
import CommonDropDown from "../Components/CommonComponents/CommonDropdown";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "../services/CommonServices";

const AddGroupModal = ({ isOpen, handleClose, handleSubmit }) => {
  const [selectedGroup, setselectedGroup] = useState();


  
  const handleOk = () => {
    handleSubmit(selectedGroup);
    handleClose();
  };

  const { data: groupList } = useQuery({
    queryKey: ["groupsList"],
    queryFn: () => getAllGroups(),
    select: (data) => {
      let groupdata = data?.data?.map((obj) => {
        return { ...obj, label: obj.name, value: obj.id };
      });
      return groupdata;
    },
  });

  const handleChange = (obj) => {
    setselectedGroup(obj);
  };
  console.log(selectedGroup, "selectedGroup");

  return (
    <>
      <div className="container mx-auto">
        <Modal
          isOpen={isOpen}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-55%, -45%)",
              width: "30%",
              justifyContent: "center",
              alignSelf: "center",
            },
          }}
        >
          <div className="Header">
            <div className="title">
              <h3>ADD TO A GROUP</h3>
            </div>
            <div className="CrossIcon">
              <CrossIcon onClick={handleClose} />
            </div>
          </div>
          <h5 className="group">Group Name</h5>
          <CommonDropDown
            value={selectedGroup}
            list={groupList}
            onChange={handleChange}
          />
          <div className="btns">
            <div className="btn1">
              <CommonButton onClick={handleClose} text="Cancel" width="30%" />
            </div>
            <div>
              <CommonButton onClick={handleOk} text="Save" width="30%" />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default AddGroupModal;
