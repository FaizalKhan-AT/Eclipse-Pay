import { Navbar } from "@/components/ui";
import { FC } from "react";
import "./styles/home.css";
const Home: FC = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center hero-section">
        <Navbar />
        <div className="h-full flex items-center">
          <h1>Make seamless payment integrations</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
