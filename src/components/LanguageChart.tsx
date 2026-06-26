import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { LanguageStat } from "../types/github";

interface Props {
  languages: LanguageStat[];
}

const COLORS = [
  "#2dd4bf", "#818cf8", "#f472b6", "#fb923c",
  "#a3e635", "#60a5fa", "#facc15", "#e879f9",
];

export function LanguageChart({ languages }: Props) {
  if (languages.length === 0) {
    return (
      <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl flex items-center justify-center h-48">
        <p className="text-gray-500 text-sm">言語データなし</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">使用言語</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={languages}
            dataKey="percentage"
            nameKey="language"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            animationBegin={0}
            animationDuration={800}
          >
            {languages.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(v, name) => [`${v}%`, name]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(v) => <span style={{ color: "#9ca3af", fontSize: "11px" }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
