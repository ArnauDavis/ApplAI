import { useEffect, useState } from "react";
import {
  getProfilesFromApi,
  getJobsFromApi,
  getApplicationsFromApi,
} from "../services/storageService";
import type {
  Job,
  JobApplication,
} from "../types/index";

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] =
    useState<JobApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profileId =
          profiles[0].id;

        const [
          profileJobs,
          profileApplications,
        ] = await Promise.all([
          getJobsFromApi(profileId),
          getApplicationsFromApi(profileId),
        ]);

        setJobs(profileJobs);

        setApplications(
          profileApplications.map(
            (application) => ({
              id: application.id,
              status:
                application.status as JobApplication["status"],
              notes:
                application.notes ?? "",
              job: application.job,
            })
          )
        );

        setError(null);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        setError(
          "Unable to load dashboard data from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const savedJobs = jobs.length;

  const applicationCount =
    applications.length;

  const interviews =
    applications.filter(
      (application) =>
        application.status === "Interview"
    ).length;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Workspace
          </p>

          <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Dashboard
          </h2>

          <p className="mt-3 text-sm text-muted">
            Loading your career workspace...
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
              Dashboard
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Your job search, organized. Keep track of
              opportunities, applications, and the work
              that moves you forward.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="h-2 w-2 rounded-full bg-moss" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Workspace active
            </span>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-6 border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-ink">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal" />

            <div>
              <p className="font-medium">
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
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Search activity
            </p>

            <h3 className="mt-1 font-display text-2xl text-ink">
              Where things stand
            </h3>
          </div>

          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
            Live data
          </span>
        </div>

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          <div className="bg-whitewarm p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Saved jobs
            </p>

            <p className="mt-4 font-display text-5xl leading-none text-ink">
              {savedJobs}
            </p>

            <p className="mt-4 text-xs leading-5 text-muted">
              Opportunities currently in your workspace.
            </p>
          </div>

          <div className="bg-whitewarm p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Applications
            </p>

            <p className="mt-4 font-display text-5xl leading-none text-ink">
              {applicationCount}
            </p>

            <p className="mt-4 text-xs leading-5 text-muted">
              Applications you've added to your search.
            </p>
          </div>

          <div className="bg-whitewarm p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Interviews
            </p>

            <p className="mt-4 font-display text-5xl leading-none text-copper">
              {interviews}
            </p>

            <p className="mt-4 text-xs leading-5 text-muted">
              Interviews currently recorded in your tracker.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="border border-line bg-whitewarm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Workflow
              </p>

              <h3 className="mt-1 font-display text-2xl text-ink">
                The work ahead
              </h3>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Your control
            </span>
          </div>

          <div className="mt-6 divide-y divide-line border-y border-line">
            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Discover
                </p>

                <p className="mt-1 text-xs text-muted">
                  Find and save opportunities worth exploring.
                </p>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                01
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Understand
                </p>

                <p className="mt-1 text-xs text-muted">
                  Analyze what a role actually asks for.
                </p>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                02
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Prepare
                </p>

                <p className="mt-1 text-xs text-muted">
                  Build application materials from your real experience.
                </p>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                03
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Track
                </p>

                <p className="mt-1 text-xs text-muted">
                  Keep your applications and conversations organized.
                </p>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                04
              </span>
            </div>
          </div>
        </div>

        <div className="bg-ink p-5 text-whitewarm sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-whitewarm/50">
            Junction principle
          </p>

          <h3 className="mt-4 font-display text-2xl leading-tight">
            AI assists.
            <br />
            You decide.
          </h3>

          <p className="mt-5 text-sm leading-6 text-whitewarm/70">
            Analysis, suggestions, and drafts are here to
            help you prepare. Important career decisions
            stay in your hands.
          </p>

          <div className="mt-8 border-t border-whitewarm/15 pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-whitewarm/40">
              Human control
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
