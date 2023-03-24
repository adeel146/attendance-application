import React from "react";
import Modal from "react-modal";
import { FaArrowCircleDown } from "react-icons/fa";
import "./BulkUser.scss";
import CommonButton from "../Components/CommonComponents/CommonButton";
import Gif from "../Modals/93121-no-data-preview.gif";
import CrossIcon from "../assets/icons/CrossIcon";
import {t} from "i18next";

const BulkUserModal = ({ isOpen, handleClose }) => {
  Modal.setAppElement("#root");

  return (
    <>
      <Modal
        isOpen={isOpen}
        style={{
          content: {
            // position: "absolute",
            // left: "430px",
            // right: "400px",
            // border: "1px solid #ccc",
            // background: "#fff",
            // overflow: "auto",
            // WebkitOverflowScrolling: "touch",
            // borderRadius: "4px",
            // outline: "none",
            // padding: "20px",
            // width: "6450px",
            // height: "500px",
            top: "55%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            // marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            
          },
        }}
      >
        <div className="header">
          <div>
            <h4 className="title ">
              {t("bulk_add")}
            </h4>
          </div>
          <div className="closeicon">
            <CrossIcon onClick={handleClose} />
          </div>
        </div>
        <div className="downloadtempleteheading">
          <div className="Icon">
            <FaArrowCircleDown size="1.3rem" />
          </div>
          <div>
            <h5 className="download">
              {" "}
              {t("download_templete")} <span className="tag">{t("here")}</span>{" "}
            </h5>
          </div>
        </div>
        <div className="Border">
          <div className="ChooseFilebtn">
            <img className="gifimg" src={Gif} alt="DataGif" />
            <h4 className="insideimgtext ">
              {t("only")} <span className="bold">{t("csv")}</span> {t("files_with_no_more_than")}{" "}
              <span className="bold">{t("300_user")}</span>
            </h4>
            <div className="">
              {/* <label className="capitalize font-semibold flex items-center border-2 rounded bg-yellow-600 text-center"> Choose a file
            <input className="cursor-pointer  overflow-hidden opacity-10" type="file" name="file"/>
            </label> */}
              <label class=" flex flex-col items-center px-4 py-2 bg-primary_orange rounded tracking-wide uppercase border cursor-pointer hover:bg-primary_color font-semibold text-lg">
                <span class="mt-2 text-base leading-normal text-white">{t("choose_file")}</span>
                <input type="file" class="hidden" />
              </label>
            </div>

            {/* <CommonButton
              text="Choose a File"
              onClick={() => {
                console.log("clicked");
              }}
              width="100%"
            /> */}
          </div>
        </div>
        <div className="Cancelbtn">
          <CommonButton text={t("cancel")} onClick={handleClose} width="9rem" />
        </div>
      </Modal>
    </>
  );
};
export default BulkUserModal;
