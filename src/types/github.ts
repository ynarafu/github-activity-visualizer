export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    action?: string;
    size?: number;
  };
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export interface ActivityPoint {
  date: string;
  events: number;
}

export interface DashboardData {
  user: GitHubUser;
  repos: GitHubRepo[];
  events: GitHubEvent[];
  languages: LanguageStat[];
  contributions: ContributionDay[];
  activityByMonth: ActivityPoint[];
}
