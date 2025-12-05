import RegisterForm from "../../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api/auth";
import { toast } from "react-hot-toast";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    // e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      setLoading(true);
      const res = await register({ name, email, password, role });
      const accessToken = res.data?.data?.tokens?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.log("Register error:", err.response?.data || err);
      const code = err.response?.data?.errorCode;
      if (code === "EMAIL_EXIST") {
        toast.error("Email đã tồn tại. Vui lòng dùng email khác.");
      } else {
        toast.error(
          err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RegisterForm
        handleRegister={handleRegister}
        loading={loading}
        setPassword={setPassword}
        setEmail={setEmail}
        setName={setName}
        setRole={setRole}
      />
    </div>
  );
};
export default RegisterPage;
