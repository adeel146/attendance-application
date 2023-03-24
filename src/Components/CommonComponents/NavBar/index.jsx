import React, { Fragment, useRef } from "react";
import { useEffect } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

import { Transition } from "@headlessui/react";
import { Disclosure, Menu } from "@headlessui/react";

import CTS_LOGO from "../../../assets/icons/CTS_Logo";
import CalendarDropDown from "./CalendarDropdown";
import DropDown from "./DropDown";
import ProfileDropDown from "./ProfileDropDown";

function NavBar({ NavList, setSidebarList }) {
  const disclosurebtn = useRef();

  return (
    <>
      <div className="min-h-full sticky top-0 z-10 ">
        <Disclosure as="nav" className="bg-primary_color ">
          {({ open }) => (
            <>
              <div className="mx-auto !max-w-full px-4 sm:px-6 lg:px-8 ">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CTS_LOGO />
                    </div>
                    <div className="hidden xl:block">
                      <div className="ml-10 flex  space-x-4 items-center">
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                          {NavList?.map((obj, index) => {
                            return obj.type == "dropdown" ? (
                              <li
                                onClick={() => setSidebarList(obj)}
                                key={index}
                                className="text-[14px] items-center nav-item 2xl:px-2 sm:py-3"
                              >
                                <DropDown obj={obj} />
                              </li>
                            ) : (
                              <li
                                key={index}
                                onClick={() => setSidebarList([])}
                                className="text-[14px] text-white font-semibold px-2 sm:py-3"
                              >
                                <Link to={obj.url}>{obj.title}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="hidden xl:block">
                    <div className="ml-4 flex items-center">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex cursor-default max-w-xs items-center rounded-full text-sm focus:outline-none">
                            <div className="flex">
                              {/* <CalendarDropDown size={25} className="sm:mt-6" /> */}
                              <ProfileDropDown className="sm:mt-4" />
                            </div>
                          </Menu.Button>
                        </div>
                        {/* <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {NavList?.map((obj, index) => {
                              return obj.type == "dropdown" ? (
                                <li
                                  onClick={() => setSidebarList(obj)}
                                  key={index}
                                  className="text-[14px] items-center nav-item "
                                >
                                  <DropDown obj={obj} />
                                </li>
                              ) : (
                                <li
                                  key={index}
                                  onClick={() => setSidebarList([])}
                                  className="text-[14px] text-white font-semibold "
                                >
                                  <Link to={obj.url}>{obj.title}</Link>
                                </li>
                              );
                            })}
                          </Menu.Items>
                        </Transition> */}
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex xl:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      ref={disclosurebtn}
                      className="inline-flex items-center justify-center rounded-md  p-2 text-white"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <VscThreeBars
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <VscThreeBars
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="xl:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3  lg:flex lg:justify-between ">
                  <ul className="flex flex-col lg:flex-row list-none  items-center">
                    {NavList?.map((obj, index) => {
                      return obj.type == "dropdown" ? (
                        <li
                          onClick={() => {
                            setSidebarList(obj);
                          }}
                          key={index}
                          className="text-[14px] items-center nav-item sm:py-3"
                        >
                          <DropDown obj={obj} disclosurebtn={disclosurebtn} />
                        </li>
                      ) : (
                        <li
                          key={index}
                          onClick={() => {
                            disclosurebtn.current.click();
                            setSidebarList([]);
                          }}
                          className="text-[14px] text-white font-semibold px-2 sm:py-3"
                        >
                          <Link to={obj.url}>{obj.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex justify-center ">
                    {/* <CalendarDropDown size={25} className="sm:mt-6" /> */}
                    <ProfileDropDown className="sm:mt-4" />
                  </div>
                </div>
                {/* <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex justify-end ">
                    <div className="flex">
                      <CalendarDropDown size={25} className="sm:mt-6" />
                      <ProfileDropDown className="sm:mt-4" />
                    </div>
                  </div>
                </div> */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      {/* previous code */}
      {/* <nav className=" flex flex-wrap items-center justify-between px-2 py-1 bg-primary_color mb-3 sticky top-0 z-10 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div>
              <CTS_LOGO />
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {NavList?.map((obj, index) => {
                return obj.type == "dropdown" ? (
                  <li
                    onClick={() => setSidebarList(obj)}
                    key={index}
                    className="text-[14px] items-center nav-item px-2 sm:py-3"
                  >
                    <DropDown obj={obj} />
                  </li>
                ) : (
                  <li
                    key={index}
                    onClick={() => setSidebarList([])}
                    className="text-[14px] text-white font-semibold px-2 sm:py-3"
                  >
                    <Link to={obj.url}>{obj.title}</Link>
                  </li>
                );
              })}

              <li>
                <CalendarDropDown size={25} className="sm:mt-6" />
              </li>
              <li>
                <ProfileDropDown className="sm:mt-4" />
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default NavBar;
