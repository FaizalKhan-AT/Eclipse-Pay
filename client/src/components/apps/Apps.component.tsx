import { FC, useContext, useEffect, useState } from "react";
import { Header } from "./header.component";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  Spinner,
  useToast,
} from "@/components/ui";
import { AppEmptyState } from "../ui/empty";
import { ArrowLeftRight, Plus, Settings, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "@/axios.config";
import { API_ENDPOINTS } from "@/lib/Json";
import { UserAuth, UserType } from "@/context/AuthContext";
import { getToastData } from "@/lib/helpers/toast.helper";
import { IApp } from "@/lib/interfaces/common.interface";
import { AppsContainer } from "./AppsContainer.component";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [apps, setApps] = useState<Array<IApp>>([]);
  const { authState } = useContext<UserType>(UserAuth);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchApps();
  }, []);

  async function fetchApps() {
    setLoading(true);
    try {
      let res = await axios.get(API_ENDPOINTS.APP, {
        headers: {
          id: authState.user?.id,
        },
      });
      let data = res.data.data;
      if (data.length > 0) {
        setIsEmpty(false);
        setApps(data);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      openToaster(err.response.data);
    }
  }
  function openToaster(data: any) {
    let toastData: any = getToastData(data);
    toast(toastData);
  }
  return (
    <>
      <ContextMenu>
        <Header />
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Spinner size="size-10" />
          </div>
        ) : isEmpty ? (
          <AppEmptyState />
        ) : (
          <AppsContainer apps={apps} />
        )}
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
