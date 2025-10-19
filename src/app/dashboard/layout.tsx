"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <button className="p-4" onClick={() => setCollapsed(!collapsed)}>
          <FiMenu className="text-xl" />
        </button>

        {!collapsed && (
          <nav className="mt-4 space-y-2">
            <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
              Dashboard
            </a>
            <a href="/repos" className="block px-4 py-2 hover:bg-gray-700">
              Repositories
            </a>
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-700">
              Profile
            </a>
          </nav>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{session?.user?.name || "User"}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
