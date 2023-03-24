import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import "./App.css";

import LoadingPage from "./Components/LoadingPage";
import PageLayout from "./Components/PageLayout";
import setBodyColor from "./constants/utilis";
import AcedamicYearList from "./pages/AcedamicYear/AcedamicYearList";
import AddAcedamicYear from "./pages/AcedamicYear/AddAcedamicYear";
import UpdateAcademicYear from "./pages/AcedamicYear/UpdateAcademicYear";
import AddAttendenceMode from "./pages/AttendenceModes/AddAttendenceMode";
import AttendenceModeView from "./pages/AttendenceModes/AttendenceModeView";
import UpdateAttendenceMode from "./pages/AttendenceModes/UpdateAttendenceMode";
import AddLecture from "./pages/AttendencePeriods/AddLecture";
import PeriodsDetail from "./pages/AttendencePeriods/PeriodDetail";
import PeriodsAdd from "./pages/AttendencePeriods/PeriodsAdd";
import PeriodsList from "./pages/AttendencePeriods/PeriodsList";
import UpdateLecture from "./pages/AttendencePeriods/UpdateLecture";
import UpdatePeriods from "./pages/AttendencePeriods/UpdatePeriods";
import BrandingSetupList from "./pages/BrandingSetup";
import BrandingSetupAdd from "./pages/BrandingSetup/BrandingSetupAdd";
import BrandingSetupUpdate from "./pages/BrandingSetup/BrandingSetupUpdate";
import Business from "./pages/Business";
import AddBusiness from "./pages/Business/AddBusiness";
import UpdateBusiness from "./pages/Business/UpdateBusiness";
import Calendar from "./pages/Calendar";
import CalendarProfile from "./pages/CalendarProfile";
import AddProfile from "./pages/CalendarProfile/AddProfile";
import UpdateProfile from "./pages/CalendarProfile/UpdateProfile";
import ChangePassword from "./pages/ChangePassword";
import AddClass from "./pages/Classess/AddClass";
import ClassList from "./pages/Classess/ClassList";
import UpdateClass from "./pages/Classess/UpdateClass";
import Courses from "./pages/Courses";
import AddCourse from "./pages/Courses/AddCourse";
import UpdateCourse from "./pages/Courses/UpdateCourse";
import Dashboard from "./pages/Dashboard";
import DeviceAssignAdd from "./pages/deviceAssignment/DeviceAssignAdd";
import DeviceAssignUpdate from "./pages/deviceAssignment/DeviceAssignUpdate";
import DeviceAssignView from "./pages/deviceAssignment/DeviceAssignView";
import AddDeviceEnrol from "./pages/deviceEnrollment/AddDeviceEnrol";
import DeviceEnrolView from "./pages/deviceEnrollment/DeviceEnrolView";
import UpdateDeviceEnrol from "./pages/deviceEnrollment/UpdateDeviceEnrol";
import District from "./pages/District";
import AddDistrict from "./pages/District/AddDistrict";
import UpdateDistrict from "./pages/District/UpdateDistrict";
// import UpdateDistrict from "./pages/District/UpdateDistrict";
import AddNotifications from "./pages/EmailsAndNotifications/AddNotifications";
import NotificationList from "./pages/EmailsAndNotifications/NotificationList";
import UpdateNotification from "./pages/EmailsAndNotifications/UpdateNotificaton";
import ForgetPassword from "./pages/ForgetPassword";
import AddGroup from "./pages/Groups/AddGroup";
import GroupList from "./pages/Groups/GroupList";
import UpdateGroup from "./pages/Groups/UpdateGroup";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import ParentList from "./pages/ParentList";
import AddParent from "./pages/ParentList/AddParent";
import UpdateParent from "./pages/ParentList/UpdateParent";
import Permissions from "./pages/Permissions";
import UpdateRole from "./pages/Permissions/UpdateRole";
import Schools from "./pages/Schools";
import AddSchool from "./pages/Schools/AddSchool";
import UpdateSchool from "./pages/Schools/UpdateSchool";
import StaffList from "./pages/StaffList";
import AddStaff from "./pages/StaffList/AddStaff";
import UpdateStaff from "./pages/StaffList/UpdateStaff";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/StudentList/AddStudent";
import UpdateStudent from "./pages/StudentList/UpdateStudent";
import Subscriptions from "./pages/Subscription";
import AddSubscription from "./pages/Subscription/AddSubscription";
import UpdateSubscription from "./pages/Subscription/UpdateSubscription";
import SubscriptionPackages from "./pages/SubscriptionPackages";
import AddTerm from "./pages/Terms/AddTerm";
import TermList from "./pages/Terms/TermList";
import UpdateTerm from "./pages/Terms/UpdateTerm";
import UnAuthorized from "./pages/UnAuthorized";
import UserList from "./pages/UsersList/UserList";
import { getAllPermissions, getNavList } from "./services/CommonServices";

