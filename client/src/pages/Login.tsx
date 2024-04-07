import { FC, useContext, useState } from "react";
import { IFormData } from "@/lib/interfaces";
import { useToast } from "@/components/ui";
import { getToastData } from "@/lib/helpers";
import axios from "@/axios.config";
import { API_ENDPOINTS } from "@/lib/Json";
import { saveToSession } from "@/lib/utils";
import { UserAuth, UserType } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/forms";

const Login: FC = () => {
  const { toast } = useToast();
  const { getUser } = useContext<UserType>(UserAuth);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function login(data: IFormData) {
    try {
      setLoading(true);
      const res = await axios.post(API_ENDPOINTS.LOGIN, {
        ...data,
      });
      switch (res.data.status) {
        case "ok":
          saveToSession(res.data.data);
          getUser(res.data.data.token);
          setLoading(false);
          navigate("/dashboard");
          break;
      }
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
    <div className="flex items-center h-[100vh]">
      <AuthForm loading={loading} title="Login" callback={login} />
    </div>
  );
};

export default Login;
