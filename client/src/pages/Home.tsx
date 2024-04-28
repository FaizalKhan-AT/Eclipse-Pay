import { Button, Navbar } from "@/components/ui";
import { FC } from "react";
import "./styles/home.css";
import Matrix from "@/components/ui/matrix";
import { Link } from "react-router-dom";
import Footer from "@/components/ui/footer";

const Home: FC = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center hero-section relative">
        <div className="overlay absolute z-0 bottom-0 left-0 top-0 right-0">
          <Matrix />
        </div>
        <div className="z-20 w-full flex justify-center">
          <Navbar />
        </div>
        <div className="h-full flex flex-col gap-5 justify-center items-center text-center absolute z-10">
          <h1 className="text-5xl font-bold txt-shadow">
            <span>
              We simplyfy{" "}
              <span className="text-sky-500"> payment integrations</span>
            </span>
            <br />
            <div className="mt-3">
              So you don't have to{" "}
              <span className="text-sky-500">worry about them</span>{" "}
            </div>
          </h1>
          <p className="text-xl">
            Experience buttery smooth payment intergations. without any
            complexities.
          </p>
          <Button className="w-1/6 tex-lg" asChild>
            <Link to="/get-started">Get Started</Link>
          </Button>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
