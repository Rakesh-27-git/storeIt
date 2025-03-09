// import { useUser } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const DashboardLayout = () => {
  //   const { isSignedIn } = useUser();

  //   console.log(isSignedIn);

  //     if (!isSignedIn) {
  //       return <Navigate to="/auth/sign-in" />;
  //     }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">StoreIt</h2>
        <nav className="mt-4">
          <ul>
            <li className="py-2 hover:bg-gray-700 px-2 rounded">Dashboard</li>
            <li className="py-2 hover:bg-gray-700 px-2 rounded">Files</li>
            <li className="py-2 hover:bg-gray-700 px-2 rounded">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
