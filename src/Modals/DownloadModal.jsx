import React, { useState } from "react";
import CommonButton from "../Components/CommonComponents/CommonButton";
import "./Modals.scss";
import ExcelIcon from "../assets/icons/ExcelIcon";
import Modal from "react-modal";
import PdIcon from "../assets/icons/PdIcon";
import CrossIcon from "../assets/icons/CrossIcon";
import {t} from "i18next";

const DownloadModal = (props) => {
  const { isOpen, handleClose ,handleExcelSubmit ,handlePdfSubmit } = props;
  Modal.setAppElement("#root");
  
  return (
    <>
      <Modal
        isOpen={isOpen}
        closeTimeoutMS={200}
        style={{
          content: {
            // position: "absolute",
            // top: "100px",
            // left: "430px",
            // right: "530px",
            // bottom: "40px",
            // border: "1px solid #ccc",
            // background: "#fff",
            // overflow: "auto",
            // WebkitOverflowScrolling: "touch",
            // borderRadius: "4px",
            // outline: "none",
            // padding: "20px",
            // width: "530px",
            // height: "400px",
            // transition:"ease-in 1s"
            top                   : '50%',
            left                  : '45%',
            right                 : 'auto',
            bottom                : 'auto',
            // marginRight           : '50%',
            transform             : 'translate(-40%, -50%)'
          },
        }}
      >
        <div className="container items-center">
          <div className="flex justify-between px-7 pb-8 font-extrabold items-center">
            <div className="textcolor">
              <h3 className="">{t("download_option")}</h3>
            </div>
            <div className="ic cursor-pointer">
              <CrossIcon onClick={handleClose} />
            </div>
          </div>

          <div className="Icons">
            <div className="PdfIcon">
              <PdIcon onClick={handlePdfSubmit} color="red" size={100} />
            </div>
            <div className="Excelicon">
              <ExcelIcon onClick={handleExcelSubmit} color="green" size={100} />
            </div>
          </div>
          <div className="btn">
            <CommonButton onClick={handleClose} width="50%" text="Cancel" />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DownloadModal;
