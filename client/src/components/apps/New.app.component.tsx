import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactNode,
  useContext,
  useState,
  useRef,
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
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { validatePassword, validateUrls } from "@/lib/helpers/validate.helper";
import { CONSTANTS } from "@/lib/enums/constants.enum";
import axios from "@/axios.config";
import { API_ENDPOINTS } from "@/lib/Json";
import { getToastData } from "@/lib/helpers/toast.helper";
import { UserAuth, UserType } from "@/context/AuthContext";
import { ImportantAlert } from "../ui/important.alert";
import AppsModal from "../ui/apps.modal";

export const NewApp: FC = () => {
  const { toast } = useToast();
  const [error, setError] = useState<ReactNode[] | null>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [Icon, setIcon] = useState<LucideIcon>(Eye);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<IApp>>({
    appName: "",
    password: "",
    description: "",
    allowedOrigins: "",
  });
  const [modalData, setModalData] = useState<string>("");
  const trigger = useRef<HTMLButtonElement>(null);
  const { authState } = useContext<UserType>(UserAuth);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "appName") {
      value = value.toUpperCase().replace(" ", "-");
    }
    setFormData({ ...formData, [name]: value });
  }

  async function createApp() {
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.APP, {
        ...formData,
        userId: authState.user?.id,
      });
      openModal();
      setModalData(
        `
    {
      "appSecret": "${res.data.data.appSecret}",
    }          
    `
      );
      openToaster(res.data.data.message);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      openToaster(err.response.data);
    }
  }

  function onSubmit(e: FormEvent) {
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
    createApp();
  }

  function validate() {
    let errList = [];
    if (formData.appName!.length <= 3) {
      errList.push("App name should be more than 3 letters");
    }
    if (!validatePassword(formData.password!)) {
      errList.push(CONSTANTS.PASSWORD);
    }
    let urls = validateUrls(formData.allowedOrigins!);
    if (urls !== true) {
      errList.push(`Invalid urls: ${urls}`);
    }
    if (errList.length > 0) return errList;
    return true;
  }

  function showHide() {
    setShowPassword(!showPassword);
    const icon = !showPassword;
    icon ? setIcon(EyeOff) : setIcon(Eye);
  }

  function openToaster(data: any) {
    let toastData: any = getToastData(data);
    toast(toastData);
  }

  function openModal() {
    trigger.current?.click();
  }
  return (
    <>
      <AppsModal trigger={trigger} data={modalData} />
      <div className="flex items-center justify-center flex-1">
        <div className="flex rounded-lg border border-dashed shadow-sm w-3/6">
          <form onSubmit={onSubmit} className="p-5 w-full">
            <div className="grid grid-cols-2 gap-2 my-2">
              <Label>
                App Name :
                <Input
                  value={formData.appName}
                  onChange={onChange}
                  className="mt-2"
                  type="text"
                  placeholder="eg: APP-NAME"
                  name="appName"
                  required
                />
              </Label>

              <Label className="relative">
                App Password :
                <Input
                  value={formData.password}
                  onChange={onChange}
                  className="mt-2"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  name="password"
                  required
                />
                <Icon
                  onClick={showHide}
                  className="size-5 absolute right-[10px] bottom-[7px]"
                />
              </Label>
            </div>
            <div className="grid mt-5">
              <Label>
                Allowed Orgins :
                <Input
                  value={formData.allowedOrigins}
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
                Description (optional) :
                <Textarea
                  value={formData.description}
                  onChange={onChange}
                  className="mt-2 resize-none"
                  name="description"
                />
              </Label>
              <ImportantAlert desc="Please remember your app password. It cannot be changed afterwards." />
              {error ? (
                <AlertDestructive title="Validation Errors">
                  <AlertDescription>{error}</AlertDescription>
                </AlertDestructive>
              ) : null}
            </div>
            <div className="grid mt-5">
              <LoadingButton isLoading={loading} type="submit">
                Create
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
