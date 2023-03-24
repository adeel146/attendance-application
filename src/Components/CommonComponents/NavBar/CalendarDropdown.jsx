import React, { Fragment } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import { Link } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { getAcademicList } from "../../../services/acedamicYear";

function CalendarDropDown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" relative font-semibold peer px-2 w-max	  hover:bg-primary_color_60 hover:rounded-md text-white">
          <MdOutlineEditCalendar color="white" size={30} />
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
          {/* <div className="py-1"> */}
          {/* {academicList?.data?.map((obj, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      onClick={() =>
                        localStorage.setItem("academic_Year", obj.id)
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-2 py-2 text-sm"
                      )}
                    >
                      {obj.name}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default CalendarDropDown;
