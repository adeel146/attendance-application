import { BsCheckCircleFill, BsDashCircleFill } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";

import CustomCheckBox from "../Components/CommonComponents/CustomCheckBox";
import { getDayfromId, UTCtoCurrent } from "./utilis";

export const contentType = "application/json";
export const commonPageSize = 10;
export const DubaiPhoneNumberRegex = "";
export const DubaiLandlineRegex = "";

export const emiratesIdRegex =
  /^7(1\d|2[1-9]|3[0-1]|4[1-3]|5[1-6]|6[1-7])(-)?((0[1-9])|([1-2][0-9])|(3[0-1]))(\d{2})(\d{4})(\d)(-)?$/g;

export const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const statusList = [
  { label: "True", value: true },
  { label: "False", value: false },
];
export let extensionArr = ["image/png", "image/jpeg"];

export const GuardianList = [
  { label: "Mother", value: 1 },
  { label: "Father", value: 2 },
  { label: "Uncle", value: 3 },
  { label: "Step Mother", value: 4 },
  { label: "Brother", value: 5 },
  { label: "Sister", value: 6 },
  { label: "Aunt", value: 7 },
  { label: "Grandfather", value: 8 },
  { label: "Grandmother", value: 9 },
  { label: "Grandparent", value: 10 },
  { label: "Guardian", value: 11 },
  { label: "Self", value: 12 },
  { label: "Spouse", value: 13 },
  { label: "Step Father", value: 14 },
];

export const SubscriptionType = [
  { label: "Accounts", value: 1 },
  { label: "Users", value: 2 },
];

export let navList = [
  {
    text: "Dashboard",
    to: "/dashboard",
  },
  {
    dropdownName: "User Setup",
    list: [
      { name: "Users List", value: 1, to: "/users-list" },
      { name: "Classes", value: 2, to: "/class" },
      { name: "Groups", value: 3, to: "/groups" },
      { name: "User Role & Permission", value: 4, to: "/permissions" },
    ],
  },
  {
    dropdownName: "Organization Setup",
    list: [
      { name: "Academic Year", value: 1, to: "/academic-Year" },
      { name: "Term", value: 2, to: "/Term" },
      { name: "Calender Profile", value: 3, to: "/calender-profile" },
      { name: "Calender", value: 4, to: "/calender" },
      { name: "Periods", value: 5, to: "/periods" },
      { name: "Attendence Mode", value: 5, to: "/attendence-mode" },
      { name: "Courses", value: 6, to: "/courses" },
      {
        name: "Email and Notification",
        value: 7,
        to: "/notification",
      },
      { name: "District", value: 8, to: "/district-list" },
      { name: "School", value: 9, to: "/schools-list" },
      { name: "Branding Setup", value: 10, to: "/brandiing-setup" },
    ],
  },
  {
    dropdownName: "Devices",
    list: [
      { name: "Device Enrollment", value: 1, to: "/device-enrollment" },
      { name: "Device Assignment", value: 2, to: "/device-assignment" },
    ],
  },
  {
    dropdownName: "Reports",
    list: [
      { name: "Events", value: 1, to: "/events" },
      { name: "Jobs", value: 2, to: "/jobs" },
      { name: "Reports", value: 2, to: "/reports" },
    ],
  },
  {
    dropdownName: "Integration",
    list: [
      { name: "API Documentation", value: 1, to: "/api-documentation" },
      { name: "API Integration", value: 2, to: "/api-integration" },
      { name: "Directories", value: 3, to: "/directories" },
    ],
  },
  {
    dropdownName: "Billing",
    list: [
      { name: "Subscription", value: 1, to: "/subscripton" },
      { name: "Payment", value: 2, to: "/payment" },
    ],
  },
  {
    dropdownName: "Security",
    list: [
      { name: "Security", value: 1, to: "/security" },
      { name: "Login Setting", value: 2, to: "/login-security" },
    ],
  },
];

export const TabsList = [
  " Roles Management",
  "User Roles Assigment",
  // "Users & Permissions",
];
export const BusinessTabsList = [
  "User Information",
  "Subscriptions",
  "Users List",
];

export const items = [
  {
    label: (
      <div className="dropdown-info">
        <HiOutlineUserCircle className="fill-primary_color" size={70} />
        <div>
          <h3>Test Name Data eaaad</h3>
          <small>owner of subscription</small>
        </div>
      </div>
    ),
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a className="ml-20" href="https://www.aliyun.com">
        My Account
      </a>
    ),
    key: "1",
  },
  {
    label: (
      <a className="ml-20" href="https://www.aliyun.com">
        Activity Log
      </a>
    ),
    key: "2",
  },
  {
    label: (
      <a className="ml-20" href="https://www.aliyun.com">
        Billing And Payment
      </a>
    ),
    key: "3",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a className="ml-20" href="https://www.aliyun.com">
        Logount
      </a>
    ),
    key: "4",
  },
];

