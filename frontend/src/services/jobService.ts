import type { Job } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

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

export async function importJobFromUrlApi(
  profileId: string,
  url: string
): Promise<Job> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/jobs/import`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to import job from URL."
    );
  }

  return response.json();
}

export async function updateJobToApi(
  jobId: string,
  job: {
    title?: string;
    company?: string;
    description?: string;
    url?: string;
  }
): Promise<Job> {
  const response = await fetch(
    `${API_URL}/profiles/jobs/${jobId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update job");
  }

  return response.json();
}

export async function deleteJobFromApi(
  jobId: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/profiles/jobs/${jobId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
}