import { useState } from "react";

interface ExperienceFormProps {
  onSave: (experience: {
    company: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
  }) => Promise<void>;
}

function ExperienceForm({
  onSave,
}: ExperienceFormProps) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentJob, setCurrentJob] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSaving(true);
    setSaved(false);

    try {
      await onSave({
        company,
        title,
        description,
        startDate,
        ...(!currentJob &&
          endDate && { endDate }),
      });

      setCompany("");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setCurrentJob(false);

      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h3 className="text-xl font-semibold">
        Add Experience
      </h3>

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
          required
        />
      </div>

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
          required
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
          required
        />
      </div>

      <div>
        <label className="block font-semibold">
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
          onChange={(event) =>
            setStartDate(event.target.value)
          }
          className="mt-2 border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">
          End Date
        </label>

        {!currentJob && (
          <input
            type="date"
            value={endDate}
            onChange={(event) =>
              setEndDate(event.target.value)
            }
            className="mt-2 border rounded p-2"
          />
        )}

        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={currentJob}
            onChange={(event) => {
              setCurrentJob(
                event.target.checked
              );

              if (event.target.checked) {
                setEndDate("");
              }
            }}
          />

          <span>
            I currently work here
          </span>
        </div>

      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {saving
          ? "Saving..."
          : "Add Experience"}
      </button>

      {saved && (
        <p className="text-green-600 font-medium">
          Experience added successfully.
        </p>
      )}
    </form>
  );
}

export default ExperienceForm;