import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import { Toaster } from "react-hot-toast";
import PrivateRouter from "./components/privateRouter";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRouter><Layout /></PrivateRouter>}>
            <Route index path="/dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
