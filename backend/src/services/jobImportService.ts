import * as cheerio from "cheerio";
import { createJob } from "./jobService.ts";

export interface ImportedJobData {
  title: string;
  company: string;
  description: string;
  url: string;
}

export async function importJobFromUrl(
  url: string
): Promise<ImportedJobData> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch job posting: ${response.status} ${response.statusText}`
    );
  }

  const html = await response.text();

  const $ = cheerio.load(html);

  // --------------------
  // Strategy 1: JSON-LD
  // --------------------

  const jsonLdScripts =
    $('script[type="application/ld+json"]');

  for (const element of jsonLdScripts.toArray()) {
    const jsonText = $(element).text();

    try {
      const data = JSON.parse(jsonText);

      const jobPosting =
        Array.isArray(data)
          ? data.find(
              (item) =>
                item["@type"] === "JobPosting"
            )
          : data["@type"] === "JobPosting"
            ? data
            : null;

      if (jobPosting) {
        const title = jobPosting.title;

        const company =
          jobPosting.hiringOrganization?.name;

        const description =
          jobPosting.description;

        if (
          typeof title === "string" &&
          typeof company === "string" &&
          typeof description === "string"
        ) {
          return {
            title: title.trim(),
            company: company.trim(),
            description: description.trim(),
            url,
          };
        }
      }
    } catch {
      // Ignore invalid JSON-LD and continue
      // to other extraction strategies.
    }
  }

  // --------------------
  // Strategy 2: Open Graph
  // --------------------

  const ogTitle =
    $('meta[property="og:title"]')
      .attr("content")
      ?.trim();

  const ogDescription =
    $('meta[property="og:description"]')
      .attr("content")
      ?.trim();

  if (ogTitle && ogDescription) {
    const title = ogTitle
      .replace(/\s*\|\s*.*$/, "")
      .replace(/^.*Careers\s*-\s*/i, "")
      .trim();

    const company = ogTitle
      .replace(/\s*Careers\s*-\s*.*$/i, "")
      .trim();

    if (title && company) {
      return {
        title,
        company,
        description: ogDescription,
        url,
      };
    }
  }

  throw new Error(
    "Unable to extract job information from this URL."
  );
}

export async function importAndCreateJob(
  profileId: string,
  url: string
) {
  const importedJob = await importJobFromUrl(url);

  const job = await createJob(
    profileId,
    {
      title: importedJob.title,
      company: importedJob.company,
      description: importedJob.description,
      url: importedJob.url,
    }
  );

  return job;
}