// src/lib/badges.ts
/**
 * Badge evaluation utilities.
 * Each badge has a 'check' function accepting aggregated data and returning boolean.
 *
 * For the MVP we write small functions for some example badges:
 * - commitWizard: >=500 total commits
 * - nightOwl: >70% commits between 23:00 and 03:00 (approx)
 * - polyglot: +5 languages
 * - repoConqueror: >=10 repos
 * - pushaholic: >=20 commits in a single day
 * - streaker: current streak >= 7
 *
 * The real system should consult DB and user-specific activities.
 */

type DayAgg = { date: string; commits: number };

export function totalCommits(agg: DayAgg[]) {
  return agg.reduce((s, d) => s + (d.commits ?? 0), 0);
}

export function commitWizard(agg: DayAgg[]) {
  return totalCommits(agg) >= 500;
}

export function pushaholic(agg: DayAgg[]) {
  return agg.some((d) => d.commits >= 20);
}

export function streakLength(agg: DayAgg[]) {
  // assume agg sorted ascending by date (old -> new)
  let best = 0;
  let cur = 0;
  for (let i = agg.length - 1; i >= 0; i--) {
    if (agg[i].commits > 0) {
      cur++;
    } else {
      break;
    }
  }
  best = Math.max(best, cur);
  return cur;
}

export function nightOwl(aggByHour: { hour: number; commits: number }[]) {
  const nightHours = aggByHour.filter((d) => d.hour >= 23 || d.hour <= 3);
  const total = aggByHour.reduce((s, d) => s + d.commits, 0);
  const nightTotal = nightHours.reduce((s, d) => s + d.commits, 0);
  if (total === 0) return false;
  return nightTotal / total >= 0.7;
}
export function streaker(agg: DayAgg[]) {
  return streakLength(agg) >= 7;
}
export function polyglot(langMap: Record<string, number>) {
  return Object.keys(langMap).length >= 5;
}
export function repoConqueror(repoCount: number) {
  if (repoCount >= 10) return true;
  return false;
}
// Example usage:
// const badges = {
//   commitWizard: commitWizard(aggData),
//   nightOwl: nightOwl(hourlyData),
//   polyglot: polyglot(languageMap),
//   repoConqueror: repoConqueror(totalRepos),
//   pushaholic: pushaholic(aggData),
//   streaker: streaker(aggData),
// };
