import { IFormData } from "@/lib/interfaces/Form.interface";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Label,
  Input,
  CardHeader,
  CardTitle,
  CardContent,
  Checkbox,
  AlertDescription,
  Spinner,
} from "@/components/ui";
import { validateEmail, validatePassword } from "@/lib/helpers/validate.helper";
import { AlertDestructive } from "@/components/ui";

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
      return `Password should contain atleast 8 characters 
          \nIt should contain upper and lowercase characters\n
          It should contain numbers and alphanumerics`;
    }
    return true;
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
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={onChange}
              value={formData.password}
              required
            />
            <label className="flex items-center gap-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              <Checkbox
                onCheckedChange={() => setShowPassword(!showPassword)}
              />
              Show password
            </label>
          </div>
          {error ? (
            <AlertDestructive title="Validation Errors">
              <AlertDescription>{error}</AlertDescription>
            </AlertDestructive>
          ) : null}
          <Button type="submit" className="w-full">
            {loading ? <Spinner /> : title}
          </Button>
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
