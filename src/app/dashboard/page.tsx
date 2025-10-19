// // "use client";

// import { signOut, useSession } from "next-auth/react";

// export default function Dashboard() {
//   const { data: session } = useSession();

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
//         <h2 className="text-xl font-bold mb-6">GitGazer</h2>

//         <nav className="flex flex-col gap-3">
//           <a href="#" className="hover:bg-gray-700 p-2 rounded">Overview</a>
//           <a href="#" className="hover:bg-gray-700 p-2 rounded">Commits</a>
//           <a href="#" className="hover:bg-gray-700 p-2 rounded">Insights</a>
//           <a href="#" className="hover:bg-gray-700 p-2 rounded">Settings</a>
//         </nav>

//         <button
//           onClick={() => signOut({ callbackUrl: "/" })}
//           className="mt-auto bg-red-500 hover:bg-red-600 p-2 rounded"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <h1 className="text-2xl font-semibold">Dashboard</h1>
//           <div className="flex items-center gap-3">
//             <img
//               src={session?.user?.image || "/default-avatar.png"}
//               alt="Avatar"
//               className="w-8 h-8 rounded-full"
//             />
//             <span>{session?.user?.name || "User"}</span>
//           </div>
//         </header>

//         {/* Widget Grid */}
//         <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white shadow rounded-lg p-4">Commit Activity</div>
//           <div className="bg-white shadow rounded-lg p-4">Repositories</div>
//           <div className="bg-white shadow rounded-lg p-4">Streaks</div>
//           <div className="bg-white shadow rounded-lg p-4">Top Languages</div>
//           <div className="bg-white shadow rounded-lg p-4">Recent PRs</div>
//           <div className="bg-white shadow rounded-lg p-4">Badges</div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSession } from "next-auth/react";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  console.log("User Session:", session);

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p>User Avatar / Logout Button</p>
        </header>

        {/* Content */}
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
