// src/app/dashboard/page.tsx
import CommitTimeline from "@/components/charts/CommitTimeline";
import DevQuestPanel from "@/components/fun/DevQuestPanel";

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gray-700 mb-3 flex items-center justify-center text-2xl">
              🧑‍💻
            </div>
            <h2 className="text-xl font-bold text-white">demo</h2>
            <p className="text-gray-400 text-sm">Level 3 • 1200 XP</p>

            {/* XP Bar */}
            <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Next level: 800 XP left
            </p>

            {/* Streak Info */}
            <div className="flex justify-around w-full mt-4 text-sm text-gray-300">
              <div>
                🔥 Current Streak <br />{" "}
                <span className="font-bold text-white">5 days</span>
              </div>
              <div>
                🏆 Longest <br />{" "}
                <span className="font-bold text-white">12 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commit Timeline */}
        <div className="col-span-2 bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">📈 Commit Timeline</h2>
          <CommitTimeline />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Badges */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-4">🏅 Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
              <span className="text-2xl">🪄</span>
              <p className="text-xs text-gray-300 mt-1">Commit Wizard</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
              <span className="text-2xl">⚡</span>
              <p className="text-xs text-gray-300 mt-1">Pushaholic</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
              <span className="text-2xl">🦜</span>
              <p className="text-xs text-gray-300 mt-1">Polyglot</p>
            </div>
          </div>
        </div>

        {/* Quests */}
        <div className="col-span-2 bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">🗺️ DevQuests</h3>
          <DevQuestPanel />
        </div>
      </div>
    </div>
  );
}
