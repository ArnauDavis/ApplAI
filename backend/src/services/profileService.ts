import { prisma } from "../lib/prisma.ts";
import type { UserProfile } from "../types/index.ts";

export async function getProfiles(): Promise<UserProfile[]> {
  const profiles = await prisma.userProfile.findMany();

  return profiles.map((profile) => ({
    id: profile.id,
    name: profile.name,
    summary: profile.summary,
    skills: profile.skills,
    experience: [],
    education: [],
    projects: [],
  }));
}

export async function createProfile(
  profileData: Omit<UserProfile, "id">
): Promise<UserProfile> {
  const profile = await prisma.userProfile.create({
    data: {
      name: profileData.name,
      summary: profileData.summary,
      skills: profileData.skills,
    },
  });

  return {
    id: profile.id,
    name: profile.name,
    summary: profile.summary,
    skills: profile.skills,
    experience: [],
    education: [],
    projects: [],
  };
}