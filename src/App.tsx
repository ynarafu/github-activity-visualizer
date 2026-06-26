import { GitBranch } from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { UserCard } from "./components/UserCard";
import { HeatMap } from "./components/HeatMap";
import { LanguageChart } from "./components/LanguageChart";
import { StarChart } from "./components/StarChart";
import { ActivityChart } from "./components/ActivityChart";
import { ErrorView, EmptyView, LoadingView } from "./components/StateViews";
import { useGitHub } from "./hooks/useGitHub";

export default function App() {
  const { status, data, error, load } = useGitHub();

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      {/* Header */}
      <header className="border-b border-gray-800/60 sticky top-0 z-10 backdrop-blur bg-[#0a0b0f]/80">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <GitBranch className="w-6 h-6 text-teal-400 shrink-0" />
          <span className="font-bold text-sm text-gray-200 hidden sm:block">GitHub Activity Visualizer</span>
          <div className="flex-1">
            <SearchBar onSearch={load} loading={status === "loading"} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {status === "idle" && <EmptyView />}
        {status === "loading" && <LoadingView />}
        {status === "error" && <ErrorView message={error ?? "エラーが発生しました"} />}

        {status === "success" && data && (
          <div className="flex flex-col gap-4">
            {/* User */}
            <UserCard user={data.user} />

            {/* Heatmap — full width */}
            <HeatMap contributions={data.contributions} />

            {/* 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LanguageChart languages={data.languages} />
              <StarChart repos={data.repos} />
            </div>

            {/* Activity full width */}
            <ActivityChart data={data.activityByMonth} />

            <p className="text-center text-gray-700 text-xs mt-2">
              Data from GitHub Public API · Updates cached for 5 min
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
