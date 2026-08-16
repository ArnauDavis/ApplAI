import ollama from "ollama";
import type {
  JobAnalysisInput,
  JobAnalysisResult,
} from "./aiService.ts";

export async function analyzeWithOllama(
  input: JobAnalysisInput
): Promise<JobAnalysisResult> {
  const prompt = `
You are a factual job-analysis assistant.

Compare the candidate profile with the job posting.

STRICT RULES:

1. Use only information explicitly provided in the candidate profile and job posting.
2. Never invent skills, experience, education, achievements, or requirements.
3. Never assume a skill from another skill.
4. Never treat product or industry context as a candidate requirement unless the job explicitly requires it.
5. A technology explicitly listed in the candidate profile must not be called missing.
6. A technology must not be treated as a job requirement unless it is explicitly required or requested by the job posting.
7. Do not recommend that the candidate claim or imply qualifications that are not supported by their profile.
8. Do not use outside knowledge.

IMPORTANT EXAMPLE:

If the job says:

"Build React and TypeScript applications for AI products."

Then:

Job requirements:
- React
- TypeScript

Job context:
- AI products

Do NOT treat previous AI experience as a requirement unless the job posting explicitly requires or prefers it.

CANDIDATE PROFILE

Name:
${input.profile.name}

Summary:
${input.profile.summary}

Skills:
${input.profile.skills.join(", ")}

Experience:
${
  input.profile.experience.length > 0
    ? input.profile.experience
        .map(
          (experience) =>
            `- ${experience.title} at ${experience.company}: ${experience.description}`
        )
        .join("\n")
    : "None provided"
}

Projects:
${
  input.profile.projects.length > 0
    ? input.profile.projects
        .map(
          (project) =>
            `- ${project.name}: ${project.description} | Technologies: ${project.technologies.join(", ")}`
        )
        .join("\n")
    : "None provided"
}

JOB POSTING

Title:
${input.job.title}

Company:
${input.job.company}

Description:
${input.job.description}

Return ONLY valid JSON.

Do not include markdown.
Do not include code fences.
Do not include explanations before or after the JSON.

The JSON must have exactly this structure:

{
  "jobRequirements": [],
  "matchingQualifications": [],
  "missingRequirements": [],
  "relevantExperience": [],
  "potentialConcerns": [],
  "suggestions": []
}

Each array must contain strings.

Definitions:

jobRequirements:
Explicit technical skills or qualifications required or requested by the job posting.

matchingQualifications:
Candidate skills, experience, or projects that explicitly match the job requirements.

missingRequirements:
Explicit job requirements that are not supported by the candidate profile.

relevantExperience:
Candidate experience or projects that directly relate to the job requirements or responsibilities.

potentialConcerns:
Factual gaps or uncertainties supported by the provided information.

suggestions:
Practical suggestions based only on the provided information.

If there are no items for an array, return an empty array.

Remember:

The candidate profile is the source of truth for the candidate's qualifications.

The job posting is the source of truth for the job's requirements.

Do not make assumptions.
`;

  const response = await ollama.chat({
    model: "llama3.2:3b",
    format: "json",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.message.content.trim();

const analysis =
  JSON.parse(content) as JobAnalysisResult;

return analysis;
}