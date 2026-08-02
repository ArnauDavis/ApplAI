import { prisma } from "../lib/prisma.ts";
import type { UserProfile } from "../types/index.ts";

function mapProfile(profile: {
  id: string;
  name: string;
  summary: string;
  skills: string[];

  experiences: {
    id: string;
    company: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
  }[];

  education: {
    id: string;
    school: string;
    degree: string;
    field: string;
  }[];

  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
  }[];
}): UserProfile {
  return {
    id: profile.id,
    name: profile.name,
    summary: profile.summary,
    skills: profile.skills,

    experience: profile.experiences.map((experience) => ({
      id: experience.id,
      company: experience.company,
      title: experience.title,
      description: experience.description,
      startDate: experience.startDate.toISOString(),
      endDate: experience.endDate?.toISOString(),
    })),

    education: profile.education.map((education) => ({
      id: education.id,
      school: education.school,
      degree: education.degree,
      field: education.field,
    })),

    projects: profile.projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      technologies: project.technologies,
    })),
  };
}

export async function getProfiles(): Promise<UserProfile[]> {
  const profiles = await prisma.userProfile.findMany({
    include: {
      experiences: true,
      education: true,
      projects: true,
    },
  });

  return profiles.map(mapProfile);
}

export async function getProfileById(
  id: string
): Promise<UserProfile | null> {
  const profile = await prisma.userProfile.findUnique({
    where: {
      id,
    },
    include: {
      experiences: true,
      education: true,
      projects: true,
    },
  });

  if (!profile) {
    return null;
  }

  return mapProfile(profile);
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
    include: {
      experiences: true,
      education: true,
      projects: true,
    },
  });

  return mapProfile(profile);
}

export async function updateProfile(
  id: string,
  profileData: Partial<Omit<UserProfile, "id">>
): Promise<UserProfile | null> {
  const profile = await prisma.userProfile.update({
    where: {
      id,
    },
    data: {
      ...(profileData.name !== undefined && {
        name: profileData.name,
      }),

      ...(profileData.summary !== undefined && {
        summary: profileData.summary,
      }),

      ...(profileData.skills !== undefined && {
        skills: profileData.skills,
      }),
    },
    include: {
      experiences: true,
      education: true,
      projects: true,
    },
  });

  return mapProfile(profile);
}

export async function deleteProfile(
  id: string
): Promise<boolean> {
  await prisma.userProfile.delete({
    where: {
      id,
    },
  });

  return true;
}