export { default as Home } from "./home/Home";
export { default as Instructors } from "./Instructors/Instructors";
export { default as Classes } from "./Classes/Classes";
export { default as Notfound } from "./404/Notfound";

// auth routes
export { default as Register } from "./register/Register";
export { default as Login } from "./login/Login";

// student dashboard routes
export { default as Student } from "./dashboard/student/Student";
export { default as MySelectedClasses } from "./dashboard/student/MySelectedClasses";
export { default as MyEnrolledClasses } from "./dashboard/student/MyEnrolledClasses";
export { default as PaymentHistory } from "./dashboard/student/PaymentHistory";
export { default as Payment } from "./dashboard/student/Payment";

//  instructor dashboard routes
export { default as Instructor } from "./dashboard/instructor/instructor";
export { default as MyClasses } from "./dashboard/instructor/MyClasses";
export { default as AddClass } from "./dashboard/instructor/AddClass";
export { default as EditClass } from "./dashboard/instructor/EditClass";

//  instructor admin routes
export { default as Admin } from "./dashboard/admin/Admin";
export { default as ManageUsers } from "./dashboard/admin/ManageUsers";
export { default as ManageClasses } from "./dashboard/admin/ManageClasses";
