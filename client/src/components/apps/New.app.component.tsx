import { ChangeEvent, FC, FormEvent, ReactNode, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertDestructive,
  AlertTitle,
  Button,
  Input,
  Label,
  Textarea,
} from "../ui";
import { IApp } from "@/lib/interfaces/common.interface";
import { CircleAlert } from "lucide-react";
import { validatePassword, validateUrls } from "@/lib/helpers/validate.helper";

export const NewApp: FC = () => {
  const [error, setError] = useState<ReactNode[] | null>();
  const [formData, setFormData] = useState<Partial<IApp>>({
    appName: "",
    password: "",
    description: "",
    allowedOrigins: "",
  });

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "appName") {
      value = value.toUpperCase().replace(" ", "-");
    }
    setFormData({ ...formData, [name]: value });
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
  }

  function validate() {
    let errList = [];
    if (formData.appName!.length <= 3) {
      errList.push("App name should be more than 3 letters");
    }
    if (!validatePassword(formData.password!)) {
      errList.push(`Password should contain atleast 8 characters 
          \nIt should contain upper and lowercase characters\n
          It should contain numbers and alphanumerics`);
    }
    let urls = validateUrls(formData.allowedOrigins!);
    if (urls !== true) {
      errList.push(`Invalid urls: ${urls}`);
    }
    if (errList.length > 0) return errList;
    return true;
  }

  return (
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

            <Label>
              App Password :
              <Input
                value={formData.password}
                onChange={onChange}
                className="mt-2"
                type="password"
                placeholder=""
                name="password"
                required
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
                placeholder=""
                name="description"
              />
            </Label>
            <ImportantAlert />
            {error ? (
              <AlertDestructive title="Validation Errors">
                <AlertDescription>{error}</AlertDescription>
              </AlertDestructive>
            ) : null}
          </div>
          <div className="grid mt-5">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ImportantAlert: FC = () => {
  return (
    <Alert>
      <CircleAlert className="size-4" />
      <AlertTitle>Attention !</AlertTitle>
      <AlertDescription>
        Please remember your app password. It cannot be changed afterwards.
      </AlertDescription>
    </Alert>
  );
};
