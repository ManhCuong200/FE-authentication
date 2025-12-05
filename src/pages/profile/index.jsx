import { useEffect, useState } from "react";
import { getProfile, logout } from "../../services/api/auth";
import UserProfile from "../../components/profile/UserProfile";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (err) {
      console.log("GET ME ERROR:", err);
      toast.error("Lỗi khi tải thông tin người dùng. Vui lòng đăng nhập lại.");
      navigate("/login"); 
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    toast.success("Đăng xuất thành công.");
    navigate("/login"); 
  };

  return <UserProfile user={user} onLogout={handleLogout} />;
};

export default ProfilePage;
