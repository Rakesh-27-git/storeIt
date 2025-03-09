import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <p className="text-green-600 font-semibold">
          You are already signed in.
        </p>
      </SignedIn>
    </div>
  );
};

export default SignInPage;