export const weekList = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];
export const deviceTypeList = [
  {
    label: "Camera",
    value: 1,
  },
  {
    label: "IPad",
    value: 2,
  },
  {
    label: "Tablet",
    value: 3,
  },
];
export const RolesHeaders = (handleDelete, handleUpdate) => {
  return [
    {
      Header: "Roll Name",
      accessor: "name",
    },

    {
      Header: "UserCount",
      accessor: "userCount",
    },
    {
      Header: "Actions",
      Cell: (cell) => (
        <div className="flex space-x-4 flex-row items-center">
          <div className=" hover:bg-white hover:text-primary_color  rounded-full">
            <MdDelete size={20} onClick={() => handleDelete(cell)} />
          </div>
          <div className=" hover:bg-white hover:text-primary_color  rounded-full">
            <MdEdit onClick={() => handleUpdate(cell)} size={20} />
          </div>
        </div>
      ),
    },
  ];
};

export const SchoolHeader = (deleteSchoolList) => [
  {
    Header: " Name",
    accessor: "name", // accessor is the "key" in the data
  },
  {
    Header: "Principle Name",
    accessor: "principleName",
  },
  {
    Header: "Principle Email",
    accessor: "principleEmail",
  },
  {
    Header: "School Number",
    accessor: "schoolNumber",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "Actions",
    Cell: (cell) => (
      <div className="flex space-x-4 flex-row items-center">
        <div className=" hover:bg-white hover:text-primary_color  rounded-full">
          <MdDelete size={20} onClick={() => deleteSchoolList(cell)} />
        </div>
        <div className=" hover:bg-white hover:text-primary_color  rounded-full">
          <MdEdit size={20} />
        </div>
      </div>
    ),
  },
];
export const StudentsHeaders = (handleDelete, handleUpdate) => {
  return [
    {
      Header: "Full Name",
      accessor: "title",
    },

    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },

    {
      Header: "Actions",
      Cell: (cell) => {
        // console.log(cell, "cell");
        return (
          <div className="flex">
            <MdDelete
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleDelete(cell)}
              size={20}
            />
            <MdEdit
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleUpdate(cell)}
              size={20}
            />
          </div>
        );
      },
    },
  ];
};
export const SubscriptionsHeaders = (handleDelete, handleUpdate) => {
  return [
    {
      Header: "Full Name",
      accessor: "name",
    },

    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Price",
      Cell: (cell) => <p>{" " + "$" + cell.row.original.priceInUSD}</p>,
    },
    {
      Header: "Total Users",
      accessor: "numberOfUsers",
    },
    {
      Header: "Duration Days",
      accessor: "durationDays",
    },
    {
      Header: "Type",
      Cell: (cell) => {
        let obj = SubscriptionType?.find(
          (obj) => cell?.row?.original?.subscription_Type == obj.value
        );
        return <p>{obj?.label}</p>;
      },
    },

    {
      Header: "Actions",
      Cell: (cell) => {
        // console.log(cell, "cell");
        return (
          <div className="flex">
            <MdDelete
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleDelete(cell)}
              size={20}
            />
            <MdEdit
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleUpdate(cell)}
              size={20}
            />
          </div>
        );
      },
    },
  ];
};
export const BusinessHeaders = (handleDelete, handleUpdate) => {
  return [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Full Name",
      accessor: "name",
    },

    {
      Header: "Domain",
      accessor: "domain",
    },
    {
      Header: "Owner Type",
      accessor: "type",
    },

    {
      Header: "Current Subscription",
      Cell: (cell) => cell?.row?.original?.currentSubscription?.planName,
    },
    {
      Header: "Start Date",
      Cell: (cell) =>
        cell?.row?.original?.currentSubscription?.startDate?.slice(0, 10),
    },
    {
      Header: "End Date",
      Cell: (cell) =>
        cell?.row?.original?.currentSubscription?.endDate?.slice(0, 10),
    },
    {
      Header: "Active",
      Cell: (cell) =>
        cell?.row?.original?.currentSubscription?.isActive ? (
          <BsCheckCircleFill className="text-[#1A9202]" />
        ) : (
          <BsDashCircleFill className="text-[#FF0A16]" />
        ),
    },
    {
      Header: "Actions",
      Cell: (cell) => {
        // console.log(cell, "cell");
        return (
          <div className="flex">
            {/* <MdDelete
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleDelete(cell)}
              size={20}
            /> */}
            <MdEdit
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleUpdate(cell)}
              size={20}
            />
          </div>
        );
      },
    },
  ];
};
export const BrandingSetupHeaders = (handleDelete, handleUpdate) => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "School Name",
      accessor: "schoolName",
    },

    {
      Header: "Primary Color",
      Cell: (row) => (
        <div className="flex">
          <div
            className="w-[60px] h-[25px]"
            style={{ background: `${row?.row?.original?.parentColor}` }}
          ></div>
        </div>
      ),
    },
    {
      Header: "Primary Light",
      Cell: (row) => (
        <div className="flex">
          <div
            className="w-[60px] h-[25px]"
            style={{ background: `${row?.row?.original?.parentColor60}` }}
          ></div>
        </div>
      ),
    },
    {
      Header: "Secondary Color",
      Cell: (row) => (
        <div className="flex">
          <div
            className="w-[60px] h-[25px]"
            style={{ background: `${row?.row?.original?.parentOrange}` }}
          ></div>
        </div>
      ),
    },
    {
      Header: "Secondary Light",
      Cell: (row) => (
        <div className="flex">
          <div
            className="w-[60px] h-[25px]"
            style={{ background: `${row?.row?.original?.parentOrange60}` }}
          ></div>
        </div>
      ),
    },
    {
      Header: "Actions",
      Cell: (cell) => {
        return (
          <div className="flex">
            {/* <MdDelete
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleDelete(cell)}
              size={20}
            /> */}
            <MdEdit
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleUpdate(cell)}
              size={20}
            />
          </div>
        );
      },
    },
  ];
};
export const CoursesHeaders = (
  handleDelete,
  handleUpdate,
  handleUpdateStatus
) => {
  return [
    {
      Header: "Name",
      accessor: "name",
    },

    {
      Header: "Status",
      accessor: "active",
      Cell: ({ value, cell }) => {
        return (
          <p onClick={() => handleUpdateStatus(cell)}>
            {value ? (
              <BsCheckCircleFill className="text-[#1A9202]" />
            ) : (
              <BsDashCircleFill className="text-[#FF0A16]" />
            )}
          </p>
        );
      },
    },
    {
      Header: "Actions",
      Cell: (cell) => {
        return (
          <div className="flex">
            <MdDelete
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleDelete(cell)}
              size={20}
            />
            <MdEdit
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleUpdate(cell)}
              size={20}
            />
          </div>
        );
      },
    },
  ];
};

