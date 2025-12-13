import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Settings, BarChart3, User, HelpCircle } from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
    { name: "Users", path: "/users", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div className="p-5 space-y-2">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
            <p className="text-xs text-gray-500">User Management</p>
          </div>
        </div>

        <div className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                    ${isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="p-5 border-t">
        <div className="">
          <button className="flex items-center gap-3 p-3 w-full text-left text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
            <HelpCircle size={20} />
            Support
          </button>
        </div>
      </div>
    </div>
  );
}
