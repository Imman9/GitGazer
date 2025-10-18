// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo data...");

  // --- Badges ---
  const badges = [
    {
      key: "commitWizard",
      name: "Commit Wizard",
      icon: "🪄",
      xpReward: 500,
      description: "500 total commits",
    },
    {
      key: "pushaholic",
      name: "Pushaholic",
      icon: "⚡",
      xpReward: 150,
      description: "20+ commits in a day",
    },
    {
      key: "polyglot",
      name: "Polyglot",
      icon: "🦜",
      xpReward: 200,
      description: "5+ languages",
    },
  ];

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { key: b.key },
      update: {},
      create: b,
    });
  }

  // --- User ---
  const user = await prisma.user.upsert({
    where: { githubId: "demo_github" },
    update: {},
    create: {
      githubId: "demo_github",
      username: "demo",
      avatarUrl: "",
      accessToken: "",
    },
  });

  // --- User Profile ---
  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      xp: 1200,
      level: 3,
      theme: "dark",
      avatarStage: 1,
      currentStreak: 5,
      longestStreak: 12,
    },
  });

  // --- Activities (30 days synthetic commits) ---
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    await prisma.activity.create({
      data: {
        userId: user.id,
        date: d,
        commits: Math.round(
          Math.abs(5 + 6 * Math.sin(i / 3) + Math.random() * 6)
        ),
      },
    });
  }

  // --- Quests ---
  const quests = [
    {
      key: "daily_commits",
      name: "Daily Coder",
      template: "Make at least 3 commits today",
    },
    {
      key: "weekly_push",
      name: "Weekend Warrior",
      template: "Push code on Saturday or Sunday",
    },
    {
      key: "streak_keeper",
      name: "Keep It Going",
      template: "Maintain a 7-day streak",
    },
  ];

  for (const q of quests) {
    await prisma.quest.upsert({
      where: { key: q.key },
      update: {},
      create: q,
    });
  }

  // Assign quests to demo user
  const dbQuests = await prisma.quest.findMany();
  for (const quest of dbQuests) {
    await prisma.userQuest.create({
      data: {
        userId: user.id,
        questId: quest.id,
        description: quest.template,
        status: "pending",
        rewardXp: 200,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      },
    });
  }

  console.log("Seed finished ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
