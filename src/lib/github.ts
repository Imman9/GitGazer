// src/lib/github.ts
import axios from "axios";

/**
 * Small GitHub API helpers.
 * Note: use token from NextAuth session when calling.
 */

/** fetch commit counts aggregated by date for the last N days for a given username.
 * This is a very simple implementation using events (public events) as fallback.
 * For private repo data, use /repos/:owner/:repo/commits with token and iterate repos.
 */
export async function fetchCommitsByDate(
  token: string,
  username: string,
  days = 30
) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  // Use the events endpoint as a lightweight sample (works for public activity)
  const url = `https://api.github.com/users/${username}/events/public`;
  const resp = await axios.get(url, {
    headers: { Authorization: `token ${token}` },
  });

  const events = resp.data as any[];

  // naive aggregation: count PushEvent payload commits by created_at date
  const map = new Map<string, number>();
  for (const ev of events) {
    if (ev.type !== "PushEvent") continue;
    const date = new Date(ev.created_at).toISOString().slice(0, 10);
    const commits = ev.payload?.commits?.length ?? 0;
    map.set(date, (map.get(date) ?? 0) + commits);
  }

  // produce array for last `days` days with 0s where missing
  const out: { date: string; commits: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, commits: map.get(key) ?? 0 });
  }
  return out;
}

/** fetch languages across repos (public) */
export async function fetchLanguages(token: string, username: string) {
  const url = `https://api.github.com/users/${username}/repos?per_page=100`;
  const resp = await axios.get(url, {
    headers: { Authorization: `token ${token}` },
  });
  const repos = resp.data as any[];
  const langMap: Record<string, number> = {};
  for (const repo of repos) {
    if (!repo.language) continue;
    langMap[repo.language] = (langMap[repo.language] ?? 0) + 1;
  }
  return langMap; // simple count map
}
