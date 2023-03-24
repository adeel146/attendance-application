import { useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";

import { getToken } from "../constants/utilis";
import NavBar from "./CommonComponents/NavBar";
import SharedFooter from "./CommonComponents/SharedFooter";
import SideBar from "./CommonComponents/SideBar";

const PageLayout = (props) => {
  const { location, NavList } = props;
  const [sidebarList, setSidebarList] = useState([]);
  if (getToken()) {
    return (
      <>
        <NavBar NavList={NavList} setSidebarList={setSidebarList} />
        <div className="flex">
          <div>
            <SideBar location={location} sidebarList={sidebarList} />
          </div>
          <div className="w-full h-[calc(100% - 3.8em)]">
            <Outlet test="ttt" />
            <div className="mt-[8rem]">
              <SharedFooter />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (window.location = "/");
  }
};
export default PageLayout;
