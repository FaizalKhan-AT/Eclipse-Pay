import axios from "@/axios.config";
import { AuthForm } from "@/components/forms";
import { useToast } from "@/components/ui";
import { getToastData } from "@/lib/helpers/toast.helper";
import { IFormData } from "@/lib/interfaces/Form.interface";
import { API_ENDPOINTS } from "@/lib/Json";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function registerUser(data: IFormData) {
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.REGISTER, {
        ...data,
      });
      setLoading(false);
      openToaster(res.data);
      navigate("/login");
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
      <AuthForm
        loading={loading}
        title="Sign Up"
        login={false}
        callback={registerUser}
      />
    </div>
  );
};

export default SignUp;
