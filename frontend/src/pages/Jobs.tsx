import { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import {
  getProfilesFromApi,
  getJobsFromApi,
  createJobToApi,
  updateJobToApi,
  deleteJobFromApi,
} from "../services/storageService";
import type { Job } from "../types/index";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [profileId, setProfileId] =
    useState<string | null>(null);

  const [editingJob, setEditingJob] =
    useState<Job | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profile = profiles[0];

        setProfileId(profile.id);

        const profileJobs =
          await getJobsFromApi(profile.id);

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

  async function addJob(job: {
    title: string;
    company: string;
    description: string;
    url?: string;
  }) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      const createdJob =
        await createJobToApi(
          profileId,
          job
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

      throw error;
    }
  }

  async function updateJob(
    jobId: string,
    job: {
      title: string;
      company: string;
      description: string;
      url?: string;
    }
  ) {
    try {
      const updatedJob =
        await updateJobToApi(
          jobId,
          job
        );

      setJobs((currentJobs) =>
        currentJobs.map((existingJob) =>
          existingJob.id === jobId
            ? updatedJob
            : existingJob
        )
      );

      setEditingJob(null);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to update job:",
        error
      );

      setError(
        "Unable to update job."
      );

      throw error;
    }
  }

  async function deleteJob(
    jobId: string
  ) {
    try {
      await deleteJobFromApi(jobId);

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job.id !== jobId
        )
      );

      if (editingJob?.id === jobId) {
        setEditingJob(null);
      }

      setError(null);
    } catch (error) {
      console.error(
        "Failed to delete job:",
        error
      );

      setError(
        "Unable to delete job."
      );

      throw error;
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
        {editingJob ? (
          <JobForm
            job={editingJob}
            onSave={(job) =>
              updateJob(
                editingJob.id,
                job
              )
            }
            onCancel={() =>
              setEditingJob(null)
            }
          />
        ) : (
          <JobForm
            onSave={addJob}
          />
        )}
      </div>

      <div className="mt-6 space-y-4">
        {jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">
              No jobs added yet.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
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

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingJob(job)
                    }
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteJob(job.id)
                    }
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;