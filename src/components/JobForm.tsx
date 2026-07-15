import { useState } from "react";
import type { Job } from "../types/index";

interface JobFormProps {
  onAddJob: (job: Job) => void;
}

function JobForm({ onAddJob }: JobFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newJob: Job = {
      id: crypto.randomUUID(),
      title,
      company,
      description,
      requiredSkills: [],
    };

    onAddJob(newJob);

    setTitle("");
    setCompany("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="block font-semibold">
          Job Title
        </label>

        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">
          Company
        </label>

        <input
          value={company}
          onChange={(event) =>
            setCompany(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Job
      </button>
    </form>
  );
}

export default JobForm;