import { IFormData } from "@/lib/interfaces/Form.interface";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Label,
  Input,
  CardHeader,
  CardTitle,
  CardContent,
  AlertDescription,
  LoadingButton,
} from "@/components/ui";
import { validateEmail, validatePassword } from "@/lib/helpers/validate.helper";
import { AlertDestructive } from "@/components/ui";
import { CONSTANTS } from "@/lib/enums/constants.enum";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface Props {
  title: string;
  login?: boolean;
  callback: (data: IFormData) => void;
  loading: boolean;
}

export const AuthForm: FC<Props> = ({
  title,
  login = true,
  callback,
  loading,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [Icon, setIcon] = useState<LucideIcon>(Eye);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!login) {
      setError("");
      const err = validate();
      if (err !== true) {
        setError(err);
        return;
      }
    }
    callback(formData);
  }

  function validate() {
    if (!validateEmail(formData.email)) {
      return "Enter a valid email";
    }
    if (!validatePassword(formData.password)) {
      return CONSTANTS.PASSWORD;
    }
    return true;
  }
  function showHide() {
    setShowPassword(!showPassword);
    const icon = !showPassword;
    icon ? setIcon(EyeOff) : setIcon(Eye);
  }
  return (
    <Card className="mx-auto max-w-sm w-[353px]">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* {login ? (
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              ) : null} */}
            </div>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={onChange}
                value={formData.password}
                required
              />
              <Icon
                onClick={showHide}
                className="size-5 absolute right-[10px] bottom-[7px]"
              />
            </div>
          </div>
          {error ? (
            <AlertDestructive title="Validation Errors">
              <AlertDescription>{error}</AlertDescription>
            </AlertDestructive>
          ) : null}
          <LoadingButton isLoading={loading} type="submit" className="w-full">
            {title}
          </LoadingButton>
        </form>
        {login ? (
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log In
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
