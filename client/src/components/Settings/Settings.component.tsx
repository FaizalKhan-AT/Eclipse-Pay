import { FC, useContext, useEffect, useState } from "react";
import { UserAuth, UserType } from "@/context/AuthContext";
import { IApp } from "@/lib/interfaces/common.interface";
import { Spinner, useToast } from "../ui";
import { API_ENDPOINTS } from "@/lib/Json";
import axios from "@/axios.config";
import { getToastData } from "@/lib/helpers/toast.helper";
import SettingsTable from "../tables/SettingsTable.component";
import { SettingsEmptyState } from "../ui/empty";

const Settings: FC = () => {
  const [apps, setApps] = useState<Array<IApp>>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useContext<UserType>(UserAuth);
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
  async function deleteApp(appname: string) {
    setLoading(true);
    try {
      let res = await axios.delete(API_ENDPOINTS.APP + `/${appname}`);
      openToaster(res.data);
      setLoading(false);
      fetchApps();
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
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="size-10" />
        </div>
      ) : isEmpty ? (
        <SettingsEmptyState />
      ) : (
        <div className="w-fill">
          <h1 className="text-3xl font-bold">Settings</h1>
          <br />
          <SettingsTable deleteApp={deleteApp} apps={apps} />
        </div>
      )}
    </>
  );
};

export default Settings;
