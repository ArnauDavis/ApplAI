import type { Experience } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

// --------------------
// API Experience Functions
// --------------------

export async function getExperiencesFromApi(
  profileId: string
): Promise<Experience[]> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/experiences`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch experiences");
  }

  return response.json();
}

export async function createExperienceToApi(
  profileId: string,
  experience: {
    company: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
  }
): Promise<Experience> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/experiences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create experience");
  }

  return response.json();
}

export async function updateExperienceToApi(
  experienceId: string,
  experience: {
    company?: string;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<Experience> {
  const response = await fetch(
    `${API_URL}/profiles/experiences/${experienceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experience),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update experience");
  }

  return response.json();
}

export async function deleteExperienceFromApi(
  experienceId: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/profiles/experiences/${experienceId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete experience");
  }
}
