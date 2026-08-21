import { getProfileById } from "./profileService.ts";
import { generateCoverLetterWithOllama } from "../ai/ollamaService.ts";
import {
  analyzeJob,
  type JobAnalysisInput,
} from "../ai/aiService.ts";
import { prisma } from "../lib/prisma.ts";

export async function generateCoverLetterForJob(
  profileId: string,
  jobId: string
): Promise<string> {
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

  const input: JobAnalysisInput = {
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
  };

  // First analyze the job and candidate profile.
  const analysis = await analyzeJob(
    input,
    "ollama"
  );

  // Use the validated analysis as the qualification
  // boundary for cover-letter generation.
  const coverLetter =
    await generateCoverLetterWithOllama(
      input,
      analysis
    );

  if (!coverLetter) {
    throw new Error(
      "AI returned an empty cover letter"
    );
  }

  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      coverLetter,
    },
  });

  return coverLetter;
}