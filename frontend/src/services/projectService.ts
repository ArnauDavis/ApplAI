import type { Project } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

// --------------------
// API Project Functions
// --------------------

export async function getProjectsFromApi(
  profileId: string
): Promise<Project[]> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/projects`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function createProjectToApi(
  profileId: string,
  project: {
    name: string;
    description: string;
    technologies: string[];
  }
): Promise<Project> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function updateProjectToApi(
  projectId: string,
  project: {
    name?: string;
    description?: string;
    technologies?: string[];
  }
): Promise<Project> {
  const response = await fetch(
    `${API_URL}/profiles/projects/${projectId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
}

export async function deleteProjectFromApi(
  projectId: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/profiles/projects/${projectId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
}
