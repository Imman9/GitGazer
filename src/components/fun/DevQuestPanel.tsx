// src/components/fun/DevQuestPanel.tsx
"use client";
import { useEffect, useState } from "react";

type Quest = {
  id: string;
  description: string;
  status: string;
  rewardXp: number;
  expiresAt: string;
};

export default function DevQuestPanel() {
  const [quests, setQuests] = useState<Quest[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/quests/generate");
    const data = await res.json();
    setQuests(data?.quests ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function complete(q: Quest) {
    const res = await fetch(`/api/quests/${q.id}/complete`, { method: "POST" });
    if (res.ok) {
      await load();
    } else {
      alert("Could not complete quest (server validation failed)");
    }
  }

  if (loading || !quests) return <div>Loading quests…</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">🗺️ DevQuests</h3>
      <div className="space-y-3">
        {quests.length === 0 && (
          <div className="text-gray-400">No active quests. Nice break!</div>
        )}
        {quests.map((q) => (
          <div
            key={q.id}
            className="bg-gray-700 p-3 rounded-md flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{q.description}</div>
              <div className="text-sm text-gray-300">
                Reward {q.rewardXp} XP • Expires{" "}
                {new Date(q.expiresAt).toLocaleString()}
              </div>
            </div>

            <div>
              {q.status === "pending" ? (
                <button
                  onClick={() => complete(q)}
                  className="px-3 py-1 bg-green-600 rounded"
                >
                  Mark Complete
                </button>
              ) : (
                <span className="text-sm text-gray-300">Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