export const ProfilesHeaders = (handleDelete, handleUpdate) => {
  return [
    {
      Header: "Profile Name",
      accessor: "col1",
    },

    {
      Header: "Color",
      accessor: "col2",
    },
    {
      Header: "Status",
      accessor: "col3",
    },

    {
      Header: "Actions",
      Cell: (cell) => {
        return (
          <div className="flex">
            <MdDelete
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleDelete(cell)}
              size={20}
            />
            <MdEdit
              className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
              onClick={() => handleUpdate(cell)}
              size={20}
            />
          </div>
        );
      },
    },
  ];
};

export const ProfilesData = () => [
  {
    col1: "Test Profile",
    col2: "#ff1542",
    col3: "true",
  },
  {
    col1: "Test Profile",
    col2: "#ff1542",
    col3: "true",
  },
  {
    col1: "Test Profile",
    col2: "#ff1542",
    col3: "false",
  },
];

export const ParentsHeader = (handleDelete, handleUpdate) => [
  {
    Header: "Full Name",
    accessor: "title", // accessor is the "key" in the data
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone Number",
    accessor: "mobile",
  },

  {
    Header: "Actions",
    Cell: (cell) => {
      return (
        <div className="flex">
          <MdDelete
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleDelete(cell)}
            size={20}
          />
          <MdEdit
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleUpdate(cell)}
            size={20}
          />
        </div>
      );
    },
  },
];

export const StaffHeader = (handleDelete, handleUpdate) => [
  {
    Header: "Full Name",
    accessor: "title", // accessor is the "key" in the data
  },

  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Status",
    accessor: "active",
    Cell: ({ value }) => {
      return (
        <p>
          {value ? (
            <BsCheckCircleFill className="text-[#1A9202]" />
          ) : (
            <BsDashCircleFill className="text-[#FF0A16]" />
          )}
        </p>
      );
    },
  },
  {
    Header: "Actions",
    Cell: (cell) => {
      return (
        <div className="flex">
          <MdDelete
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleDelete(cell)}
            size={20}
          />
          <MdEdit
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleUpdate(cell)}
            size={20}
          />
        </div>
      );
    },
  },
];

