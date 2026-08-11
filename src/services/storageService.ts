import type {
  Job,
  JobApplication,
  UserProfile,
} from "../types/index";

const API_URL = "http://localhost:3000";

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

// --------------------
// API Job Functions
// --------------------

export async function getJobsFromApi(
  profileId: string
): Promise<Job[]> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/jobs`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}

export async function createJobToApi(
  profileId: string,
  job: {
    title: string;
    company: string;
    description: string;
    url?: string;
  }
): Promise<Job> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/jobs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return response.json();
}

// --------------------
// Temporary localStorage Functions
// --------------------

function getItem<T>(
  key: string,
  fallback: T
): T {
  const item = localStorage.getItem(key);

  return item
    ? JSON.parse(item)
    : fallback;
}

function setItem<T>(
  key: string,
  value: T
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

export function getProfile(
  fallback: UserProfile
) {
  return getItem(
    "profile",
    fallback
  );
}

export function saveProfile(
  profile: UserProfile
) {
  setItem(
    "profile",
    profile
  );
}

export function getJobs(
  fallback: Job[]
) {
  return getItem(
    "jobs",
    fallback
  );
}

export function saveJobs(
  jobs: Job[]
) {
  setItem(
    "jobs",
    jobs
  );
}

export function getApplications(
  fallback: JobApplication[]
) {
  return getItem(
    "applications",
    fallback
  );
}

export function saveApplications(
  applications: JobApplication[]
) {
  setItem(
    "applications",
    applications
  );
}

