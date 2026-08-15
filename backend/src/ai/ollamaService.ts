import ollama from "ollama";
import type { JobAnalysisInput } from "./aiService.ts";

export async function askOllama(
  prompt: string
): Promise<string> {
  const response = await ollama.chat({
    model: "llama3.2:3b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.message.content;
}

export async function analyzeWithOllama(
  input: JobAnalysisInput
): Promise<string> {


  const prompt = `
You are a factual job-analysis assistant.

Compare the candidate profile with the job posting using ONLY the information provided below.

STRICT RULES:

1. Never invent facts.
2. Never assume the candidate has a skill that is not explicitly listed or demonstrated in the provided profile.
3. Never assume a job requirement that is not explicitly stated in the job posting.
4. Do not use outside knowledge.
5. Do not treat a technology as missing from the candidate if that technology is explicitly listed in the candidate's skills, experience, or projects.
6. Do not treat a technology as a job requirement unless the job posting explicitly requires or asks for it.
7. Distinguish between:
   - a required skill
   - a job responsibility
   - the context or domain in which the work is performed
8. A phrase describing the product or industry is NOT automatically a candidate qualification.
9. If a job says someone will "build X using React and TypeScript," React and TypeScript are relevant technical requirements.
10. If a job says someone will build software "for AI products," that describes the product context. It does NOT automatically mean previous AI experience is required.
11. If the candidate has a job-required technology explicitly listed in their profile, mark it as a match.
12. Do not call a candidate qualification a "missing skill" simply because the job does not require it.
13. Do not tell the candidate to claim or emphasize a qualification that is not explicitly supported by their profile.

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

ANALYSIS PROCESS

Step 1:
Identify the technical skills or qualifications that are explicitly required or requested by the job posting.

Step 2:
Identify job responsibilities and product/domain context separately.

Step 3:
Compare the explicit job requirements against the candidate's explicitly provided skills, experience, and projects.

Step 4:
Identify only genuine gaps where an explicit job requirement is not supported by the candidate profile.

IMPORTANT EXAMPLE:

If the job says:

"Build React and TypeScript applications for AI products."

Then:

Job requirements:
- React
- TypeScript

Job responsibility:
- Build applications

Product/domain context:
- AI products

Do NOT turn "AI products" into "AI experience required" unless the job posting explicitly says that prior AI experience is required or preferred.

OUTPUT

1. Job Requirements

List only explicit technical skills or qualifications required or requested by the job.

2. Matching Qualifications

List candidate skills, experience, or projects that explicitly match the job requirements.

3. Missing or Unconfirmed Requirements

List only explicit job requirements that are not supported by the candidate profile.

If there are none, say:
"No explicit skill or qualification gaps identified."

4. Relevant Experience

List candidate experience and projects that directly relate to the job responsibilities or requirements.

5. Potential Concerns

Identify factual gaps or uncertainties only.

Do not create concerns simply because the candidate has qualifications that the job does not mention.

6. Suggestions

Provide practical suggestions based only on the supplied information.

Do not recommend claiming, implying, or adding qualifications that are not supported by the candidate profile.

FINAL RULE:

The candidate profile is the source of truth for the candidate's qualifications.

The job posting is the source of truth for the job's explicit requirements.

Do not fill gaps with assumptions.
`;

  return askOllama(prompt);
}