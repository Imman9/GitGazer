// src/types/github.d.ts
export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}
