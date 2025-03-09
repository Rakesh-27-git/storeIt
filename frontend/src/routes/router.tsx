import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import SignInPage from "../pages/auth/SignIn";
import Dashboard from "../pages/Dashboard";
import ContentPage from "../pages/ContentPage"; // Dynamic page handler
import { JSX } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: ":type", // Dynamic routing for documents, images, media, others
        element: <ContentPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "sign-in", element: <SignInPage /> }],
  },
]);

export default function AppRouter(): JSX.Element {
  return <RouterProvider router={router} />;
}
