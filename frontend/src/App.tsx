import { SignUp, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Welcome to StoreIt</h1>

      {!isSignedIn ? (
        <div>
          <SignUp />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Hello, {user?.fullName}!</p>
          <UserButton />
        </div>
      )}
    </div>
  );
}

export default App;
