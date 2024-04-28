import { FC } from "react";
import Img from "@/assets/images/notfound.png";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
const NotFound: FC = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <img src={Img} alt="not-found-img" />
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-5xl font-bold ">Oops! 404</h1>
        <p className="text-2xl">Requested content is not Available.</p>
        <Button className="mt-4" asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
