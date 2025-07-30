import React from "react";
import {
  FiMenu,
  FiX,
  FiSettings,
  FiScissors,
  FiCalendar,
  FiUsers,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const menuItems = [
    { id: "appointments", icon: <FiCalendar className="text-xl" />, label: "Appointments" },
    { id: "services", icon: <FiScissors className="text-xl" />, label: "Services" },
    { id: "barbers", icon: <FiUsers className="text-xl" />, label: "Barbers" },
    { id: "users", icon: <FiUser className="text-xl" />, label: "Users" },
  ];

  const handleLogout = () => {
    auth.signOut();
    navigate('/')
    setMobileOpen(false);
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-indigo-950 border-r border-blue-800/50 h-full flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-blue-900/50 h-16">
        {sidebarOpen ? (
          <h2 className="text-xl font-bold tracking-wide truncate">Admin Panel</h2>
        ) : (
          <FiSettings className="text-2xl mx-auto" />
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-blue-900/50 transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center w-full p-4 transition-colors duration-200 ${
              activeTab === item.id
                ? "bg-white/90 text-blue-950 font-semibold shadow-inner"
                : "hover:bg-blue-900/50 text-white/90"
            }`}
            aria-current={activeTab === item.id ? "page" : undefined}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {sidebarOpen && (
              <span className="ml-3 text-left truncate">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-900/50">
        <button
          className="flex items-center w-full p-3 rounded-lg hover:bg-blue-900/50 transition-colors text-white/80 hover:text-white"
          onClick={() => {
            handleLogout()
            console.log("Logging out...");
          }}
        >
          <FiLogOut className="text-xl" />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;