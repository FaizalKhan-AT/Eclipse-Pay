import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IApp } from "@/lib/interfaces/common.interface";
import { Settings2, Trash2 } from "lucide-react";
import PasswordModal from "../ui/password.modal";

interface Props {
  apps: Array<IApp>;
  deleteApp: (appname: string) => void;
}

const SettingsTable: FC<Props> = ({ apps, deleteApp }) => {
  const [appname, setAppname] = useState<string>("");
  const navigate = useNavigate();
  const trigger = useRef<HTMLButtonElement>(null);

  function callback() {
    deleteApp(appname);
  }

  function openModal(name: string) {
    setAppname(name);
    trigger.current?.click();
    trigger.current!.dataset.name = name;
  }

  return (
    <>
      <PasswordModal trigger={trigger} callback={callback} />
      <Table>
        <TableCaption>General settings for all apps.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fill">App name</TableHead>
            <TableHead>Account level</TableHead>
            <TableHead>Allowed origins</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.appName + app.id}>
              <TableCell className="font-medium">{app.appName}</TableCell>
              <TableCell>{app.isProd ? "Production" : "Test"}</TableCell>
              <TableCell className="text-wrap w-[540px]">
                {app.allowedOrigins.replace(",", ", ")}
              </TableCell>
              <TableCell className="w-[350px] text-wrap">
                {app.description ? app.description : "--"}
              </TableCell>
              <TableCell className="text-right flex items-center justify-around">
                <span>
                  <Settings2
                    onClick={() => navigate(`${app.appName.toLowerCase()}`)}
                    className="cursor-pointer size-5"
                  />
                </span>
                {app.isProd ? null : (
                  <span title="Delete">
                    <Trash2
                      onClick={() => openModal(app.appName)}
                      className="cursor-pointer size-5 hover:text-red-600 ease-in duration-200"
                    />
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SettingsTable;
