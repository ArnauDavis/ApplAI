import type {
  Job,
  JobApplication,
} from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;



// --------------------
// API Application Functions
// --------------------

interface ApplicationApiResponse {
  id: string;
  status: string;
  notes: string | null;
  job: Job;
}

export async function getApplicationsFromApi(
  profileId: string
): Promise<ApplicationApiResponse[]> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/applications`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json();
}

export async function createApplicationToApi(
  profileId: string,
  application: {
    jobId: string;
    status: JobApplication["status"];
    notes?: string;
  }
): Promise<JobApplication> {
  const response = await fetch(
    `${API_URL}/profiles/${profileId}/applications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create application");
  }

  return response.json();
}

export async function updateApplicationToApi(
  applicationId: string,
  application: {
    status?: JobApplication["status"];
    notes?: string;
  }
): Promise<JobApplication> {
  const response = await fetch(
    `${API_URL}/profiles/applications/${applicationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update application");
  }

  return response.json();
}

export async function deleteApplicationFromApi(
  applicationId: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/profiles/applications/${applicationId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
}