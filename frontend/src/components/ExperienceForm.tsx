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
      className="border border-line bg-whitewarm p-5 transition-colors duration-200 sm:p-6"
    >
      <div className="border-b border-line pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Career history
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          Add experience
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Add work experience that represents your actual
          background and can be used when preparing
          applications.
        </p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="experience-company"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Company
          </label>

          <input
            id="experience-company"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            required
          />
        </div>

        <div>
          <label
            htmlFor="experience-title"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Job title
          </label>

          <input
            id="experience-title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="experience-description"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Description
          </label>

          <textarea
            id="experience-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={5}
            className="mt-2 w-full resize-y border border-line bg-paper px-3 py-3 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            required
          />
        </div>

        <div>
          <label
            htmlFor="experience-start-date"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Start date
          </label>

          <input
            id="experience-start-date"
            type="date"
            value={startDate}
            onChange={(event) =>
              setStartDate(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-copper focus:ring-1 focus:ring-copper/30"
            required
          />
        </div>

        <div>
          <label
            htmlFor="experience-end-date"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            End date
          </label>

          {!currentJob && (
            <input
              id="experience-end-date"
              type="date"
              value={endDate}
              onChange={(event) =>
                setEndDate(event.target.value)
              }
              className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-copper focus:ring-1 focus:ring-copper/30"
            />
          )}

          <label className="mt-3 flex items-center gap-3 text-sm text-muted">
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
              className="h-4 w-4 accent-copper"
            />

            <span>
              I currently work here
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saving}
          className="border border-copper bg-copper px-4 py-2.5 text-sm font-medium text-whitewarm transition-colors duration-150 hover:bg-copper-dark disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted"
        >
          {saving
            ? "Saving..."
            : "Add Experience"}
        </button>

        {saved && (
          <p className="flex items-center gap-2 text-sm text-moss">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Experience added successfully.
          </p>
        )}
      </div>
    </form>
  );
}

export default ExperienceForm;
