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
  console.log("Job import URL:", url);
  console.log("HTML length:", html.length);

  const $ = cheerio.load(html);

  // --------------------
  // Strategy 1: JSON-LD
  // --------------------

  const jsonLdScripts =
    $('script[type="application/ld+json"]');

  console.log(
    "JSON-LD scripts found:",
    jsonLdScripts.length
  );

  for (const element of jsonLdScripts.toArray()) {
    const jsonText = $(element).text();

    try {
      const data = JSON.parse(jsonText);

      const jobPosting =
        Array.isArray(data)
          ? data.find(
              (item) =>
                item &&
                item["@type"] === "JobPosting"
            )
          : data &&
              data["@type"] === "JobPosting"
            ? data
            : null;

      if (jobPosting) {
        console.log("JSON-LD JobPosting found.");

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
          console.log(
            "JSON-LD extraction successful."
          );

          return {
            title: title.trim(),
            company: company.trim(),
            description: description.trim(),
            url,
          };
        }

        console.log(
          "JSON-LD JobPosting found, but required fields are missing."
        );
      }
    } catch {
      console.log(
        "Found JSON-LD script, but it could not be parsed."
      );
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

  console.log("Open Graph title:", ogTitle);
  console.log(
    "Open Graph description found:",
    Boolean(ogDescription)
  );

  if (ogTitle && ogDescription) {
    const title = ogTitle
      .replace(/\s*\|\s*.*$/, "")
      .replace(/^.*Careers\s*-\s*/i, "")
      .trim();

    const company = ogTitle
      .replace(/\s*Careers\s*-\s*.*$/i, "")
      .trim();

    if (title && company) {
      console.log(
        "Open Graph extraction successful."
      );

      return {
        title,
        company,
        description: ogDescription,
        url,
      };
    }
  }

  console.log(
    "All current extraction strategies failed."
  );

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
