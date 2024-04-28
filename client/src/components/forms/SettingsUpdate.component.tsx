import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertDescription,
  AlertDestructive,
  Input,
  Label,
  LoadingButton,
  Textarea,
  useToast,
} from "../ui";
import { IApp } from "@/lib/interfaces/common.interface";
import { useParams } from "react-router-dom";
import axios from "@/axios.config";
import { API_ENDPOINTS } from "@/lib/Json";
import { getToastData } from "@/lib/helpers/toast.helper";
import { Switch } from "../ui/switch";
import { validateUrls } from "@/lib/helpers/validate.helper";
import PasswordModal from "../ui/password.modal";

const SettingsUpdate: FC = () => {
  const [app, setApp] = useState<IApp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ReactNode[] | null>();
  const trigger = useRef<HTMLButtonElement>(null);
  const { appname } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchApp();
  }, []);

  async function fetchApp() {
    try {
      let res = await axios.get(API_ENDPOINTS.APP + `/${appname}`);
      let data = res.data.data;
      if (data.accountNumber === 985628745) data.accountNumber = null;
      setApp(res.data.data);
    } catch (err: any) {
      openToaster(err.response.data);
    }
  }

  function openToaster(data: any) {
    let toastData: any = getToastData(data);
    toast(toastData);
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (app) {
      setApp({ ...app, [e.target.name]: e.target.value });
    }
  }

  function submitFn(e: FormEvent) {
    e.preventDefault();
    let err = validate();
    if (err !== true) {
      let errList = err.map((item) => {
        return <li key={item}>{item}</li>;
      });
      setError(errList);
      return;
    }
    setError(null);
    if (app?.isProd) {
      openModal();
    } else updateApp();
  }

  async function updateApp() {
    setLoading(true);
    try {
      let res = await axios.patch(API_ENDPOINTS.APP + `/${appname}`, {
        ...app,
        accountNumber: +app!.accountNumber,
      });
      openToaster(res.data);
      setLoading(false);
    } catch (err: any) {
      openToaster(err.response.data);
      setLoading(false);
    }
  }

  function validate() {
    let errList = [];
    let urls = validateUrls(app?.allowedOrigins!);
    if (urls !== true) {
      errList.push(`Invalid urls: ${urls}`);
    }
    if (errList.length > 0) return errList;
    return true;
  }

  function openModal() {
    trigger.current?.click();
  }

  return (
    <>
      <PasswordModal trigger={trigger} callback={updateApp} />
      <div className="flex items-center justify-center flex-1">
        <div className="flex rounded-lg border border-dashed shadow-sm w-3/6">
          <form onSubmit={submitFn} className="p-5 w-full">
            <h1 className="text-center text-xl font-bold">App Settings</h1>
            <div className="grid mt-5">
              <Label>
                App Name :
                <Input
                  value={app?.appName}
                  readOnly
                  className="mt-2 cursor-not-allowed"
                  type="text"
                  name="appName"
                  required
                />
              </Label>
              <br />
              <Label>
                Allowed Orgins :
                <Input
                  value={app?.allowedOrigins}
                  onChange={onChange}
                  className="mt-2"
                  type="text"
                  placeholder="eg: http://localhost:1234/ (multiple origins comma seperated)"
                  name="allowedOrigins"
                  required
                />
              </Label>
            </div>
            <div className="grid mt-5 gap-3">
              <Label>
                Description :
                <Textarea
                  value={app?.description}
                  onChange={onChange}
                  className="mt-2 resize-none"
                  name="description"
                />
              </Label>
              <Label className="flex items-center gap-4">
                Switch to production account :
                <Switch
                  data-name="isProd"
                  checked={app?.isProd}
                  onCheckedChange={(e) => {
                    if (app) setApp({ ...app, isProd: e });
                  }}
                />
              </Label>
              {app?.isProd ? (
                <Label>
                  Connect bank account :
                  <Input
                    value={app?.accountNumber}
                    onChange={onChange}
                    className="mt-2"
                    type="text"
                    placeholder="Enter bank account number"
                    name="accountNumber"
                    required
                  />
                </Label>
              ) : null}
              {error ? (
                <AlertDestructive title="Validation Errors">
                  <AlertDescription>{error}</AlertDescription>
                </AlertDestructive>
              ) : null}
            </div>
            <div className="grid mt-5">
              <LoadingButton isLoading={loading} type="submit">
                Update
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsUpdate;
