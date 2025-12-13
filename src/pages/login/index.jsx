import LoginForm from "../../components/loginForm";
import { useState } from "react";
import { login, getProfile } from "../../services/api/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      setLoading(true);
      const res = await login({ email, password });
      const accessToken = res.data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const userRes = await getProfile();
        if (userRes?.data?.data) {
          localStorage.setItem("user", JSON.stringify(userRes.data.data));
          localStorage.setItem("role", userRes.data.data.role);
        }
      }
      toast.success("Đăng nhập thành công!");
      navigate("/profile");
    } catch (err) {
      console.log("Login error:", err.response?.data || err);
      const code = err.response?.data?.errorCode;
      if (code === "EMAIL_NOT_FOUND") {
        toast.error("Email không tồn tại. Vui lòng kiểm tra lại.");
      } else if (code === "INVALID_PASSWORD") {
        toast.error("Mật khẩu không đúng. Vui lòng kiểm tra lại.");
      } else {
        toast.error(
          err.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm
        handleLogin={handleLogin}
        loading={loading}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  );
};
export default LoginPage;
