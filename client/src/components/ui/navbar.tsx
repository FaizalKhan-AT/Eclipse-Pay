import { FC } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "./button";

const Navbar: FC = () => {
  return (
    <nav className="w-[80%] h-[8vh] flex items-center justify-between py-4">
      <div className="flex items-center gap-x-3">
        <div className="flex items-center">
          <img
            src={Logo}
            className="w-[85px] h-[85px] object-contain"
            alt="eclipse pay logo"
          />
          <span className="text-[18px] font-semibold tracking-tight">
            Eclipse Pay
          </span>
        </div>
        <div className="flex items-center">
          <Button variant="link" asChild>
            <Link to="/">API Reference</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/">Docs</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <Button variant="link" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/get-started">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};

export { Navbar };
