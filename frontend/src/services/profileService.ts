import type { UserProfile } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

// --------------------
// API Profile Functions
// --------------------

export async function getProfilesFromApi(): Promise<UserProfile[]> {
  const response = await fetch(`${API_URL}/profiles`);

  if (!response.ok) {
    throw new Error("Failed to fetch profiles");
  }

  return response.json();
}

export async function getProfileFromApi(
  profileId: string
): Promise<UserProfile> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}

export async function saveProfileToApi(
  profile: UserProfile
): Promise<UserProfile> {
  const response = await fetch(
    `${API_URL}/profiles/${profile.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profile.name,
        summary: profile.summary,
        skills: profile.skills,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save profile");
  }

  return response.json();
}