export const AttendenceModeHeader = (handleDelete, handleUpdate) => [
  {
    Header: "One Time Attende",
    accessor: "oneTime",
  },
  {
    Header: "Period by Period",
    accessor: "period",
  },
  {
    Header: "2-time attendance/day",
    accessor: "twoTime",
  },

  // {
  //   Header: "Status",
  //   accessor: "active",
  //   Cell: ({ value }) => {
  //     return (
  //       <p>
  //         {value ? (
  //           <BsCheckCircleFill className="text-[#1A9202]" />
  //         ) : (
  //           <BsDashCircleFill className="text-[#FF0A16]" />
  //         )}
  //       </p>
  //     );
  //   },
  // },
  // {
  //   Header: "Actions",
  //   Cell: (cell) => {
  //     return (
  //       <div className="flex">
  //         <MdDelete
  //           className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
  //           onClick={() => handleDelete(cell)}
  //           size={20}
  //         />
  //         <MdEdit
  //           className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
  //           onClick={() => handleUpdate(cell)}
  //           size={20}
  //         />
  //       </div>
  //     );
  //   },
  // },
];
export const DistrictData = () => [
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
  {
    col1: "Test District Name ",
    col2: "johar town lhr",
    col3: "Test User",
    col4: "0307-1231231",
    col5: "test@gmail.com",
    col6: "TestAdmin",
  },
];
export const DistrictHeader = (handleDelete, handleUpdate) => [
  {
    Header: "Name of District",
    accessor: "name", // accessor is the "key" in the data
  },

  {
    Header: "Actions",
    Cell: (cell) => {
      return (
        <div className="flex">
          <MdDelete
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleDelete(cell)}
            size={20}
          />
          <MdEdit
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleUpdate(cell)}
            size={20}
          />
        </div>
      );
    },
  },
];

export const SchoolsHeader = () => [
  {
    Header: "Full Name",
    accessor: "col1", // accessor is the "key" in the data
  },
  {
    Header: "Address",
    accessor: "col2",
  },
  {
    Header: "Contact Name",
    accessor: "col3",
  },
  {
    Header: "Phone number",
    accessor: "col4",
  },
  {
    Header: "Email Address",
    accessor: "col5",
  },
  {
    Header: "Assigned Admins",
    accessor: "col6",
  },
];
export const GroupsData = () => [
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "Mubarak Bin Mohammad School",
    col4: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "Mubarak Bin Mohammad School",
    col4: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "Mubarak Bin Mohammad School",
    col4: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "Mubarak Bin Mohammad School",
    col4: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "Mubarak Bin Mohammad School",
    col4: "28 /09 / 2022 -12:00AM",
  },
];
export const GroupsHeader = () => [
  {
    Header: "Group Name",
    accessor: "name",
  },
  {
    Header: "Member Count",
    accessor: "memberCount",
  },
  {
    Header: "School Name",
    accessor: "school",
  },
  {
    Header: "Assigned At The Date",
    accessor: "createdAt",
    Cell: ({ value }) => <p>{value?.slice(0, 10)}</p>,
  },
];

export const TermHeader = () => [
  {
    Header: "Duration",
    accessor: "col1",
  },
  {
    Header: "Link Academic Year",
    accessor: "col2",
  },
  {
    Header: "Assign to School",
    accessor: "col3",
  },
];

export const AcedamicHeader = () => [
  {
    Header: "Duration",
    accessor: "col1",
  },
  {
    Header: "Start Date",
    accessor: "col2",
  },
  {
    Header: "End Date",
    accessor: "col3",
  },
];

export const UsersListHeader = () => [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "User Type",
    accessor: "type",
  },
  {
    Header: "Member ID",
    accessor: "memberID",
  },
  // {
  //   Header: "Actions",
  //   Cell: (cell) => {
  //     return (
  //       <div className="flex">
  //         <MdDelete
  //           className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
  //           // onClick={() => handleDelete(cell)}
  //           size={20}
  //         />
  //         <MdEdit
  //           className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
  //           // onClick={() => handleUpdate(cell)}
  //           size={20}
  //         />
  //       </div>
  //     );
  //   },
  // },
];

export const GroupHeader = (handleDelete, handleUpdate) => [
  {
    Header: "Name of Group",
    accessor: "name",
  },
  {
    Header: "School",
    accessor: "school",
  },
  {
    Header: "Member Count",
    accessor: "memberCount",
  },
  {
    Header: "Created Date",
    Cell: (cell) => <div>{cell?.row.original.createdAt?.slice(0, 10)}</div>,
  },
  {
    Header: "Actions",
    Cell: (cell) => {
      return (
        <div className="flex">
          <MdDelete
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleDelete(cell)}
            size={20}
          />
          <MdEdit
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleUpdate(cell)}
            size={20}
          />
        </div>
      );
    },
  },
];

export const GroupData = () => [
  {
    col1: "group one ",
    col2: "three",
  },
  {
    col1: "group two ",
    col2: "two",
  },
  {
    col1: "group four ",
    col2: "one",
  },
  {
    col1: "group one ",
    col2: "three",
  },
  {
    col1: "group one ",
    col2: "three",
  },
  {
    col1: "group one ",
    col2: "three",
  },
];

