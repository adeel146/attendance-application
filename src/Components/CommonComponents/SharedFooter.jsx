import React from "react";

import {
  FacebookIcon,
  InstaIcon,
  MessageBox,
  PhoneIcon,
  TwitterIcon,
} from "../../assets/icons/FooterSvgs";

const SharedFooter = () => {
  return (
    <div className="flex w-full justify-between px-5 py-3 mb-1 border border-[#CCCCCC] items-center">
      <div className="text-[#054562] text-sm">
        © 2022 CTS Creative Technology Solutions. All rights reserved
      </div>
      <div className="flex space-x-3 items-center">
        <InstaIcon />
        <TwitterIcon />
        <FacebookIcon />
        <PhoneIcon />
        <MessageBox />
      </div>
      <div>
        <p className="text-[#054562] text-sm">
          Privacy Policy . Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default SharedFooter;
