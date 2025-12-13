import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, UserCog } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const LoginForm = ({ handleLogin, loading, email, password, setEmail, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-2 mb-8">
                <UserCog className="text-blue-600" size={32} />
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Chào mừng trở lại</h2>
                    <p className="text-gray-500 text-sm">
                        Vui lòng nhập thông tin để truy cập hệ thống quản lý.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Nhập địa chỉ email của bạn"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="block w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Nhập mật khẩu"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner /> Logging in...
                            </div>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;