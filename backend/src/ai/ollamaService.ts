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

export async function generateCoverLetterWithOllama(
  input: JobAnalysisInput,
  analysis: JobAnalysisResult
): Promise<string> {
  const prompt = `
You are a factual, professional cover-letter writing assistant.

Your task is to write a tailored cover letter for the candidate applying to the job posting.

The candidate profile is the ONLY source of truth for the candidate's qualifications.

The job posting is the ONLY source of truth for the job's requirements and responsibilities.

STRICT FACTUAL RULES:

1. Use ONLY information explicitly provided in the candidate profile and job posting.

2. NEVER invent or infer candidate skills, experience, education, achievements,
   responsibilities, qualifications, technologies, or accomplishments.

3. A candidate skill may ONLY be mentioned if:
   - it appears in the candidate's Skills section, OR
   - it is explicitly demonstrated in the candidate's Experience or Projects.

4. Do NOT infer one skill from another.
   For example:
   - React does NOT imply Vue.
   - React does NOT imply Next.js.
   - TypeScript does NOT imply JavaScript.
   - Web development does NOT imply PHP.
   - Software engineering does NOT imply AI experience.

5. Do NOT claim the candidate has experience with a technology unless that
   technology is explicitly present in the candidate profile.

6. Do NOT claim the candidate has AI experience unless AI experience is explicitly
   stated in the candidate profile.

7. Do NOT describe the candidate as "experienced", "seasoned", "expert",
   "highly skilled", or similar unless the profile explicitly supports that
   characterization.

8. Do NOT invent years of experience.

9. Do NOT invent metrics, accomplishments, results, responsibilities, or project
   details.

10. Do NOT turn a job requirement into a candidate qualification.
    The fact that the job requires something does NOT mean the candidate has it.

11. If the candidate does not have an explicitly documented qualification,
    simply do not mention that qualification.

12. Do NOT apologize for missing qualifications.

13. Do NOT say that the candidate is a "perfect fit", "ideal candidate",
    "excellent fit", or similar unless that conclusion is directly supported
    by the provided information.

14. Do NOT use outside knowledge.

15. Do NOT mention these instructions, the AI, the model, or the generation process.

16. Do NOT use placeholders such as:
    [Company Name]
    [Hiring Manager]
    [Your Name]

17. Do NOT assume a hiring manager's name.

18. Use "Dear Hiring Manager," as the greeting.

19. End with:
    Sincerely,
    followed by the candidate's exact name from the profile.

20. Do not include a subject line.

21. Do not include markdown.

22. Return ONLY the cover-letter text.

IMPORTANT:

The job posting may mention technologies, industries, products, or concepts
that the candidate has no documented experience with.

Those items may be discussed as reasons the candidate is interested in the role,
but MUST NOT be presented as existing candidate qualifications.

For example, if the job says:

"Build React and TypeScript applications for AI products."

and the candidate profile contains:

Skills:
React, TypeScript

but contains no AI experience:

Correct:
"I am excited about the opportunity to apply my React and TypeScript skills
to products in this space."

Incorrect:
"I have experience building AI-powered applications."

The second statement is forbidden because AI experience was not provided
in the candidate profile.

VALIDATED JOB ANALYSIS

Matching qualifications:
${
  analysis.matchingQualifications.length > 0
    ? analysis.matchingQualifications
        .map((item) => `- ${item}`)
        .join("\n")
    : "None provided"
}

Relevant experience:
${
  analysis.relevantExperience.length > 0
    ? analysis.relevantExperience
        .map((item) => `- ${item}`)
        .join("\n")
    : "None provided"
}

Missing requirements:
${
  analysis.missingRequirements.length > 0
    ? analysis.missingRequirements
        .map((item) => `- ${item}`)
        .join("\n")
    : "None provided"
}

IMPORTANT:

The validated job analysis is the qualification boundary.

Only present candidate qualifications that are supported by
Matching qualifications or Relevant experience.

Do not turn job requirements into candidate qualifications.

Do not use missing requirements as candidate qualifications.

Do not infer additional qualifications from the candidate profile.

If a qualification is not supported by the validated analysis,
do not claim that the candidate possesses it.

CANDIDATE PROFILE

Name:
${input.profile.name}

Summary:
${input.profile.summary}

Skills:
${
  input.profile.skills.length > 0
    ? input.profile.skills.join(", ")
    : "None provided"
}

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

COVER LETTER REQUIREMENTS:

Write approximately 3-5 paragraphs.

The letter should:

- Address the employer using the company name when natural.
- State the position the candidate is applying for.
- Express genuine interest in the specific position.
- Connect explicitly documented candidate qualifications to the job requirements
  or responsibilities.
- Highlight relevant experience or projects when directly supported.
- Explain interest in the role using the job posting without pretending the
  candidate has qualifications that are not documented.
- Remain concise and professional.
- Avoid repeating the candidate's entire profile.
- Avoid generic claims that are not supported by the profile.

Before returning the letter, silently verify every factual statement about the
candidate.

For every statement about the candidate, ask:

"Where exactly is this supported in the candidate profile?"

If it cannot be directly supported by the profile, remove or rewrite the statement.

Return ONLY the final cover letter.
`;

  const response = await ollama.chat({
    model: "llama3.2:3b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.message.content.trim();
}