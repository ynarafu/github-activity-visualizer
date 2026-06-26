import type {
  GitHubUser,
  GitHubRepo,
  GitHubEvent,
  LanguageStat,
  ContributionDay,
  ActivityPoint,
  DashboardData,
} from "../types/github";
import { subDays, format, parseISO, startOfMonth } from "date-fns";

const BASE = "https://api.github.com";

const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function ghFetch<T>(path: string): Promise<T> {
  const now = Date.now();
  const hit = cache.get(path);
  if (hit && now - hit.ts < CACHE_TTL) return hit.data as T;

  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
  });

  if (res.status === 404) throw new Error("ユーザーが見つかりません");
  if (res.status === 403 || res.status === 429) throw new Error("APIレート制限に達しました。しばらく後に試してください");
  if (!res.ok) throw new Error(`GitHub API エラー: ${res.status}`);

  const data = await res.json();
  cache.set(path, { data, ts: now });
  return data as T;
}

function buildContributions(events: GitHubEvent[]): ContributionDay[] {
  const today = new Date();
  const days: ContributionDay[] = [];
  const countMap: Record<string, number> = {};

  for (const ev of events) {
    const d = format(parseISO(ev.created_at), "yyyy-MM-dd");
    countMap[d] = (countMap[d] ?? 0) + 1;
  }

  for (let i = 364; i >= 0; i--) {
    const d = format(subDays(today, i), "yyyy-MM-dd");
    const count = countMap[d] ?? 0;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
    days.push({ date: d, count, level: level as ContributionDay["level"] });
  }
  return days;
}

function buildLanguages(repos: GitHubRepo[]): LanguageStat[] {
  const langMap: Record<string, number> = {};
  for (const r of repos) {
    if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
  }
  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  return Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }));
}

function buildActivityByMonth(events: GitHubEvent[]): ActivityPoint[] {
  const monthMap: Record<string, number> = {};
  for (const ev of events) {
    const key = format(startOfMonth(parseISO(ev.created_at)), "yyyy-MM");
    monthMap[key] = (monthMap[key] ?? 0) + 1;
  }
  return Object.entries(monthMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, events]) => ({ date, events }));
}

export async function fetchDashboard(username: string): Promise<DashboardData> {
  const [user, repos, events] = await Promise.all([
    ghFetch<GitHubUser>(`/users/${username}`),
    ghFetch<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
    ghFetch<GitHubEvent[]>(`/users/${username}/events/public?per_page=100`),
  ]);

  return {
    user,
    repos,
    events,
    languages: buildLanguages(repos),
    contributions: buildContributions(events),
    activityByMonth: buildActivityByMonth(events),
  };
}
