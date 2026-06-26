import { AlertCircle, GitBranch, BarChart2 } from "lucide-react";

export function ErrorView({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <AlertCircle className="w-12 h-12 text-red-400" />
      <p className="text-red-300 text-sm text-center max-w-xs">{message}</p>
    </div>
  );
}

export function EmptyView() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div className="relative">
        <GitBranch className="w-16 h-16 text-gray-700" />
        <BarChart2 className="w-8 h-8 text-teal-600 absolute -bottom-2 -right-2" />
      </div>
      <div>
        <p className="text-gray-400 font-medium">GitHub ユーザー名を入力してください</p>
        <p className="text-gray-600 text-sm mt-1">コントリビューション・言語・スターなどを可視化します</p>
      </div>
    </div>
  );
}

export function LoadingView() {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-3" />
          <div className="h-32 bg-gray-700/50 rounded" />
        </div>
      ))}
    </div>
  );
}
