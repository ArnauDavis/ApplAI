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

  const [editingJobId, setEditingJobId] =
    useState<string | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editCompany, setEditCompany] =
    useState("");
  const [editDescription, setEditDescription] =
    useState("");
  const [editUrl, setEditUrl] = useState("");

  const [savingJobId, setSavingJobId] =
    useState<string | null>(null);

  const [deletingJobId, setDeletingJobId] =
    useState<string | null>(null);

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

  async function addJob(job: Job) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      const createdJob =
        await createJobToApi(
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

  function startEditing(job: Job) {
    setEditingJobId(job.id);
    setEditTitle(job.title);
    setEditCompany(job.company);
    setEditDescription(job.description);
    setEditUrl(job.url ?? "");
    setError(null);
  }

  function cancelEditing() {
    setEditingJobId(null);
    setEditTitle("");
    setEditCompany("");
    setEditDescription("");
    setEditUrl("");
  }

  async function saveJob(jobId: string) {
    setSavingJobId(jobId);
    setError(null);

    try {
      const updatedJob =
        await updateJobToApi(
          jobId,
          {
            title: editTitle,
            company: editCompany,
            description: editDescription,
            url: editUrl || undefined,
          }
        );

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === jobId
            ? updatedJob
            : job
        )
      );

      cancelEditing();
    } catch (error) {
      console.error(
        "Failed to update job:",
        error
      );

      setError(
        "Unable to update job."
      );
    } finally {
      setSavingJobId(null);
    }
  }

  async function deleteJob(jobId: string) {
    setDeletingJobId(jobId);
    setError(null);

    try {
      await deleteJobFromApi(jobId);

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job.id !== jobId
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete job:",
        error
      );

      setError(
        "Unable to delete job."
      );
    } finally {
      setDeletingJobId(null);
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
        {jobs.map((job) => {
          const isEditing =
            editingJobId === job.id;

          const isSaving =
            savingJobId === job.id;

          const isDeleting =
            deletingJobId === job.id;

          return (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold">
                      Job Title
                    </label>

                    <input
                      value={editTitle}
                      onChange={(event) =>
                        setEditTitle(
                          event.target.value
                        )
                      }
                      className="mt-2 border rounded p-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold">
                      Company
                    </label>

                    <input
                      value={editCompany}
                      onChange={(event) =>
                        setEditCompany(
                          event.target.value
                        )
                      }
                      className="mt-2 border rounded p-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold">
                      Description
                    </label>

                    <textarea
                      value={editDescription}
                      onChange={(event) =>
                        setEditDescription(
                          event.target.value
                        )
                      }
                      className="mt-2 border rounded p-2 w-full"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold">
                      Job URL
                    </label>

                    <input
                      value={editUrl}
                      onChange={(event) =>
                        setEditUrl(
                          event.target.value
                        )
                      }
                      className="mt-2 border rounded p-2 w-full"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        saveJob(job.id)
                      }
                      disabled={isSaving}
                      className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                      {isSaving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={isSaving}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded disabled:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
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

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(job)
                      }
                      disabled={isDeleting}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded disabled:bg-gray-100"
                    >
                      Edit Job
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteJob(job.id)
                      }
                      disabled={isDeleting}
                      className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                      {isDeleting
                        ? "Deleting..."
                        : "Delete Job"}
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;