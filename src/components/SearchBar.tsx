import { useState, type FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";

interface Props {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="GitHubユーザー名を入力..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="px-6 py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-gray-700 disabled:text-gray-500 text-black font-semibold rounded-xl transition-all flex items-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "分析"}
      </button>
    </form>
  );
}
