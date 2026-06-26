import type { GitHubUser } from "../types/github";
import { Users, BookOpen, UserCheck } from "lucide-react";

interface Props {
  user: GitHubUser;
}

export function UserCard({ user }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full ring-2 ring-teal-500/50"
      />
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-white truncate">{user.name ?? user.login}</h2>
        <p className="text-sm text-teal-400">@{user.login}</p>
        {user.bio && <p className="text-xs text-gray-400 mt-1 truncate">{user.bio}</p>}
      </div>
      <div className="hidden sm:flex gap-4 text-center">
        <Stat icon={<BookOpen className="w-4 h-4" />} value={user.public_repos} label="Repos" />
        <Stat icon={<Users className="w-4 h-4" />} value={user.followers} label="Followers" />
        <Stat icon={<UserCheck className="w-4 h-4" />} value={user.following} label="Following" />
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-teal-400">{icon}</span>
      <span className="text-white font-bold text-sm">{value.toLocaleString()}</span>
      <span className="text-gray-500 text-xs">{label}</span>
    </div>
  );
}
