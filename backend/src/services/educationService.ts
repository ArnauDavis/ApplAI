import { prisma } from "../lib/prisma.ts";

export async function createEducation(
  profileId: string,
  educationData: {
    school: string;
    degree: string;
    field: string;
  }
) {
  const education = await prisma.education.create({
    data: {
      school: educationData.school,
      degree: educationData.degree,
      field: educationData.field,
      userProfileId: profileId,
    },
  });

  return {
    id: education.id,
    school: education.school,
    degree: education.degree,
    field: education.field,
  };
}

export async function getEducation(profileId: string) {
  const education = await prisma.education.findMany({
    where: {
      userProfileId: profileId,
    },
  });

  return education.map((education) => ({
    id: education.id,
    school: education.school,
    degree: education.degree,
    field: education.field,
  }));
}

export async function updateEducation(
  id: string,
  educationData: {
    school?: string;
    degree?: string;
    field?: string;
  }
) {
  const education = await prisma.education.update({
    where: {
      id,
    },
    data: {
      ...(educationData.school !== undefined && {
        school: educationData.school,
      }),

      ...(educationData.degree !== undefined && {
        degree: educationData.degree,
      }),

      ...(educationData.field !== undefined && {
        field: educationData.field,
      }),
    },
  });

  return {
    id: education.id,
    school: education.school,
    degree: education.degree,
    field: education.field,
  };
}

export async function deleteEducation(
  id: string
): Promise<boolean> {
  await prisma.education.delete({
    where: {
      id,
    },
  });

  return true;
}