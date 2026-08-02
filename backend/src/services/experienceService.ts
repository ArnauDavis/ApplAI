import { prisma } from "../lib/prisma.ts";

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

export async function getExperiences(profileId: string) {
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
    endDate?: string;
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
        endDate: new Date(experienceData.endDate),
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