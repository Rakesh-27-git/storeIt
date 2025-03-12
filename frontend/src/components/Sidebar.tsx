import { Link, useLocation } from "react-router-dom";
import { navItems } from "../constants";
import { cn } from "../lib/utils";

// type Props = {};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="sidebar">
      <Link to="/">
        <img
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />

        <img
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} to={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active"
                )}
              >
                <img
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active"
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <img
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-72"
      />
    </aside>
  );
};

export default Sidebar;
