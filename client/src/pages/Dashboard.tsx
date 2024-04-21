import { BreadcrumbHeader, Header, Sidebar } from "@/components/ui";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Dashboard: FC = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <BreadcrumbHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
