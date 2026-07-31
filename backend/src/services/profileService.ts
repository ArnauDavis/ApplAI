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

    education: [],
    projects: [],
  };
}

export async function getProfiles(): Promise<UserProfile[]> {
  const profiles = await prisma.userProfile.findMany({
    include: {
      experiences: true,
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

export async function createExperience(
  profileId: string,
  experienceData: {
    company: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
  }
) {
  const experience = await prisma.experience.create({
    data: {
      company: experienceData.company,
      title: experienceData.title,
      description: experienceData.description,
      startDate: new Date(experienceData.startDate),
      endDate: experienceData.endDate
        ? new Date(experienceData.endDate)
        : null,
      userProfileId: profileId,
    },
  });

  return {
    id: experience.id,
    company: experience.company,
    title: experience.title,
    description: experience.description,
    startDate: experience.startDate.toISOString(),
    endDate: experience.endDate?.toISOString() ?? null,
  };
}

export async function getExperiences(
  profileId: string
) {
  const experiences = await prisma.experience.findMany({
    where: {
      userProfileId: profileId,
    },
  });

  return experiences.map((experience) => ({
    id: experience.id,
    company: experience.company,
    title: experience.title,
    description: experience.description,
    startDate: experience.startDate.toISOString(),
    endDate: experience.endDate?.toISOString() ?? null,
  }));
}

export async function updateExperience(
  id: string,
  experienceData: {
    company?: string;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string | null;
  }
) {
  const experience = await prisma.experience.update({
    where: {
      id,
    },
    data: {
      ...(experienceData.company !== undefined && {
        company: experienceData.company,
      }),

      ...(experienceData.title !== undefined && {
        title: experienceData.title,
      }),

      ...(experienceData.description !== undefined && {
        description: experienceData.description,
      }),

      ...(experienceData.startDate !== undefined && {
        startDate: new Date(experienceData.startDate),
      }),

      ...(experienceData.endDate !== undefined && {
        endDate: experienceData.endDate
          ? new Date(experienceData.endDate)
          : null,
      }),
    },
  });

  return {
    id: experience.id,
    company: experience.company,
    title: experience.title,
    description: experience.description,
    startDate: experience.startDate.toISOString(),
    endDate: experience.endDate?.toISOString() ?? null,
  };
}

export async function deleteExperience(
  id: string
): Promise<boolean> {
  await prisma.experience.delete({
    where: {
      id,
    },
  });

  return true;
}