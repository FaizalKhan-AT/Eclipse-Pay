import { FC, ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./dialog";
import { Check, CopyIcon } from "lucide-react";
import { ImportantAlert } from "./important.alert";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

interface Props {
  data: string;
  trigger: React.RefObject<HTMLButtonElement>;
}
const notes: ReactNode[] = [
  <li key={1 * 99}>
    Please make sure you copy the below code and store it somewhere safe. The
    appSecret won't be available afterwards.
  </li>,
  <li key={2 * 77}>
    Pass this appSecret on every request as the request header.
  </li>,
];
const AppsModal: FC<Props> = ({ data, trigger }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const navigate = useNavigate();

  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(data);
    } else {
      return document.execCommand("copy", true, data);
    }
  }
  const handleCopyClick = () => {
    copyTextToClipboard()
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger ref={trigger}></DialogTrigger>
      <DialogContent className="max-w-fit">
        <br />
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2 relative">
            <pre className="h-fit border rounded pr-5">{data}</pre>
            {isCopied ? (
              <Check className="size-4 mt-2 cursor-pointer absolute right-[10px] top-[5px] text-lime-500" />
            ) : (
              <CopyIcon
                onClick={handleCopyClick}
                className="size-4 mt-2 cursor-pointer absolute right-[10px] top-[5px]"
              />
            )}
          </div>
        </div>
        <DialogDescription>
          <ImportantAlert desc={notes} />
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={() => navigate("/dashboard/apps")}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppsModal;
