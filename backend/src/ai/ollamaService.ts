import ollama from "ollama";
import type {
  JobAnalysisInput,
  JobAnalysisResult,
} from "./aiService.ts";
import {
  buildJobAnalysisPrompt,
  buildCoverLetterPrompt,
} from "./prompts/index.ts";

export async function analyzeWithOllama(
  input: JobAnalysisInput
): Promise<JobAnalysisResult> {
  const prompt = buildJobAnalysisPrompt(input);

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
  const prompt = buildCoverLetterPrompt(input, analysis);

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
