import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;
  return <>{children}</>;
};

export default PrivateRouter;
