import { analyzeWithHuggingFace } from "./huggingFaceService.ts";
import { analyzeWithOllama } from "./ollamaService.ts";

export type AIProvider =
  | "huggingface"
  | "ollama";

export interface JobAnalysisInput {
  profile: {
    name: string;
    summary: string;
    skills: string[];
    experience: {
      company: string;
      title: string;
      description: string;
      startDate: string;
      endDate?: string | null;
    }[];
    projects: {
      name: string;
      description: string;
      technologies: string[];
    }[];
  };

  job: {
    title: string;
    company: string;
    description: string;
    url?: string | null;
  };
}

export interface JobAnalysisResult {
  jobRequirements: string[];
  matchingQualifications: string[];
  missingRequirements: string[];
  relevantExperience: string[];
  potentialConcerns: string[];
  suggestions: string[];
}

export async function analyzeJob(
  input: JobAnalysisInput,
  provider: AIProvider
): Promise<JobAnalysisResult> {
  if (provider === "huggingface") {
    return analyzeWithHuggingFace(input);
  }

  if (provider === "ollama") {
    return analyzeWithOllama(input);
  }

  throw new Error(
    `Unsupported AI provider: ${provider}`
  );
}