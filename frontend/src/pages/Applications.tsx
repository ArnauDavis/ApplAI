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
    if (!application.jobId) {
      setError("A job must be selected.");
      return;
    }
  
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
            notes: application.notes ?? undefined,
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
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Career Workspace
          </p>

          <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Applications
          </h2>

          <p className="mt-3 text-sm text-muted">
            Loading your applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="border-b border-line pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Career Workspace
        </p>

        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
              Applications
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Track the opportunities you've moved into
              your application workflow.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="h-2 w-2 rounded-full bg-moss" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {applications.length}{" "}
              {applications.length === 1
                ? "application"
                : "applications"}
            </span>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-6 border border-signal/40 bg-signal/10 px-4 py-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal" />

            <div>
              <p className="font-medium text-ink">
                Something needs attention
              </p>

              <p className="mt-1 text-muted">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="mt-8">
        <div className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Add application
          </p>

          <h3 className="mt-1 font-display text-2xl text-ink">
            Move an opportunity into your workflow
          </h3>
        </div>

        <ApplicationForm
          jobs={jobs}
          onAddApplication={addApplication}
        />
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Application tracker
            </p>

            <h3 className="mt-1 font-display text-2xl text-ink">
              Your applications
            </h3>
          </div>

          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
            {applications.length} tracked
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="border border-line bg-whitewarm px-5 py-8 sm:px-6">
            <p className="font-display text-xl text-ink">
              No applications yet.
            </p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Applications you add to your workflow will
              appear here so you can keep track of their
              progress.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="border border-line bg-whitewarm p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Application
                    </p>

                    <h4 className="mt-2 font-display text-2xl text-ink">
                      {application.job.title}
                    </h4>

                    <p className="mt-1 text-sm text-muted">
                      {application.job.company}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Status
                    </p>

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
                </div>

                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-sm leading-6 text-muted">
                    {application.job.description}
                  </p>

                  {application.job.url && (
                    <a
                      href={application.job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-copper transition-colors hover:text-copper-dark"
                    >
                      View job posting →
                    </a>
                  )}
                </div>

                {application.notes && (
                  <div className="mt-5 border-t border-line pt-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Notes
                    </p>

                    <p className="mt-2 text-sm leading-6 text-ink">
                      {application.notes}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex justify-end border-t border-line pt-4">
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
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-copper-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === application.id
                      ? "Deleting..."
                      : "Delete application"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Applications;
