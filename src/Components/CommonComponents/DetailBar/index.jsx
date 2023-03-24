import React, { Fragment } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
import { t } from "i18next";

function DetailBar({
  heading,
  total,
  handleDownloadModalOpen,
  handleOpenBulkUser,
  handleOpenUserSetting,
}) {
  return (
    <>
      <div className="flex z-10 shadow-md text-primary_color justify-between px-8 py-1 border-b">
        <div className="uppercase">
          <h1 className="font-bold">{heading}</h1>
          <p className="text-xs italic">{total}</p>
        </div>
        <div className="hover:bg-primary_color_60 rounded-md bg-primary_orange">
          <Menu as="div" className="relative inline-block text-left rounded-md">
            <div>
              <Menu.Button className="flex rounded-md font-semibold peer mx-2 py-2 w-max	   hover:rounded-md text-white">
                {t("action")}
                <span className=" ml-1">
                  <AiFillCaretDown color={"white"} size={18} />
                </span>
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
              <Menu.Items className="absolute w-max right-0 border border-primary_color_60  z-10 mt-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    <Link className="text-gray-700 hover:bg-[wheat]    block px-4 py-2 text-sm">
                      {t("print")}
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      onClick={handleDownloadModalOpen}
                      className="text-gray-700 hover:bg-[wheat]  block px-4 py-2 text-sm"
                    >
                      {t("download")}
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                    <Link
                      onClick={handleOpenBulkUser}
                      className="text-gray-700 hover:bg-[wheat]    block px-4 py-2 text-sm"
                    >
                      {t("bulk_user")}
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      onClick={handleOpenUserSetting}
                      className="text-gray-700 hover:bg-[wheat]    block px-4 py-2 text-sm"
                    >
                      {t("all_user_setting")}
                    </Link>
                  </Menu.Item> */}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default DetailBar;
