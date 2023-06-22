import { Navigate, createBrowserRouter } from "react-router-dom";
import { AdminLayout, InstructorLayout, Main, StudentLayout } from "@/layouts";
import {
  AddClass,
  Admin,
  Classes,
  EditClass,
  Home,
  Instructor,
  Instructors,
  Login,
  ManageClasses,
  ManageUsers,
  MyClasses,
  MyEnrolledClasses,
  MySelectedClasses,
  Notfound,
  Payment,
  PaymentHistory,
  Register,
  Student,
} from "@/pages";
import UserRoute from "./UserRoute";
import StudentRoute from "./StudentRoute";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
    ],
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/student_dashboard",
    element: (
      <UserRoute>
        <StudentRoute>
          <StudentLayout />
        </StudentRoute>
      </UserRoute>
    ),
    children: [
      {
        path: "/student_dashboard",
        element: <Navigate to="/student_dashboard/home" replace />,
      },
      {
        path: "home",
        element: <Student />,
      },
      {
        path: "my_selected_classes",
        element: <MySelectedClasses />,
      },
      {
        path: "my_enrolled_classes",
        element: <MyEnrolledClasses />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "payment_history",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    path: "/instructor_dashboard",
    element: (
      <UserRoute>
        <InstructorRoute>
          <InstructorLayout />
        </InstructorRoute>
      </UserRoute>
    ),
    children: [
      {
        path: "/instructor_dashboard",
        element: <Navigate to="/instructor_dashboard/home" replace />,
      },
      {
        path: "home",
        element: <Instructor />,
      },
      {
        path: "my_classes",
        element: <MyClasses />,
      },
      {
        path: "add_class",
        element: <AddClass />,
      },
      {
        path: "edit_class/:id",
        element: <EditClass />,
      },
    ],
  },
  {
    path: "/admin_dashboard",
    element: (
      <UserRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </UserRoute>
    ),
    children: [
      {
        path: "/admin_dashboard",
        element: <Navigate to="/admin_dashboard/home" replace />,
      },
      {
        path: "home",
        element: <Admin />,
      },
      {
        path: "manage_classes",
        element: <ManageClasses />,
      },
      {
        path: "manage_users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
