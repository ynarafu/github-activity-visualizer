import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import type { ActivityPoint } from "../types/github";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

interface Props {
  data: ActivityPoint[];
}

export function ActivityChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl flex items-center justify-center h-48">
        <p className="text-gray-500 text-sm">アクティビティデータなし</p>
      </div>
    );
  }

  const formatted = data.map((d) => ({
    ...d,
    label: format(parseISO(d.date + "-01"), "MMM yy", { locale: ja }),
  }));

  return (
    <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">月別アクティビティ推移</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={formatted} margin={{ left: -10, right: 8 }}>
          <defs>
            <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(v) => [v, "イベント数"]}
          />
          <Area
            type="monotone"
            dataKey="events"
            stroke="#2dd4bf"
            strokeWidth={2}
            fill="url(#actGrad)"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
