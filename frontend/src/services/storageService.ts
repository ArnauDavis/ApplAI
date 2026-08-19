import type {
  Experience,
  Job,
  JobApplication,
  Project,
  UserProfile,
} from "../types/index";

const API_URL =
  import.meta.env.VITE_API_URL;

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


// --------------------
// API AI Functions
// --------------------


export interface JobAnalysis {
  jobRequirements: string[];
  matchingQualifications: string[];
  missingRequirements: string[];
  relevantExperience: string[];
  potentialConcerns: string[];
  suggestions: string[];
}

export async function analyzeJobWithApi(
  profileId: string,
  jobId: string
): Promise<JobAnalysis> {
  const response = await fetch(
    `${API_URL}/ai/profiles/${profileId}/jobs/${jobId}/analyze`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to analyze job."
    );
  }

  const data: { result: JobAnalysis } =
    await response.json();

  return data.result;
}