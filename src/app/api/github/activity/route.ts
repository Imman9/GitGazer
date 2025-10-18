// src/app/api/github/activity/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { handler } from "@/app/api/auth/[...nextauth]/route"; // you'll create this
import { fetchCommitsByDate } from "@/lib/github";

/**
 * Example API route that returns synthetic commit data
 * For MVP if session or token missing, return seed/demo data
 */
export async function GET(req: Request) {
  try {
    // get session - this requires you wire up NextAuth
    // NOTE: in App Router route handlers, getServerSession usage differs across Next versions
    // provide a fallback: demo data if session isn't available.
    let commits;
    try {
      // Attempt to get session (may require adapting to your NextAuth config)
      const session = (await getServerSession(handler as any)) as {
        user?: { name?: string; email?: string };
        accessToken?: string;
      } | null;
      if (session?.user && session.accessToken) {
        const token = (session as any).accessToken;
        const username =
          (session as any).user.name ??
          (session as any).user.email?.split("@")[0];
        commits = await fetchCommitsByDate(token, username, 30);
      }
    } catch (err) {
      console.warn("No session available; using demo commit data", err);
    }

    // fallback demo timeline: last 30 days pseudo-random
    if (!commits) {
      const data = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const commitsNum = Math.round(
          Math.max(0, 5 + 6 * Math.sin(i / 3) + Math.random() * 6)
        );
        data.push({ date: d.toISOString().slice(0, 10), commits: commitsNum });
      }
      commits = data;
    }

    return NextResponse.json(commits);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message ?? "unknown error" },
      { status: 500 }
    );
  }
}
