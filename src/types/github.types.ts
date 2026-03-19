export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
}

export interface Activity {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: Record<string, unknown>;
}
