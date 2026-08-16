import { getProfileById } from "./profileService.ts";
import {
  analyzeJob,
  type JobAnalysisResult,
} from "../ai/aiService.ts";

export async function analyzeJobForProfile(
  profileId: string,
  jobId: string
): Promise<JobAnalysisResult> {
  const profile = await getProfileById(profileId);

  if (!profile) {
    throw new Error("Profile not found");
  }

  const job = profile.jobs.find(
    (job) => job.id === jobId
  );

  if (!job) {
    throw new Error("Job not found");
  }

  const result = await analyzeJob(
    {
      profile: {
        name: profile.name,
        summary: profile.summary,
        skills: profile.skills,

        experience: profile.experience.map(
          (experience) => ({
            company: experience.company,
            title: experience.title,
            description: experience.description,
            startDate: experience.startDate,
            endDate: experience.endDate,
          })
        ),

        projects: profile.projects.map(
          (project) => ({
            name: project.name,
            description: project.description,
            technologies: project.technologies,
          })
        ),
      },

      job: {
        title: job.title,
        company: job.company,
        description: job.description,
        url: job.url,
      },
    },
    "ollama"
  );

  return result;
}