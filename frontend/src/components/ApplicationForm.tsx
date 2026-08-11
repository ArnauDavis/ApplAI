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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!jobId) return;

    const newApplication: JobApplication = {
      id: crypto.randomUUID(),
      jobId,
      status: "Saved",
    };

    onAddApplication(newApplication);

    setJobId("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="block font-semibold">
          Select Job
        </label>

        <select
          value={jobId}
          onChange={(event) =>
            setJobId(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
        >
          <option value="">
            Select a job
          </option>

          {jobs.map((job) => (
            <option
              key={job.id}
              value={job.id}
            >
              {job.title} - {job.company}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Application
      </button>
    </form>
  );
}

export default ApplicationForm;