// import UpdateDistrict from "./pages/District/UpdateDistrict";

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const PermissionRoutes = [
    {
      path: "student-list",
      component: StudentList,
      name: "Student List",
      type: "view",
    },
    {
      path: "dashboard",
      component: Dashboard,
      name: "Dashboard",
      type: "view",
    },
    {
      path: "student-list/add-student",
      component: AddStudent,
      name: "Student List",
      type: "add",
    },
    {
      path: "student-list/update-student/:id",
      component: UpdateStudent,
      name: "Student List",
      type: "update",
    },
    {
      path: "parent-list",
      component: ParentList,
      name: "Parents List",
      type: "view",
    },
    {
      path: "parent-list/add-parent",
      component: AddParent,
      name: "Parents List",
      type: "add",
    },
    {
      path: "parent-list/update-parent/:id",
      component: UpdateParent,
      name: "Parents List",
      type: "update",
    },
    {
      path: "staff-list",
      component: StaffList,
      name: "Staff List",
      type: "view",
    },
    {
      path: "staff-list/add-staff",
      component: AddStaff,
      name: "Staff List",
      type: "add",
    },
    {
      path: "staff-list/update-staff/:id",
      component: UpdateStaff,
      name: "Staff List",
      type: "update",
    },
    {
      path: "district-list/update-district/:id",
      component: UpdateDistrict,
      name: "District",
      type: "update",
    },
    {
      path: "district-list/add-district",
      component: AddDistrict,
      name: "District",
      type: "add",
    },
    {
      path: "district-list",
      component: District,
      name: "District",
      type: "view",
    },
    {
      path: "schools-list/update-school/:id",
      component: UpdateSchool,
      name: "School",
      type: "update",
    },
    {
      path: "schools-list/add-school",
      component: AddSchool,
      name: "School",
      type: "add",
    },
    {
      path: "schools-list",
      component: Schools,
      name: "School",
      type: "view",
    },
    {
      path: "periods/update-periods/:id",
      component: UpdatePeriods,
      name: "Periods",
      type: "update",
    },
    {
      path: "periods/add-period",
      component: PeriodsAdd,
      name: "Periods",
      type: "add",
    },
    {
      path: "periods",
      component: PeriodsList,
      name: "Periods",
      type: "view",
    },
    {
      path: "class/update-class/:id",
      component: UpdateClass,
      name: "Classes",
      type: "update",
    },
    {
      path: "class/add-class",
      component: AddClass,
      name: "Classes",
      type: "add",
    },
    {
      path: "class",
      component: ClassList,
      name: "Classes",
      type: "view",
    },
    {
      path: "academic-year/add",
      component: AddAcedamicYear,
      name: "Academic Year",
      type: "add",
    },
    {
      path: "academic-year",
      component: AcedamicYearList,
      name: "Academic Year",
      type: "view",
    },
    {
      path: "academic-year/edit/:id",
      component: UpdateAcademicYear,
      name: "Academic Year",
      type: "update",
    },
    {
      path: "groups/update-group/:id",
      component: UpdateGroup,
      name: "Groups",
      type: "update",
    },
    {
      path: "groups/add-group",
      component: AddGroup,
      name: "Groups",
      type: "add",
    },
    {
      path: "groups",
      component: GroupList,
      name: "Groups",
      type: "view",
    },
    // {
    //   path: "users-list/update-user/:id",
    //   component: UpdateUser,
    //   name: "Users List",
    //   type: "update",
    // },
    // {
    //   path: "User-list/add-user",
    //   component: AddUserList,
    //   name: "Users List",
    //   type: "add",
    // },
    {
      path: "User-list",
      component: UserList,
      name: "Users List",
      type: "view",
    },
    {
      path: "term/add",
      component: AddTerm,
      name: "Term",
      type: "add",
    },
    {
      path: "term/update/:id",
      component: UpdateTerm,
      name: "Term",
      type: "update",
    },
    {
      path: "term",
      component: TermList,
      name: "Term",
      type: "view",
    },
    {
      path: "calender-profile/add-profile",
      component: AddProfile,
      name: "Calender Profile",
      type: "add",
    },
    {
      path: "calender-profile",
      component: CalendarProfile,
      name: "Calender Profile",
      type: "view",
    },
    {
      path: "calender-profile/edit/:id",
      component: UpdateProfile,
      name: "Calender Profile",
      type: "update",
    },
    {
      path: "courses/update-course/:id",
      component: UpdateCourse,
      name: "Courses",
      type: "update",
    },
    {
      path: "courses/add-course",
      component: AddCourse,
      name: "Courses",
      type: "add",
    },
    {
      path: "courses",
      component: Courses,
      name: "Courses",
      type: "view",
    },
    {
      path: "calender",
      component: Calendar,
      name: "Calender",
      type: "view",
    },
    {
      path: "permissions",
      component: Permissions,
      name: "User Role & Permission",
      type: "view",
    },
    {
      path: "permissions/update/:id",
      component: UpdateRole,
      name: "User Role & Permission",
      type: "update",
    },
    {
      path: "notification",
      component: NotificationList,
      name: "Email and Notification",
      type: "view",
    },
    {
      path: "notification/update/:id",
      component: UpdateNotification,
      name: "Email and Notification",
      type: "update",
    },
    {
      path: "notification/add",
      component: AddNotifications,
      name: "Email and Notification",
      type: "add",
    },
    {
      path: "subscripton",
      component: Subscriptions,
      name: "Subscription",
      type: "view",
    },
    {
      path: "subscripton/add-subscripton",
      component: AddSubscription,
      name: "Subscription",
      type: "add",
    },
    {
      path: "subscripton/update-subscripton",
      component: UpdateSubscription,
      name: "Subscription",
      type: "update",
    },
    {
      path: "business",
      component: Business,
      name: "Tenant",
      type: "view",
    },
    {
      path: "business/add-business",
      component: AddBusiness,
      name: "Tenant",
      type: "add",
    },
    {
      path: "business/update-business/:id",
      component: UpdateBusiness,
      name: "Tenant",
      type: "update",
    },
    {
      path: "/periods/period-detail",
      component: PeriodsDetail,
      name: "Periods",
      type: "view",
    },
    {
      path: "/periods/period-detail/add-lecture",
      component: AddLecture,
      name: "Periods",
      type: "add",
    },
    {
      path: "/periods/period-detail/update-lecture",
      component: UpdateLecture,
      name: "Periods",
      type: "update",
    },
    {
      path: "/attendence-mode",
      component: AttendenceModeView,
      name: "Attendence Mode",
      type: "view",
    },
    {
      path: "/attendence-mode/add",
      component: AddAttendenceMode,
      name: "Attendence Mode",
      type: "add",
    },
    {
      path: "/attendence-mode/update",
      component: UpdateAttendenceMode,
      name: "Attendence Mode",
      type: "update",
    },
    {
      path: "/device-enrollment",
      component: DeviceEnrolView,
      name: "Device Enrollment",
      type: "view",
    },
    {
      path: "/device-enrollment/add",
      component: AddDeviceEnrol,
      name: "Device Enrollment",
      type: "add",
    },
    {
      path: "/device-enrollment/update/:id",
      component: UpdateDeviceEnrol,
      name: "Device Enrollment",
      type: "update",
    },

    {
      path: "/brandiing-setup",
      component: BrandingSetupAdd,
      name: "Branding Setup",
      type: "view",
    },
    // {
    //   path: "/brandiing-setup/add",
    //   component: BrandingSetupAdd,
    //   name: "Branding Setup",
    //   type: "add",
    // },
    // {
    //   path: "/brandiing-setup/update/:id",
    //   component: BrandingSetupUpdate,
    //   name: "Branding Setup",
    //   type: "update",
    // },
    {
      path: "/device-assignment",
      component: DeviceAssignView,
      name: "Device Assignment",
      type: "view",
    },
    {
      path: "/device-assignment/add",
      component: DeviceAssignAdd,
      name: "Device Assignment",
      type: "add",
    },
    {
      path: "/device-assignment/update/:id",
      component: DeviceAssignUpdate,
      name: "Device Assignment",
      type: "update",
    },

    // {
    //   path: "subscripton",
    //   component: Subscriprions,
    //   name: "Subscriptions",
    //   type: "view",
    // },
  ];

  const { data: permissionList, isFetching } = useQuery({
    queryKey: ["permissionlist"],
    queryFn: getAllPermissions,
    refetchOnWindowFocus: false,
    enabled:
      window.location.pathname === "/" ||
      window.location.pathname === "/resetPassword"
        ? false
        : true,
    onSuccess: (data) => {
      const brandingSetup = data?.data?.user.brandingSetup;
      console.log(brandingSetup, "brandingSetup");
      setBodyColor("--parentColor", brandingSetup?.parentColor || "#799AEF");
      setBodyColor("--parentColor60", brandingSetup?.parentColor60 || "#AFC2F5");
      setBodyColor("--parentOrange", brandingSetup?.parentOrange || "#e28743");
      setBodyColor(
        "--parentOrange60",
        brandingSetup?.parentOrange60 || "#eeb78e"
      );
      localStorage.setItem("currentUser", JSON.stringify(data?.data?.user));
    },
  });

  const yearId = localStorage.getItem("academic_Year");

  const { data: NavList } = useQuery({
    queryKey: ["getNavList", { yearId }],
    queryFn: () => getNavList(yearId),
    refetchOnWindowFocus: false,
    enabled:
      window.location.pathname === "/" ||
      window.location.pathname === "/resetPassword"
        ? false
        : true,
  });

  useEffect(() => {
    if (permissionList?.data?.user?.requirePasswordUpdate) {
      navigate("/change-password");
    } else if (permissionList?.data?.user?.isSubscriptionExpired) {
      navigate("/subscription-packages");
    }
  }, [window.location.pathname, permissionList]);
  if (isFetching) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/resetPassword" element={<ForgetPassword />} />
          <Route
            path="/subscription-packages"
            element={<SubscriptionPackages />}
          />
          <Route
            element={<PageLayout NavList={NavList?.data} location={location} />}
          >
            {permissionList &&
              PermissionRoutes?.map(
                ({ path, component: DataComponent, name, type }, index) => {
                  let permission =
                    permissionList?.data?.user?.module_permissions?.find(
                      (obj) => obj.name == name
                    );

                  return (
                    permission && (
                      <Route
                        key={index}
                        path={path}
                        element={
                          permission[type] ? (
                            <DataComponent permission={permission} />
                          ) : (
                            <UnAuthorized />
                          )
                        }
                      />
                    )
                  );
                }
              )}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}
export default App;