export const ClassHeader = (handleDelete, handleUpdate, handleUpdateStatus) => [
  {
    Header: "Class Name",
    accessor: "name",
  },
  {
    Header: "Department",
    accessor: "department",
  },
  {
    Header: "Grade",
    accessor: "grade",
  },
  {
    Header: "Section",
    accessor: "section",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Status",
    accessor: "active",
    Cell: (cell) => {
      const { value } = cell;
      return (
        <p onClick={() => handleUpdateStatus(cell)}>
          {value ? (
            <BsCheckCircleFill className="text-[#1A9202] hover:text-primary_color" />
          ) : (
            <BsDashCircleFill className="text-[#FF0A16] hover:text-primary_color" />
          )}
        </p>
      );
    },
  },
  {
    Header: "Actions",
    Cell: (cell) => {
      return (
        <div className="flex">
          <MdDelete
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleDelete(cell)}
            size={20}
          />
          <MdEdit
            className="mr-2 rounded-full  hover:bg-white hover:text-primary_color "
            onClick={() => handleUpdate(cell)}
            size={20}
          />
        </div>
      );
    },
  },
];

// period data
export const PeriodsHeader = (
  handleDelete,
  handleUpdate,
  handlePeriodDetail,
  handleUpdateStatus
) => [
  {
    Header: "ClassName",
    accessor: "className",
  },
  {
    Header: "Number Of Periods",
    Cell: (cell) => (
      <div
        onClick={() => handlePeriodDetail(cell)}
        className=" text-primary_orange hover:bg-white hover:text-primary_color text-center w-[50px]  rounded-full"
      >
        {cell.row.original.numberOfPeriods}
      </div>
    ),
  },
  {
    Header: "Calender Profile",
    accessor: "calenderProfile",
  },
  {
    Header: "Status",
    accessor: "active",
    Cell: (cell) => {
      const { value } = cell;
      return (
        <p onClick={() => handleUpdateStatus(cell)}>
          {value ? (
            <BsCheckCircleFill className="text-[#1A9202] hover:text-primary_color" />
          ) : (
            <BsDashCircleFill className="text-[#FF0A16] hover:text-primary_color" />
          )}
        </p>
      );
    },
  },
  {
    Header: "Actions",
    Cell: (cell) => (
      <div className="flex space-x-4 flex-row items-center">
        <div className=" hover:bg-white hover:text-primary_color  rounded-full">
          <MdDelete size={20} onClick={() => handleDelete(cell)} />
        </div>
        {/* <div className=" hover:bg-white hover:text-primary_color  rounded-full">
          <MdEdit onClick={() => handleUpdate(cell)} size={20} />
        </div> */}
      </div>
    ),
  },
];

export const PeriodsData = () => [
  {
    col1: "A",
    col2: "Regular Day",
    col3: "Monday",
    col4: "8",
  },
  {
    col1: "B",
    col2: "Regular Day",
    col3: "Tuesday",
    col4: "6",
  },
  {
    col1: "C",
    col2: "Regular Day",
    col3: "Wednesday",
    col4: "7",
  },
  {
    col1: "B",
    col2: "Regular Day",
    col3: "Thursday",
    col4: "5",
  },
  {
    col1: "A",
    col2: "Regular Day",
    col3: "Friday",
    col4: "4",
  },
  {
    col1: "C",
    col2: "Regular Day",
    col3: "Saturday",
    col4: "6",
  },
];
export const PeriodsDetailHeader = (handleDelete, handleUpdate) => [
  {
    Header: "Course Name",
    accessor: "courseName",
  },

  {
    Header: "Teacher Name",
    accessor: "teacherName",
  },
  {
    Header: "Day",
    Cell: (cell) => <div>{getDayfromId(cell.row.original.day)}</div>,
  },
  {
    Header: "Start Time",
    Cell: (cell) => (
      <div>{UTCtoCurrent(cell.row.original.startDate).slice(11, 16)}</div>
    ),
  },
  {
    Header: "End Time",
    Cell: (cell) => (
      <div>{UTCtoCurrent(cell.row.original.endDate).slice(11, 16)}</div>
    ),
  },
  {
    Header: "Actions",
    Cell: (cell) => (
      <div className="flex space-x-4 flex-row items-center">
        <div className=" hover:bg-white hover:text-primary_color  rounded-full">
          <MdDelete size={20} onClick={() => handleDelete(cell)} />
        </div>
        <div className=" hover:bg-white hover:text-primary_color  rounded-full">
          <MdEdit onClick={() => handleUpdate(cell)} size={20} />
        </div>
      </div>
    ),
  },
];

export const AddSchoolHeader = () => [
  {
    Header: "School Name",
    accessor: "name",
  },
  {
    Header: "Assigned At The Date",
    accessor: "assignedAt",
    Cell: (cell) => {
      if (cell.row.original.assignedAt) {
        let date = cell.row.original.assignedAt;
        return <p>{date?.slice(0, 10)}</p>;
      } else {
        let date = new Date();
        return <p>{date.toJSON()?.slice(0, 10)}</p>;
      }
    },
  },
];

