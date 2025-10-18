// src/components/charts/CommitTimeline.tsx
"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/** Client component that fetches /api/github/activity */
export default function CommitTimeline() {
  const [data, setData] = useState<{ date: string; commits: number }[] | null>(
    null
  );

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error("Failed to load commit timeline", err);
        setData([]);
      });
  }, []);

  if (!data)
    return (
      <div className="h-40 flex items-center justify-center">
        Loading chart…
      </div>
    );

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "#cbd5e1" }} />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="#7c3aed"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
