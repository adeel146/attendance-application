import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FaTh } from "react-icons/fa";
import { MdTableRows } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import classNames from "classnames";

import "./sidebar.scss";

function SideBar({ sidebarList }) {
  const navigate = useNavigate();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [selectedId, setselectedId] = useState(null);

  let classcss = classNames(
    "parent-div sticky top-[70px] transition-all h-[calc(100vh-70px)] overflow-auto  ",
    {
      toggleclass: toggleSidebar,
    }
  );
  const windowWidth = useRef(window.innerWidth);

  useEffect(() => {
    if (windowWidth.current < 1024) {
      setToggleSidebar(true);
    }
  }, []);

  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <div className={classcss}>
      <ul className="transition-all">
        <li>
          <div className="icon-tab">
            <MdTableRows
              onClick={handleToggle}
              size={toggleSidebar ? 25 : 20}
            />
          </div>
        </li>
        {sidebarList?.children?.map((obj, index) => {
          return (
            <li
              key={index}
              onClick={() => navigate(obj.url)}
              className={classNames({
                active_class: obj.url == window.location.pathname,
              })}
            >
              <div className="icon">
                <FaTh size={toggleSidebar ? 25 : 20} />
              </div>
              <span>
                <Link to={obj.url}>{obj.title}</Link>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
