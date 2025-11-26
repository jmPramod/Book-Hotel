import { useState } from "react";
import { Home, User, DollarSign, LogOut, BarChart, ChevronLeft, ChevronRight } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";
import { Outlet, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode, logout } = useUserStore();
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
console.log("user?.data?.profileImage?.imageUrl",user?.data?.profileImage?.imageUrl);

  const menuItems = [
    { icon: <Home size={22} />, label: "Dashboard", path: "/dashboard" },
    { icon: <BarChart size={22} />, label: "Income", path: "/income" },
    { icon: <DollarSign size={22} />, label: "Expense", path: "/expense" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
    { icon: <LogOut size={22} />, label: "Logout", path: "/login", onClick: logout },
  ];

  const handleClick = (item: any) => {
    if (item.onClick) item.onClick();
    navigate(item.path);
  };
console.log("user",user);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`
          min-h-[90vh] px-4 py-6 flex flex-col gap-6 transition-all duration-300
          ${isOpen ? "w-64" : "w-30"}
          ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}
        `}
      >
        {/* Profile + Toggle Row */}
        <div className="flex items-center justify-between">
          {/* PROFILE IMAGE */}
          <img
            src={user?.data?.profileImage?.imageUrl}
            alt="Profile"
            className={` rounded-full object-cover border
               ${!isOpen ? "w-12 h-12" : "w-32 h-32"}
              `}
          />

          {/* ARROW BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-2 rounded-lg ml-2 transition
              ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-200"}
            `}
          >
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 mt-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(item)}
              className={`
                flex items-center gap-4 p-3 cursor-pointer rounded-lg transition
                ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}
              `}
            >
              {item.icon}
              {isOpen && <span className="text-md">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`
          flex-1 p-8 transition-all
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SideMenu;
