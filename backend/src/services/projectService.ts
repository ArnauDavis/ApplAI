import { prisma } from "../lib/prisma.ts";

export async function createProject(
  profileId: string,
  projectData: {
    name: string;
    description: string;
    technologies: string[];
  }
) {
  const project = await prisma.project.create({
    data: {
      name: projectData.name,
      description: projectData.description,
      technologies: projectData.technologies,
      userProfileId: profileId,
    },
  });

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    technologies: project.technologies,
  };
}

export async function getProjects(profileId: string) {
  const projects = await prisma.project.findMany({
    where: {
      userProfileId: profileId,
    },
  });

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    technologies: project.technologies,
  }));
}

export async function updateProject(
  id: string,
  projectData: {
    name?: string;
    description?: string;
    technologies?: string[];
  }
) {
  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      ...(projectData.name !== undefined && {
        name: projectData.name,
      }),

      ...(projectData.description !== undefined && {
        description: projectData.description,
      }),

      ...(projectData.technologies !== undefined && {
        technologies: projectData.technologies,
      }),
    },
  });

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    technologies: project.technologies,
  };
}

export async function deleteProject(
  id: string
): Promise<boolean> {
  await prisma.project.delete({
    where: {
      id,
    },
  });

  return true;
}