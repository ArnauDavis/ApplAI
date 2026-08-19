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

2. Never invent skills, experience, education, achievements, responsibilities, or job requirements.

3. Never assume one skill implies another skill.

4. Never treat product, industry, domain, or company context as a candidate requirement unless the job posting explicitly requires or prefers that qualification.

5. A technology or qualification explicitly listed in the candidate profile must not be called missing.

6. A technology or qualification must not be treated as a job requirement unless it is explicitly required or requested by the job posting.

7. Do not recommend that the candidate claim, imply, emphasize, discuss, or present a qualification that is not explicitly supported by the candidate profile.

8. Do not use outside knowledge.

9. Job context is not a candidate qualification.

10. Do not create a missing requirement, concern, or suggestion from job context alone.

IMPORTANT EXAMPLE:

If the job says:

"Build React and TypeScript applications for AI products."

Then:

Job requirements:
- React
- TypeScript

Job context:
- AI products

The fact that the products are AI products does NOT mean previous AI experience is a requirement.

Do NOT:
- identify AI experience as a missing requirement
- identify lack of AI experience as a concern
- suggest discussing previous AI experience
- suggest claiming or implying AI experience

unless the job posting explicitly requires or prefers AI experience.

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
Explicit technical skills, qualifications, or requirements that the job posting explicitly requires or requests.

matchingQualifications:
Candidate skills, qualifications, experience, or projects that explicitly match the job requirements.

missingRequirements:
Explicit job requirements that are not supported by the candidate profile.

Do not list something as missing if it appears anywhere in the candidate's skills, experience, or projects.

relevantExperience:
Candidate experience or projects that directly relate to the job requirements or responsibilities.

Only use experience or projects explicitly provided in the candidate profile.

potentialConcerns:
Factual gaps or uncertainties supported by the provided information.

Do not create concerns from assumptions, job context, or outside knowledge.

suggestions:
Practical actions the candidate can take using only qualifications, experience, skills, or requirements explicitly present in the candidate profile or job posting.

Suggestions must NOT introduce new skills, qualifications, experience, or assumptions.

Do not suggest learning, claiming, emphasizing, discussing, or implying a qualification unless that qualification is explicitly supported by the candidate profile or explicitly required or preferred by the job posting.

Do not create suggestions from product, industry, domain, or company context alone.

If there are no useful suggestions supported by the provided information, return an empty array.

If there are no items for an array, return an empty array.

FINAL CHECK BEFORE RETURNING JSON:

- Every job requirement must come from the job posting.
- Every matching qualification must come from the candidate profile.
- Every missing requirement must be an explicit job requirement that is not supported by the candidate profile.
- Every relevant experience item must come from the candidate profile.
- Every concern must be supported by explicit information.
- Every suggestion must be supported by explicit information.
- Do not treat job context as a requirement.
- Do not invent qualifications.
- Do not use outside knowledge.

Remember:

The candidate profile is the source of truth for the candidate's qualifications.

The job posting is the source of truth for the job's requirements.

Do not make assumptions.`



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