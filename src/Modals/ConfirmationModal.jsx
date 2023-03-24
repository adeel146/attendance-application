import React, { useState } from "react";
import Modal from "react-modal";

import CrossIcon from "../assets/icons/CrossIcon";
import CommonButton from "../Components/CommonComponents/CommonButton";
import { customSpinner } from "../constants/utilis";

const ConfirmationModal = ({
  text,
  isOpen,
  handleClose,
  handleSubmit,
  loading,
  statusConfirmation,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        style={{
          content: {
            top: "45%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            minWidth: "500px",
            height: "250px",
            borderRadius: "10px",
          },
        }}
      >
        <div>
          <div className="flex justify-end cursor-pointer">
            <CrossIcon onClick={handleClose} />
          </div>
          <div className="justify-center text-center pt-8">
            <div className="font-bold text-xl tracking-wide font-serif">
              <h2 className="mb-2">
                {statusConfirmation ? "Change Status" : "Delete"} {text}
              </h2>
              <h2>
                Are you Sure want to{" "}
                {statusConfirmation ? "Change Status" : "Delete"} {text}?
              </h2>
            </div>
          </div>
          {loading ? (
            <div className="mt-5">{customSpinner()}</div>
          ) : (
            <div className="flex justify-center mt-5 space-x-4">
              <CommonButton
                onClick={handleSubmit}
                className=""
                text={statusConfirmation ? "Save" : "Delete"}
                width="35%"
              />

              <CommonButton text="Cancel" width="35%" onClick={handleClose} />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ConfirmationModal;
