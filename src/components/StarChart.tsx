import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import type { GitHubRepo } from "../types/github";
import { Star } from "lucide-react";

interface Props {
  repos: GitHubRepo[];
}

export function StarChart({ repos }: Props) {
  const top10 = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .filter((r) => r.stargazers_count > 0);

  if (top10.length === 0) {
    return (
      <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl flex items-center justify-center h-48">
        <p className="text-gray-500 text-sm">スター付きリポジトリなし</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-400" />
        <h3 className="text-sm font-semibold text-gray-300">スター数 Top10</h3>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={top10} layout="vertical" margin={{ left: 0, right: 16 }}>
          <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: string) => v.length > 14 ? v.slice(0, 14) + "…" : v}
          />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
            formatter={(v) => [typeof v === "number" ? v.toLocaleString() : v, "Stars"]}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar dataKey="stargazers_count" radius={[0, 4, 4, 0]} animationDuration={800}>
            {top10.map((_, i) => (
              <Cell key={i} fill={i === 0 ? "#2dd4bf" : `rgba(45,212,191,${0.8 - i * 0.07})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
