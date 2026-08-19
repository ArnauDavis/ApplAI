import { importJobFromUrl } from "./services/jobImportService.ts";

const url = process.argv[2];

if (!url) {
  console.error("Please provide a job posting URL.");
  process.exit(1);
}

try {
  const job = await importJobFromUrl(url);

  console.log("Job imported successfully:\n");

  console.log("Title:", job.title);
  console.log("Company:", job.company);
  console.log("URL:", job.url);

  console.log("\nDescription:\n");
  console.log(job.description);
} catch (error) {
  console.error("Failed to import job:");

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exit(1);
}