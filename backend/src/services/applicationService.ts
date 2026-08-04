import { prisma } from "../lib/prisma.ts";

export async function createApplication(
  profileId: string,
  applicationData: {
    jobId: string;
    status: string;
    notes?: string;
  }
) {
  const application = await prisma.application.create({
    data: {
      jobId: applicationData.jobId,
      status: applicationData.status,
      notes: applicationData.notes,
      userProfileId: profileId,
    },
  });

  return {
    id: application.id,
    jobId: application.jobId,
    status: application.status,
    notes: application.notes,
  };
}

export async function getApplications(
  profileId: string
) {
  const applications = await prisma.application.findMany({
    where: {
      userProfileId: profileId,
    },
    include: {
      job: true,
    },
  });

  return applications.map((application) => ({
    id: application.id,
    status: application.status,
    notes: application.notes,
    job: {
      id: application.job.id,
      title: application.job.title,
      company: application.job.company,
      description: application.job.description,
      url: application.job.url,
    },
  }));
}

export async function updateApplication(
  id: string,
  applicationData: {
    status?: string;
    notes?: string;
  }
) {
  const application = await prisma.application.update({
    where: {
      id,
    },
    data: {
      ...(applicationData.status !== undefined && {
        status: applicationData.status,
      }),

      ...(applicationData.notes !== undefined && {
        notes: applicationData.notes,
      }),
    },
  });

  return {
    id: application.id,
    jobId: application.jobId,
    status: application.status,
    notes: application.notes,
  };
}

export async function deleteApplication(
  id: string
): Promise<boolean> {
  await prisma.application.delete({
    where: {
      id,
    },
  });

  return true;
}