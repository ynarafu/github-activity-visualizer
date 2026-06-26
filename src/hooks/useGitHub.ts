import { useState, useCallback } from "react";
import { fetchDashboard } from "../lib/github";
import type { DashboardData } from "../types/github";

type Status = "idle" | "loading" | "success" | "error";

export function useGitHub() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (username: string) => {
    if (!username.trim()) return;
    setStatus("loading");
    setError(null);
    try {
      const result = await fetchDashboard(username.trim());
      setData(result);
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "不明なエラーが発生しました");
      setStatus("error");
    }
  }, []);

  return { status, data, error, load };
}
