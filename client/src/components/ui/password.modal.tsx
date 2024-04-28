import { FC, useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogContent,
} from "./dialog";
import { LoadingButton } from "./button";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import axios from "@/axios.config";
import { API_ENDPOINTS } from "@/lib/Json";
import { useParams } from "react-router-dom";
import { useToast } from "./use-toast";
import { getToastData } from "@/lib/helpers/toast.helper";

interface Props {
  callback: () => void;
  trigger: React.RefObject<HTMLButtonElement>;
}

const PasswordModal: FC<Props> = ({ trigger, callback }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [Icon, setIcon] = useState<LucideIcon>(Eye);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const { appname } = useParams();
  const { toast } = useToast();

  function showHide() {
    setShowPassword(!showPassword);
    const icon = !showPassword;
    icon ? setIcon(EyeOff) : setIcon(Eye);
  }

  async function verifyPassword() {
    setLoading(true);
    const name = trigger.current?.dataset.name;
    try {
      let res = await axios.post(
        API_ENDPOINTS.APP + `/${name ? name : appname}`,
        {
          password,
        }
      );
      if (res.data.status === "ok") {
        callback();
        setLoading(false);
        setPassword("");
        closeRef.current?.click();
      }
    } catch (err: any) {
      setLoading(false);
      setPassword("");
      openToaster(err.response.data);
    }
  }

  function openToaster(data: any) {
    let toastData: any = getToastData(data);
    toast(toastData);
  }

  return (
    <Dialog>
      <DialogTrigger ref={trigger}></DialogTrigger>
      <DialogContent className="w-3/6">
        <br />
        <div className="flex items-center space-x-2">
          <Label className="relative w-full">
            Enter App Password :
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
              type={showPassword ? "text" : "password"}
              name="password"
              required
            />
            <Icon
              onClick={showHide}
              className="size-5 absolute right-[10px] bottom-[7px]"
            />
          </Label>
        </div>
        <DialogFooter className="w-full">
          <LoadingButton
            isLoading={loading}
            onClick={verifyPassword}
            type="button"
            variant="secondary"
          >
            Continue
          </LoadingButton>
          <DialogClose ref={closeRef}></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
