import Modal from "react-modal";
import React from "react";
import CommonButton from "../Components/CommonComponents/CommonButton";
import CrossIcon from "../assets/icons/CrossIcon";
import CommonDropDown from "../Components/CommonComponents/CommonDropdown";
import { AiFillPlusCircle } from "react-icons/ai";
import CommonInput from "../Components/CommonComponents/CommonInput";
import CustomCheckBox from "../Components/CommonComponents/CustomCheckBox";
import { t } from "i18next";

const UserSettingModal = ({ handleClose, isOpen }) => {
  const handleOk = () => {
    handleClose();
  };
  return (
    <>
      <div className="">
        <Modal
          isOpen={
            isOpen
            /* Boolean describing if the modal should be shown or not. */
          }
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              overflow: "auto",
              maxHeight:"80%",
              position: "relative",
            },
           
          }}
        >
          <div className="p-2">
            <div className="flex justify-between items-center font-bold text-lg text-primary_color">
              <div className="">
                <h3>{t("user_profile")}</h3>
              </div>
              <div className="CrossIcon cursor-pointer">
                <CrossIcon onClick={handleClose} />
              </div>
            </div>

            <p className="pt-7 pb-2 text-sm font-semibold text-primary_color ">
              {t("customized")}
            </p>
            <div className="flex items-center font-bold pt-3 pb-4   text-primary_color">
              <div>
                <AiFillPlusCircle size={25} />
              </div>
              <div className="pl-2 ">
                <h4>{t("add_new")}</h4>
              </div>
            </div>

            {/* Input Fields Start */}

            <div className="pt-2">
              <div className=" border-2 rounded pr-10 py-3">
                <div className="flex items-center justify-evenly content-center ">
                  <div className="pr-4 font-bold text-lg text-blue-400">1.</div>
                  <div className="w-1/5 ">
                    <CommonDropDown label={t("feild_format")} />
                  </div>
                  <div className="w-1/3">
                    <CommonInput
                      placeholder={t("feild_name_placeholder")}
                      label={t("feild_name")}
                    />
                  </div>
                  <div className="w-1/6">
                    <CommonDropDown
                      label={t("user_type")}
                      placeholder={t("user_type_placeholder")}
                    />
                  </div>
                  <div className="pt-5 pr-8">
                    <CustomCheckBox label={t("checkbox")} />
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex justify-end pt-40 text-sm  ">
              <div className="mr-3">
                <CommonButton
                  onClick={handleClose}
                  text={t("cancel")}
                  width="40%"
                />
              </div>
              <div>
                <CommonButton onClick={handleOk} text={t("save")} width="40%" />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default UserSettingModal;
