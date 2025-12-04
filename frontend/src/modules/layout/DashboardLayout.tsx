import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <aside className="hidden md:flex md:flex-col w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
          <Link to="/dashboard" className="text-lg font-semibold">
            HiveWatch
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavLink
            to="/dashboard/map"
            className={({ isActive }) =>
              "flex items-center px-3 py-2 rounded-lg " +
              (isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900")
            }
          >
            Global Attack Map
          </NavLink>
          <NavLink
            to="/dashboard/playbooks"
            className={({ isActive }) =>
              "flex items-center px-3 py-2 rounded-lg " +
              (isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900")
            }
          >
            Playbooks
          </NavLink>
        </nav>
        <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="mb-2">
            {auth.user ? (
              <>
                <div>{auth.user.email}</div>
                <div className="capitalize text-slate-500">{auth.user.role}</div>
              </>
            ) : (
              <span>Not signed in</span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-300 hover:text-white text-xs underline"
          >
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="md:hidden h-14 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <Link to="/dashboard" className="font-semibold">
            HiveWatch
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-slate-300 underline"
          >
            Logout
          </button>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};


