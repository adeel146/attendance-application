export const BASE_URL = "http://20.203.100.210/api/";
// export const BASE_URL = "http://20.203.100.211/api/";

export const LOGIN_URL = "auth/login";
export const RESET_PASSWORD = "auth/update_password";
export const FORGET_PASSWORD = "auth/forget_password";

export const GET_PERMISSIONS = "auth/current";
export const GET_USER_PERMISSIONS = "permissions";
export const GET_NAVLIST = "permissions/get_module_current_user?year_id=";

export const GET_STUDENTS_LIST = "student?";
export const GET_STUDENT_BY_ID = "student/";
export const ADD_STUDENT = "student";
export const DEL_STUDENT = "student/";
export const UPDATE_STUDENT = "student/";
export const GET_OPERATOR_LIST = "operator";
// for school
export const ADD_SCHOOL_LIST = "school";
export const GET_SCHOOL_LIST = "school?";
export const DEL_SCHOOL = "school/";
// for  Parent
export const GET_PARENTS_LIST = "parent?";
export const GET_PARENT_BY_ID = "parent/";
export const DEL_PARENT = "parent/";
export const ADD_PARENT = "parent";
export const UPDATE_PARENT = "parent/";
//for Staff
export const GET_STAFF_LIST = "teacher?";
export const GET_SINGLE_STAFF = "teacher/";
export const ADD_STAFF = "teacher";
export const UPDATE_STAFF = "teacher/";

//for Groups
export const GET_GROUPS_LIST = "group?";
export const ADD_GROUP = "group";
export const DELETE_GROUP = "group/";
export const UPDATE_GROUP = "group/";
export const GROUP_BY_ID = "group/";
export const UPDATE_SCHOOL = "school/";
export const GET_SCHOOL_BY_ID = "school/";
// for academic year

export const ADD_ACEDAMIC_LIST = "academic_year";
export const GET_ACEDAMIC_LIST = "academic_year?";
export const DEL_ACEDAMIC_YEAR = "academic_year/";
export const UPDATE_ACEDAMIC_YEAR = "academic_year/";
export const ACEDAMIC_YEAR_BY_ID = "academic_year/";

// for term

export const ADD_TERM = "term";
export const GET_TERM = "term?";
export const DEL_TERM = "term/";
export const UPDATE_TERM = "term/";

export const GET_TERM_BY_ID = "term/";

export const GET_YEAR = "academic_year";
export const GET_SCHOOL = "school";

//courses
export const ADD_COURSE = "course";
export const GET_COURSES = "course?";
export const GET_COURSE_BY_ID = "course/";
export const UPDATE_COURSE = "course/";
export const UPDATE_COURSE_STATUS = "course/update_status/";

export const DELETE_COURSE = "course/";

// for calenderyear

export const ADD_CALENDER = "calender_profile";
export const GET_CALENDER = "calender_profile?";
export const DEL_CALENDER = "calender_profile/";
export const UPDATE_CALENDER_PROFILE = "calender_profile/";
export const PROFILE_GET_BY_ID = "calender_profile/";

export const UPDATE_CALENDER = "calender_profile/edit_status/";

// for classes

export const ADD_CLASS = "class";
export const GET_CLASSES = "class/get_classes/";
export const GET_CLASS_BY_ID = "class/";
export const DEL_CLASS = "class/";
export const UPDATE_CLASS = "class/";
export const UPDATE_CLASS_STATUS = "class/update_status/";

//calendar

export const CALENDAR_LIST = "calender_day/";
export const ADD_CALENDAR = "calender_day";
export const ADD_OFF_DAYS = "calender_day/add_off_days";
//Role

export const ADD_ROLE = "role";
export const DELETE_ROLE = "role/";
export const GET_ROLE = "role/without_permission?";
export const GET_ROLE_BY_ID = "role/";
export const GET_ROLE_DETAIL_BY_ID = "role/detail/";
export const UPDATE_ROLE = "role/";

//district || Operator

export const GET_DISTRICT_LIST = "operator?";
export const ADD_DISTRICT = "operator";
export const DELETE_DISTRICT = "operator/";
export const UPDATE_DISTRICT = "operator/";
export const GET_DISTRICT_BY_ID = "operator/";

// UsersList Url
export const GET_USERS = "user?";

//Periods URL

export const GET_PERIODS = "period?";
export const ADD_PERIOD = "period";
export const DEL_PERIOD = "period/";
export const UPDATE_PERIOD = "period/";
export const UPDATE_PERIOD_STATUS = "period/update_status/";
export const GET_LECTURE_DETAIL = "lecture/";
export const ADD_LECTURE = "lecture";
export const UPDATE_LECTURE = "lecture/";
export const DELETE_LECTURE = "lecture/";

// Subscriptions

export const GET_SUBSCRIPTION_LIST = "subscription?";
export const ADD_SUBSCRIPTION = "subscription";
export const UPDATE_SUBSCRIPTION = "subscription/";
export const DELETE_SUBSCRIPTION = "subscription/";
export const BUSINESS_UPDATE_SUBSCRIPTION = "business/update_subscription/";

// /

//Business

export const GET_BUSINESS_LIST = "business?";
export const GET_SINGLE_BUSINESS = "business/";
export const ADD_BUSINESS = "business";
export const UPDATE_BUSINESS = "business/";

// for subscription

// for attendence mode
export const ADD_ATTENDENCE_MODE = "school/set_attendance_mode";
export const GET_ATTENDENCE_MODE_BY_ID = "school/get_attendance_mode/";

// export const DEL_SCHOOL = "school/";

// for email and notification

export const ADD_EMAIL_NOTIFICATION = "notification_template";
export const GET_EMAIL_NOTIFICATION = "notification_template?";
export const GET_EMAIL_NOTIFICATION_ID = "notification_template/";
export const UPDATE_EMAIL_NOTIFICATION = "notification_template/";
export const UPDATE_EMAIL_NOTIFICATION_STATUS =
  "notification_template/update_status/";

export const DELETE_EMAIL_NOTIFICATION = "notification_template/";

// for device enrollment
export const GET_DEVICE_ENROLL = "device_info?";
export const ADD_DEVICE_ENROLL = "device_info";
export const DELETE_DEVICE_ENROLL = "device_info/";
export const UPDATE_DEVICE_ENROLL = "device_info/";
export const GET_DEVICE_ENROLL_BY_ID = "device_info/";
export const ENROLL_DEVICE = "device_info/class_device/";
export const GET_ENROLLED_DEVICE_LIST = "device_info/class_device?";
export const REMOVE_DEVICE_FROM_CLASS = "device_info/remove_from_class/";
//Branding Setup
export const GET_BRANDING_SETUP_LIST = "branding_setup?";
export const GET_SINGLE_BRANDING_SETUP = "branding_setup/";
export const ADD_BRANDING_SETUP = "business/add_branding_setup";
export const UPDATE_BRANDING_SETUP = "school/add_branding_setup";
export const DELETE_BRANDING_SETUP = "branding_setup/";

//device assignment