export const AddMemberData = () => [
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Test Staff Name ",
    col2: "13",
    col3: "28 /09 / 2022 -12:00AM",
  },
];
export const AddMemberHeader = () => [
  {
    Header: "Member Name",
    accessor: "name",
  },
  {
    Header: "Members ID",
    accessor: "memberID",
  },
  {
    Header: "Assigned At The Date",
    accessor: "assignedAt",
    Cell: (cell) => {
      if (cell.row.original.assignedAt) {
        let date = cell.row.original.assignedAt;
        return <p>{date?.slice(0, 10)}</p>;
      } else {
        let date = new Date();
        return <p>{date.toJSON()?.slice(0, 10)}</p>;
      }
    },
  },
];

export const HistoryHeader = () => [
  {
    Header: "Change Description",
    accessor: "description",
  },
  {
    Header: "Edited By",
    accessor: "actionUser",
  },
  {
    Header: "Edited Date & Time",
    accessor: "actionDate",
    Cell: (cell) => {
      let date = cell.row.original.actionDate;
      return <p>{date?.slice(0, 10)}</p>;
    },
  },
];

export const HistoryData = () => [
  {
    col1: "Added a new Member",
    col2: "Abdul Rehman",
    col3: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Added a new Member",
    col2: "Abdul Rehman",
    col3: "28 /09 / 2022 -12:00AM",
  },
  {
    col1: "Added a new Member",
    col2: "Abdul Rehman",
    col3: "28 /09 / 2022 -12:00AM",
  },
];

export const InvolvedSchoolHeader = (handleClick) => [
  {
    Header: "Selected",
    accessor: "selected",
    Cell: (cell) => {
      return (
        <div
          className="cursor-pointer"
          onClick={() => handleClick(cell.row.original.id)}
        >
          <CustomCheckBox value={cell.row.original.selected} />
        </div>
      );
    },
  },
  {
    Header: "School Name",
    accessor: "name",
  },
  {
    Header: "Principle Name",
    accessor: "principleName",
  },
  {
    Header: "Operator",
    accessor: "operator",
  },
];

export const InvolvedMemberHeader = (handleClick) => [
  {
    Header: "Selected",
    accessor: "selected",
    Cell: (cell) => {
      return (
        <div
          className="cursor-pointer"
          onClick={() => handleClick(cell.row.original.id)}
        >
          <CustomCheckBox value={cell.row.original.selected} />
        </div>
      );
    },
  },
  {
    Header: "Member Name",
    accessor: "name",
  },
  {
    Header: "Member ID",
    accessor: "memberID",
  },
];

//   MOUNT_ATHOS("Mount Athos"),
//   MOZAMBIQUE("Mozambique"),
//   NAMIBIA("Namibia"),
//   NAURU("Nauru"),
//   NEPAL("Nepal"),
//   NEWFOUNDLAND("Newfoundland"),
//   NETHERLANDS("Netherlands"),
//   NEW_ZEALAND("New Zealand"),
//   NICARAGUA("Nicaragua"),
//   NIGER("Niger"),
//   NIGERIA("Nigeria"),
//   NORWAY("Norway"),
//   OMAN("Oman"),
//   OTTOMAN_EMPIRE("Ottoman Empire"),
//   PAKISTAN("Pakistan"),
//   PALAU("Palau"),
//   PANAMA("Panama"),
//   PAPUA_NEW_GUINEA("Papua New Guinea"),
//   PARAGUAY("Paraguay"),
//   PERU("Peru"),
//   PHILIPPINES("Philippines"),
//   POLAND("Poland"),
//   PORTUGAL("Portugal"),
//   PRUSSIA("Prussia"),
//   QATAR("Qatar"),
//   ROMANIA("Romania"),
//   ROME("Rome"),
//   RUSSIAN_FEDERATION("Russian Federation"),
//   RWANDA("Rwanda"),
//   GRENADINES("Grenadines"),
//   SAMOA("Samoa"),
//   SAN_MARINO("San Marino"),
//   SAO_TOME_PRINCIPE("Sao Tome & Principe"),
//   SAUDI_ARABIA("Saudi Arabia"),
//   SENEGAL("Senegal"),
//   SERBIA("Serbia"),
//   SEYCHELLES("Seychelles"),
//   SIERRA_LEONE("Sierra Leone"),
//   SINGAPORE("Singapore"),
//   SLOVAKIA("Slovakia"),
//   SLOVENIA("Slovenia"),
//   SOLOMON_ISLANDS("Solomon Islands"),
//   SOMALIA("Somalia"),
//   SOUTH_AFRICA("South Africa"),
//   SPAIN("Spain"),
//   SRI_LANKA("Sri Lanka"),
//   SUDAN("Sudan"),
//   SURINAME("Suriname"),
//   SWAZILAND("Swaziland"),
//   SWEDEN("Sweden"),
//   SWITZERLAND("Switzerland"),
//   SYRIA("Syria"),
//   TAJIKISTAN("Tajikistan"),
//   TANZANIA("Tanzania"),
//   THAILAND("Thailand"),
//   TOGO("Togo"),
//   TONGA("Tonga"),
//   TRINIDAD_TOBAGO("Trinidad & Tobago"),
//   TUNISIA("Tunisia"),
//   TURKEY("Turkey"),
//   TURKMENISTAN("Turkmenistan"),
//   TUVALU("Tuvalu"),
//   UGANDA("Uganda"),
//   UKRAINE("Ukraine"),
//   UNITED_ARAB_EMIRATES("United Arab Emirates"),
//   UNITED_KINGDOM("United Kingdom"),
//   URUGUAY("Uruguay"),
//   UZBEKISTAN("Uzbekistan"),
//   VANUATU("Vanuatu"),
//   VATICAN_CITY("Vatican City"),
//   VENEZUELA("Venezuela"),
//   VIETNAM("Vietnam"),
//   YEMEN("Yemen"),
//   ZAMBIA("Zambia"),
//   ZIMBABWE("Zimbabwe");
// }

