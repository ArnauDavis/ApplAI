import { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import {
  getProfilesFromApi,
  getJobsFromApi,
  createJobToApi,
} from "../services/storageService";
import type { Job } from "../types/index";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const profiles = await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profile = profiles[0];

        setProfileId(profile.id);

        const profileJobs = await getJobsFromApi(
          profile.id
        );

        setJobs(profileJobs);
        setError(null);
      } catch (error) {
        console.error(
          "Failed to load jobs:",
          error
        );

        setError(
          "Unable to load jobs from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  async function addJob(job: Job) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      const createdJob = await createJobToApi(
        profileId,
        {
          title: job.title,
          company: job.company,
          description: job.description,
          url: job.url,
        }
      );

      setJobs((currentJobs) => [
        ...currentJobs,
        createdJob,
      ]);

      setError(null);
    } catch (error) {
      console.error(
        "Failed to create job:",
        error
      );

      setError(
        "Unable to save job to the backend."
      );
    }
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Jobs
        </h2>

        <p className="mt-6 text-gray-600">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Jobs
      </h2>

      <p className="mt-2 text-gray-600">
        Manage and analyze job opportunities.
      </p>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <JobForm onAddJob={addJob} />
      </div>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">
              {job.title}
            </h3>

            <p className="text-gray-600">
              {job.company}
            </p>

            <p className="mt-3">
              {job.description}
            </p>

            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                View Job
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;

