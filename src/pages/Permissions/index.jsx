import { Tab } from "@headlessui/react";

import { TabsList } from "../../constants/constants";
import RolesList from "./RolesList";
import UserPermission from "./UserPermission";
import UserRoleManagement from "./UserRoleManagement";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Permissions() {
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      {/* <Tab.Group>
        <Tab.List className="flex w-4/5 m-auto space-x-1 rounded-xl bg-primary_color_60 p-1">
          {TabsList.map((tab, index) => {
            return (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full min-w-max rounded-lg py-2.5 text-sm font-medium leading-5 text-primary_orange",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "!text-white hover:bg-white hover:!text-primary_orange"
                  )
                }
              >
                {tab}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <RolesList />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <UserRoleManagement />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <UserPermission />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group> */}
      <RolesList />
    </div>
  );
}
export default Permissions;
