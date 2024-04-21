import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

import {
  Home,
  HandCoins,
  Settings,
  LayoutDashboard,
  SunMoon,
} from "lucide-react";

const Links = [
  {
    path: "/dashboard",
    icon: Home,
    name: "Dashboard",
  },
  {
    path: "/dashboard/apps",
    icon: LayoutDashboard,
    name: "Apps",
  },
  {
    path: "/dashboard/ledger",
    icon: HandCoins,
    name: "Transactions",
  },
];

const slectedStyle = `bg-muted text-white`;

const Sidebar: FC = () => {
  const location = useLocation();
  return (
    <aside className="hidden border-r bg-muted/40 md:block w-[220px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <SunMoon className="size-6 object-cover" />
            <span className="">Eclipse Pay</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {Links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={idx + link.name}
                  to={link.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ${
                    location.pathname == link.path
                      ? slectedStyle
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            to="/dashboard/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white ${
              location.pathname.includes("settings")
                ? slectedStyle
                : "text-muted-foreground"
            }`}
          >
            <Settings className="size-5" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
