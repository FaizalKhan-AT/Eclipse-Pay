import { FC } from "react";
import { ContextMenuTrigger } from "../context-menu";
import hero from "@/assets/images/add.svg";
export const AppEmptyState: FC = () => {
  return (
    <>
      <ContextMenuTrigger
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <img src={hero} className="size-[300px]" alt="" />
          <h3 className="text-2xl font-bold tracking-tight">
            You have no Apps
          </h3>
          <p className="text-sm text-muted-foreground">
            Click on Add button or Right click to create a new app.
          </p>
        </div>
      </ContextMenuTrigger>
    </>
  );
};
