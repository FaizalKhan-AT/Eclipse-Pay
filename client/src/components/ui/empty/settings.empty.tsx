import { FC } from "react";
import settings from "@/assets/images/settings.svg";

export const SettingsEmptyState: FC = () => {
  return (
    <div className="flex flex-1 items-center flex-col justify-center">
      <img className="size-[300px]" src={settings} alt="no settings" />
      <h3 className="text-lg text-muted-foreground">
        Create applications to access settings.
      </h3>
    </div>
  );
};
