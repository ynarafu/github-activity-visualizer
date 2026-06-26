import type { ContributionDay } from "../types/github";
import { format, parseISO, getDay } from "date-fns";
import { ja } from "date-fns/locale";

interface Props {
  contributions: ContributionDay[];
}

const LEVEL_COLORS = [
  "bg-gray-800",
  "bg-teal-900",
  "bg-teal-700",
  "bg-teal-500",
  "bg-teal-300",
];

const DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function HeatMap({ contributions }: Props) {
  // 最初のdayの曜日に合わせてpadding
  const firstDay = contributions[0];
  const offset = firstDay ? getDay(parseISO(firstDay.date)) : 0;
  const padded = [...Array(offset).fill(null), ...contributions];

  // weekに分割
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  const totalContribs = contributions.reduce((s, d) => s + d.count, 0);

  return (
    <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-300">コントリビューション (過去1年)</h3>
        <span className="text-xs text-teal-400 font-medium">{totalContribs.toLocaleString()} コントリビューション</span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: "fit-content" }}>
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1">
            <div className="h-3 w-8" /> {/* header spacer */}
            {DAYS.map((d, i) => (
              <div
                key={d}
                className="h-3 w-8 text-right text-gray-600"
                style={{ fontSize: "9px", lineHeight: "12px", visibility: i % 2 === 0 ? "visible" : "hidden" }}
              >
                {d}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => {
            const monthLabel =
              wi > 0 &&
              week[0] &&
              format(parseISO(week[0].date), "MM") !== format(parseISO(weeks[wi - 1].find(Boolean)!.date), "MM")
                ? format(parseISO(week[0].date), "M月", { locale: ja })
                : "";

            return (
              <div key={wi} className="flex flex-col gap-1">
                <div className="h-3 text-gray-600" style={{ fontSize: "9px", lineHeight: "12px", width: "12px" }}>
                  {monthLabel}
                </div>
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} コントリビューション`}
                      className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[day.level]} cursor-pointer hover:ring-1 hover:ring-teal-300 transition-all`}
                    />
                  ) : (
                    <div key={di} className="w-3 h-3" />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 justify-end">
        <span className="text-gray-600 text-xs mr-1">少</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-gray-600 text-xs ml-1">多</span>
      </div>
    </div>
  );
}