const AllCountries = [
  {
    label: "Australia",
    value: "Australia",
  },
  {
    label: "Afghanistan",
    value: "Afghanistan",
  },
  {
    label: "Albania",
    value: "Albania",
  },
  {
    label: "Algeria",
    value: "Algeria",
  },
  {
    label: "Andorra",
    value: "Andorra",
  },

  {
    label: "Angola",
    value: "Angola",
  },
  {
    label: "Antigua & Deps",
    value: "Antigua & Deps",
  },
  {
    label: "United States of America",
    value: "United States of America",
  },
  {
    label: "Armenia",
    value: "Armenia",
  },
  {
    label: "Austria",
    value: "Austria",
  },
  {
    label: "Azerbaijan",
    value: "Azerbaijan",
  },
  {
    label: "Bahamas",
    value: "Bahamas",
  },

  {
    label: "Bahrain",
    value: "Bahrain",
  },
  {
    label: "Bangladesh",
    value: "Bangladesh",
  },
  {
    label: "Barbados",
    value: "Barbados",
  },
  {
    label: "Belarus",
    value: "Belarus",
  },
  {
    label: "Belgium",
    value: "Belgium",
  },
  {
    label: "Belize",
    value: "Belize",
  },
  {
    label: "Benin",
    value: "Benin",
  },
  {
    label: "Bhutan",
    value: "Bhutan",
  },
  {
    label: "Bolivia",
    value: "Bolivia",
  },
  {
    label: "Bosnia Herzegovina",
    value: "Bosnia Herzegovina",
  },
  {
    label: "Botswana",
    value: "Botswana",
  },
  {
    label: "Brazil",
    value: "Brazil",
  },
  {
    label: "Brunei",
    value: "Brunei",
  },
  {
    label: "Burkina",
    value: "Burkina",
  },
  {
    label: "Burma",
    value: "Burma",
  },
  {
    label: "Burundi",
    value: "Burundi",
  },
  {
    label: "Cambodia",
    value: "Cambodia",
  },
  {
    label: "Cameroon",
    value: "Cameroon",
  },
  {
    label: "Canada",
    value: "Canada",
  },
  {
    label: "Cape Verde",
    value: "Cape Verde",
  },
  {
    label: "Central African Rep",
    value: "Central African Rep",
  },
  {
    label: "Chad",
    value: "Chad",
  },
  {
    label: "Chile",
    value: "Chile",
  },
  {
    label: "China",
    value: "China",
  },
  {
    label: "Colombia",
    value: "Colombia",
  },
  {
    label: "Comoros",
    value: "Comoros",
  },
  {
    label: "Costa Ric",
    value: "Costa Ric",
  },
  {
    label: "Croatia",
    value: "Croatia",
  },
  {
    label: "Cuba",
    value: "Cuba",
  },
  {
    label: "Cyprus",
    value: "Cyprus",
  },
  {
    label: "Czech Republic",
    value: "Czech Republic",
  },
  {
    label: "Danzig",
    value: "Danzig",
  },

  {
    label: "Democratic Republic of the Congo",
    value: "Democratic Republic of the Congo",
  },
  {
    label: " Republic of the Congo",
    value: " Republic of the Congo",
  },
  {
    label: "Danzig",
    value: "Danzig",
  },
  {
    label: "Denmark",
    value: "Denmark",
  },
  {
    label: "Djibouti",
    value: "Djibouti",
  },
  {
    label: "Dominica",
    value: "Dominica",
  },
  {
    label: "Dominican Republic",
    value: "Dominican Republic",
  },
  {
    label: "East Timor",
    value: "East Timor",
  },
  {
    label: "Ecuador",
    value: "Ecuador",
  },
  {
    label: "Egypt",
    value: "Egypt",
  },
  {
    label: "El Salvador",
    value: "El Salvador",
  },
  {
    label: "Equatorial Guinea",
    value: "Equatorial Guinea",
  },
  {
    label: "Eritrea",
    value: "Eritrea",
  },
  {
    label: "Estonia",
    value: "Estonia",
  },
  {
    label: "Ethiopia",
    value: "Ethiopia",
  },
  {
    label: "Fiji",
    value: "Fiji",
  },
  {
    label: "Finland",
    value: "Finland",
  },
  {
    label: "France",
    value: "France",
  },
  {
    label: "Gabon",
    value: "Gabon",
  },
  {
    label: "Gaza Strip",
    value: "Gaza Strip",
  },
  {
    label: "The Gambia",
    value: "The Gambia",
  },
  {
    label: "Georgia",
    value: "Georgia",
  },
  {
    label: "Germany",
    value: "Germany",
  },
  {
    label: "Ghana",
    value: "Ghana",
  },
  {
    label: "Greece",
    value: "Greece",
  },
  {
    label: "Grenada",
    value: "Grenada",
  },
  {
    label: "Guatemala",
    value: "Guatemala",
  },
  {
    label: "Guatemala",
    value: "Guatemala",
  },
  {
    label: "Guinea",
    value: "Guinea",
  },
  {
    label: "Guinea-Bissau",
    value: "Guinea-Bissau",
  },
  {
    label: "Guyana",
    value: "Guyana",
  },
  {
    label: "Haiti",
    value: "Haiti",
  },
  {
    label: "Holy Roman Empire",
    value: "Holy Roman Empire",
  },
  {
    label: "Honduras",
    value: "Honduras",
  },
  {
    label: "Hungary",
    value: "Hungary",
  },
  {
    label: "Iceland",
    value: "Iceland",
  },
  {
    label: "India",
    value: "India",
  },
  {
    label: "Indonesia",
    value: "Indonesia",
  },
  {
    label: "Iran",
    value: "Iran",
  },
  {
    label: "Iraq",
    value: "Iraq",
  },
  {
    label: "Republic of Ireland",
    value: "Republic of Ireland",
  },
  {
    label: "Israel",
    value: "Israel",
  },
  {
    label: "Italy",
    value: "Italy",
  },
  {
    label: "Ivory Coast",
    value: "Ivory Coast",
  },
  {
    label: "Jamaica",
    value: "Jamaica",
  },
  {
    label: "Japan",
    value: "Japan",
  },
  {
    label: "Jonathanland",
    value: "Jonathanland",
  },
  {
    label: "Jordan",
    value: "Jordan",
  },
  {
    label: "Kazakhstan",
    value: "Kazakhstan",
  },
  {
    label: "Kenya",
    value: "Kenya",
  },
  {
    label: "Kiribati",
    value: "Kiribati",
  },
  {
    label: "North Kore",
    value: "North Kore",
  },
  {
    label: "South Korea",
    value: "South Korea",
  },
  {
    label: "Kosovo",
    value: "Kosovo",
  },
  {
    label: "Kuwait",
    value: "Kuwait",
  },
  {
    label: "Kyrgyzstan",
    value: "Kyrgyzstan",
  },
  {
    label: "Laos",
    value: "Laos",
  },
  {
    label: "Latvia",
    value: "Latvia",
  },

  {
    label: "Lebanon",
    value: "Lebanon",
  },
  {
    label: "Lesotho",
    value: "Lesotho",
  },
  {
    label: "Liberia",
    value: "Liberia",
  },
  {
    label: "Libya",
    value: "Libya",
  },
  {
    label: "Liechtenstein",
    value: "Liechtenstein",
  },
  {
    label: "Lithuania",
    value: "Lithuania",
  },
  {
    label: "Luxembourg",
    value: "Luxembourg",
  },
  {
    label: "Macedonia",
    value: "Macedonia",
  },
  {
    label: "Madagascar",
    value: "Madagascar",
  },
  {
    label: "Malawi",
    value: "Malawi",
  },
  {
    label: "Malaysia",
    value: "Malaysia",
  },
  {
    label: "Maldives",
    value: "Maldives",
  },
  {
    label: "Macedonia",
    value: "Macedonia",
  },
  {
    label: "Macedonia",
    value: "Macedonia",
  },
  {
    label: "Macedonia",
    value: "Macedonia",
  },
  {
    label: "Macedonia",
    value: "Macedonia",
  },
  {
    label: "Macedonia",
    value: "Macedonia",
  },
];

//   MADAGASCAR("Madagascar"),
//   MALAWI("Malawi"),
//   MALAYSIA("Malaysia"),
//   MALDIVES("Maldives"),
//   MALI("Mali"),
//   MALTA("Malta"),
//   MARSHALL_ISLANDS("Marshall Islands"),
//   MAURITANIA("Mauritania"),
//   MAURITIUS("Mauritius"),
//   MEXICO("Mexico"),
//   MICRONESIA("Micronesia"),
//   MOLDOVA("Moldova"),
//   MONACO("Monaco"),
//   MONGOLIA("Mongolia"),
//   MONTENEGRO("Montenegro"),
//   MOROCCO("Morocco"),
