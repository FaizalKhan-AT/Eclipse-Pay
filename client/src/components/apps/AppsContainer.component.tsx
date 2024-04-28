import { FC } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  ContextMenuTrigger,
} from "../ui";
import { IApp } from "@/lib/interfaces/common.interface";
import { Earth, FlaskConical, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  apps: Array<IApp>;
}
export const AppsContainer: FC<Props> = ({ apps }) => {
  const navigate = useNavigate();

  return (
    <ContextMenuTrigger
      className="flex flex-1 p-5 rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-wrap gap-5">
        {apps.map((app) => {
          const Icon = app.isProd ? Earth : FlaskConical;
          return (
            <Card
              key={app.id + app.appName}
              className="w-[300px] h-fit relative"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{app.appName}</CardTitle>
                <CardDescription>
                  {app.description ? app.description : ""}
                </CardDescription>
                <br />
                <Button
                  variant="outline"
                  className="flex gap-3 items-center"
                  onClick={() =>
                    navigate(`/dashboard/settings/${app.appName.toLowerCase()}`)
                  }
                >
                  <Settings2 className="size-5" />
                  Settings
                </Button>
                <span
                  title={app.isProd ? "Production" : "Test"}
                  className="absolute right-5 top-5 rounded-full size-10 border flex items-center justify-center border-zinc-50"
                >
                  <Icon className="size-5 cursor-pointer" />
                </span>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </ContextMenuTrigger>
  );
};
