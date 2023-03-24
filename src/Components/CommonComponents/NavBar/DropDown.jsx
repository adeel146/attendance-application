import React, { Fragment } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

function DropDown({ obj, disclosurebtn }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex font-semibold peer px-3  py-2 w-max	  hover:bg-primary_color_60 hover:rounded-md text-white">
          {obj?.title}
          <span className="ml-1">
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
        <Menu.Items className="absolute border min-w-max border-primary_color_60  z-10 mt-3 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {obj?.children?.map((obj, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      onClick={() =>
                        disclosurebtn && disclosurebtn.current.click()
                      }
                      to={obj.url}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {obj?.title}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDown;
