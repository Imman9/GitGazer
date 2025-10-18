import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quests = await prisma.userQuest.findMany({
  where: { status: "pending" },
  include: { quest: true },
});

type QuestWithRelations = (typeof quests)[number];

export async function GET() {
  const quests = await prisma.userQuest.findMany({
    where: { status: "pending" },
    include: { quest: true },
  });

  return NextResponse.json({
    quests: quests.map((uq: QuestWithRelations) => ({
      id: uq.id,
      description: uq.description,
      status: uq.status,
      rewardXp: uq.rewardXp,
      expiresAt: uq.expiresAt,
    })),
  });
}
