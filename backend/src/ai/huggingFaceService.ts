import { InferenceClient } from "@huggingface/inference";
import type { JobAnalysisInput } from "./aiService.ts";

const HF_TOKEN = process.env.HF_TOKEN;

const MODEL =
  process.env.HF_MODEL ??
  "Qwen/Qwen3-4B-Instruct-2507";

export async function analyzeWithHuggingFace(
  input: JobAnalysisInput
): Promise<string> {
  if (!HF_TOKEN) {
    throw new Error(
      "HF_TOKEN is not configured."
    );
  }

  const client =
    new InferenceClient(HF_TOKEN);

  const prompt = `
You are an AI job search assistant.

Analyze the following job opportunity against the candidate's actual profile.

Do not invent skills, experience, education, or achievements.

Explain your reasoning clearly.

Return the analysis using these sections:

1. Matching Skills
2. Relevant Experience
3. Missing or Potentially Missing Skills
4. Concerns
5. Suggestions

Candidate Profile:

Name:
${input.profile.name}

Summary:
${input.profile.summary}

Skills:
${input.profile.skills.join(", ")}

Experience:
${input.profile.experience
  .map(
    (experience) =>
      `${experience.title} at ${experience.company}
Description: ${experience.description}
Dates: ${experience.startDate} - ${
        experience.endDate ?? "Present"
      }`
  )
  .join("\n\n")}

Projects:
${input.profile.projects
  .map(
    (project) =>
      `${project.name}
Description: ${project.description}
Technologies: ${project.technologies.join(", ")}`
  )
  .join("\n\n")}

Job Posting:

Title:
${input.job.title}

Company:
${input.job.company}

Description:
${input.job.description}

Provide a useful, honest analysis based only on the information above.
`;

  const response =
    await client.chatCompletion({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.2,
    });

  return (
    response.choices[0]?.message?.content ??
    "The AI did not return an analysis."
  );
}