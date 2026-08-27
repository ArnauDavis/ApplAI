import type { JobAnalysis } from "../types/index";

const API_URL = import.meta.env.VITE_API_URL;

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
    throw new Error("Failed to analyze job.");
  }

  const data: { result: JobAnalysis } =
    await response.json();

  return data.result;
}

// --------------------
// AI API Cover Letter Functions
// --------------------

export async function generateCoverLetterWithApi(
  profileId: string,
  jobId: string
): Promise<string> {
  const response = await fetch(
    `${API_URL}/ai/profiles/${profileId}/jobs/${jobId}/cover-letter`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate cover letter.");
  }

  const data: { coverLetter: string } =
    await response.json();

  return data.coverLetter;
}

export async function downloadCoverLetterPdfFromApi(
  profileId: string,
  jobId: string
): Promise<Blob> {
  const response = await fetch(
    `${API_URL}/ai/profiles/${profileId}/jobs/${jobId}/cover-letter/pdf`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to download cover letter PDF.");
  }

  return response.blob();
}
