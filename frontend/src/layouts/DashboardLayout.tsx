import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNavigation from "../components/MobileNavigation";
import Header from "../components/Header";
import { Toaster } from "sonner";

const DashboardLayout = () => {
  const { isSignedIn, isLoaded } = useUser();

  console.log("isSignedIn:", isSignedIn, "isLoaded:", isLoaded);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation />
        <Header />
        <div className="main-content">
          <Outlet /> {/* Nested routes will render here */}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default DashboardLayout;
