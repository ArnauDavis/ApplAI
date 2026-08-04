import { prisma } from "../lib/prisma.ts";

export async function createJob(
  profileId: string,
  jobData: {
    title: string;
    company: string;
    description: string;
    url?: string;
  }
) {
  const job = await prisma.job.create({
    data: {
      title: jobData.title,
      company: jobData.company,
      description: jobData.description,
      url: jobData.url,
      userProfileId: profileId,
    },
  });

  return {
    id: job.id,
    title: job.title,
    company: job.company,
    description: job.description,
    url: job.url,
  };
}

export async function getJobs(profileId: string) {
  const jobs = await prisma.job.findMany({
    where: {
      userProfileId: profileId,
    },
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    description: job.description,
    url: job.url,
  }));
}

export async function updateJob(
  id: string,
  jobData: {
    title?: string;
    company?: string;
    description?: string;
    url?: string;
  }
) {
  const job = await prisma.job.update({
    where: {
      id,
    },
    data: {
      ...(jobData.title !== undefined && {
        title: jobData.title,
      }),

      ...(jobData.company !== undefined && {
        company: jobData.company,
      }),

      ...(jobData.description !== undefined && {
        description: jobData.description,
      }),

      ...(jobData.url !== undefined && {
        url: jobData.url,
      }),
    },
  });

  return {
    id: job.id,
    title: job.title,
    company: job.company,
    description: job.description,
    url: job.url,
  };
}

export async function deleteJob(
  id: string
): Promise<boolean> {
  await prisma.job.delete({
    where: {
      id,
    },
  });

  return true;
}