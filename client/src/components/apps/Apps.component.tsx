import { FC, useState } from "react";
import { Header } from "./header.component";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui";
import { AppEmptyState } from "../ui/empty";
import { ArrowLeftRight, Plus, Settings, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Add",
    icon: Plus,
    path: "/dashboard/apps/new",
    empty: true,
  },
  {
    name: "Ledger",
    icon: ArrowLeftRight,
    path: "/dashboard/ledger",
    empty: false,
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
    empty: false,
  },
  {
    name: "Delete",
    icon: Trash2,
    path: "",
    empty: false,
  },
];
export const Apps: FC = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const navigate = useNavigate();
  return (
    <>
      <ContextMenu>
        <Header />
        <AppEmptyState />
        <ContextMenuContent>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ContextMenuItem
                key={item.name + idx}
                className="flex items-center gap-3"
                disabled={!item.empty && isEmpty}
                onClick={() => navigate(item.path)}
              >
                <Icon className="size-4" />
                {item.name}
              </ContextMenuItem>
            );
          })}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};
