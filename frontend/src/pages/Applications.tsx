import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationStatusSelect from "../components/ApplicationStatusSelect";
import {
  getProfilesFromApi,
  getJobsFromApi,
  getApplicationsFromApi,
  createApplicationToApi,
  updateApplicationToApi,
  deleteApplicationFromApi,
} from "../services/storageService";
import type {
  Job,
  JobApplication,
} from "../types/index";

interface Application {
  id: string;
  status: string;
  notes: string | null;
  job: Job;
}

function Applications() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [jobs, setJobs] =
    useState<Job[]>([]);

  const [profileId, setProfileId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profile = profiles[0];

        setProfileId(profile.id);

        const [
          profileJobs,
          profileApplications,
        ] = await Promise.all([
          getJobsFromApi(profile.id),
          getApplicationsFromApi(profile.id),
        ]);

        setJobs(profileJobs);
        setApplications(profileApplications);
        setError(null);
      } catch (error) {
        console.error(
          "Failed to load applications:",
          error
        );

        setError(
          "Unable to load applications from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  async function addApplication(
    application: JobApplication
  ) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      const createdApplication =
        await createApplicationToApi(
          profileId,
          {
            jobId: application.jobId,
            status: application.status,
            notes: application.notes,
          }
        );

      const job = jobs.find(
        (job) =>
          job.id === createdApplication.jobId
      );

      if (!job) {
        throw new Error(
          "Job not found for application"
        );
      }

      setApplications(
        (currentApplications) => [
          ...currentApplications,
          {
            ...createdApplication,
            notes:
              createdApplication.notes ?? null,
            job,
          },
        ]
      );

      setError(null);
    } catch (error) {
      console.error(
        "Failed to create application:",
        error
      );

      setError(
        "Unable to save application to the backend."
      );
    }
  }

  async function updateStatus(
    id: string,
    status: JobApplication["status"]
  ) {
    try {
      const updatedApplication =
        await updateApplicationToApi(
          id,
          { status }
        );

      setApplications(
        (currentApplications) =>
          currentApplications.map(
            (application) =>
              application.id === id
                ? {
                    ...application,
                    status:
                      updatedApplication.status,
                    notes:
                      updatedApplication.notes ??
                      null,
                  }
                : application
          )
      );

      setError(null);
    } catch (error) {
      console.error(
        "Failed to update application:",
        error
      );

      setError(
        "Unable to update application."
      );
    }
  }

  async function deleteApplication(
    id: string
  ) {
    setDeletingId(id);
    setError(null);

    try {
      await deleteApplicationFromApi(id);

      setApplications(
        (currentApplications) =>
          currentApplications.filter(
            (application) =>
              application.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Failed to delete application:",
        error
      );

      setError(
        "Unable to delete application."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Applications
        </h2>

        <p className="mt-6 text-gray-600">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Applications
      </h2>

      <p className="mt-2 text-gray-600">
        Track your job application progress.
      </p>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <ApplicationForm
          jobs={jobs}
          onAddApplication={addApplication}
        />
      </div>

      <div className="mt-6 space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">
              {application.job.title}
            </h3>

            <p className="text-gray-600">
              {application.job.company}
            </p>

            <p className="mt-3">
              {application.job.description}
            </p>

            {application.job.url && (
              <a
                href={application.job.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                View Job
              </a>
            )}

            <div className="mt-4">
              <ApplicationStatusSelect
                status={
                  application.status as JobApplication["status"]
                }
                onChange={(status) =>
                  updateStatus(
                    application.id,
                    status
                  )
                }
              />
            </div>

            {application.notes && (
              <p className="mt-4 text-gray-600">
                {application.notes}
              </p>
            )}

            <button
              type="button"
              onClick={() =>
                deleteApplication(
                  application.id
                )
              }
              disabled={
                deletingId === application.id
              }
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {deletingId === application.id
                ? "Deleting..."
                : "Delete Application"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;