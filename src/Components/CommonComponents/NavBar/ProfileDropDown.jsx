import React, { Fragment } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { t } from "i18next";

import UserPrfile from "../../../assets/icons/UserProfile";

function ProfileDropDown() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
    localStorage.clear();
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" relative font-semibold peer px-2 w-max	  hover:bg-primary_color_60 hover:rounded-md text-white">
          <UserPrfile color="white" size={30} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" right-0 absolute border border-primary_color_60 mt-2 w-max origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <>
                  <div className="dropdown-info  p-2">
                    <HiOutlineUserCircle
                      className="fill-primary_color"
                      size={70}
                    />
                    <div>
                      <h3>Test Name Data </h3>
                      <small>owner of subscription</small>
                    </div>
                  </div>
                  <div className="divider"></div>
                </>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {t("my_accout")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {t("activity_log")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {t("bill_payment")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {t("log_out")}
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfileDropDown;
