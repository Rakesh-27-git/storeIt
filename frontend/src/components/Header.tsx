import { UserButton } from "@clerk/clerk-react";
import FileUploader from "./FileUploader";
import Search from "./Search";

const Header = () => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
