import { useState } from "react";
import type { Job, JobApplication } from "../types/index";

interface ApplicationFormProps {
  jobs: Job[];
  onAddApplication: (application: JobApplication) => void;
}

function ApplicationForm({
  jobs,
  onAddApplication,
}: ApplicationFormProps) {
  const [jobId, setJobId] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!jobId) return;

    setSaving(true);

    try {
      const newApplication: JobApplication = {
        id: crypto.randomUUID(),
        jobId,
        status: "Saved",
      };

      await onAddApplication(newApplication);

      setJobId("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-whitewarm p-5 sm:p-6"
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label
            htmlFor="application-job"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Job opportunity
          </label>

          <select
            id="application-job"
            value={jobId}
            onChange={(event) =>
              setJobId(event.target.value)
            }
            disabled={saving}
            className="mt-2 w-full appearance-none border border-line bg-parchment px-3 py-2.5 pr-8 text-sm text-ink outline-none transition-colors hover:border-muted focus:border-copper focus:ring-2 focus:ring-copper/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              Select a job
            </option>

            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
              >
                {job.title} — {job.company}
              </option>
            ))}
          </select>

          {jobs.length === 0 && (
            <p className="mt-2 text-xs leading-5 text-muted">
              Add a job to your workspace before creating
              an application.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={saving || !jobId}
          className="border border-copper bg-copper px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-whitewarm transition-colors hover:border-copper-dark hover:bg-copper-dark focus:outline-none focus:ring-2 focus:ring-copper/30 disabled:cursor-not-allowed disabled:border-line disabled:bg-parchment disabled:text-muted"
        >
          {saving ? "Saving..." : "Add application"}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;
