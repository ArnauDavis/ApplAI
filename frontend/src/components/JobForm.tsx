import { useEffect, useState } from "react";
import type { Job } from "../types/index";

interface JobFormProps {
  job?: Job;
  onSave: (job: {
    title: string;
    company: string;
    description: string;
    url?: string;
  }) => Promise<void>;
  onCancel?: () => void;
}

function JobForm({
  job,
  onSave,
  onCancel,
}: JobFormProps) {
  const [title, setTitle] = useState(
    job?.title ?? ""
  );

  const [company, setCompany] = useState(
    job?.company ?? ""
  );

  const [description, setDescription] =
    useState(job?.description ?? "");

  const [url, setUrl] = useState(
    job?.url ?? ""
  );

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    setTitle(job?.title ?? "");
    setCompany(job?.company ?? "");
    setDescription(job?.description ?? "");
    setUrl(job?.url ?? "");
    setSaved(false);
  }, [job]);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!title.trim() || !company.trim()) {
      return;
    }

    setSaving(true);
    setSaved(false);

    try {
      await onSave({
        title: title.trim(),
        company: company.trim(),
        description: description.trim(),
        ...(url.trim()
          ? { url: url.trim() }
          : {}),
      });

      if (!job) {
        setTitle("");
        setCompany("");
        setDescription("");
        setUrl("");
        setSaved(true);
      }
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
          {job ? "Edit opportunity" : "New opportunity"}
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          {job ? "Edit Job" : "Add a job"}
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {job
            ? "Update the details for this opportunity."
            : "Add an opportunity manually to your career workspace."}
        </p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="job-title"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Job title
          </label>

          <input
            id="job-title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            placeholder="Software Engineer"
            required
          />
        </div>

        <div>
          <label
            htmlFor="job-company"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Company
          </label>

          <input
            id="job-company"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            placeholder="Example Company"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="job-description"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Description
          </label>

          <textarea
            id="job-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={6}
            className="mt-2 w-full resize-y border border-line bg-paper px-3 py-3 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            placeholder="Describe the position..."
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="job-url"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Job URL
          </label>

          <input
            id="job-url"
            type="url"
            value={url}
            onChange={(event) =>
              setUrl(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
            placeholder="https://example.com/job"
          />
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
            : job
              ? "Save Changes"
              : "Add Job"}
        </button>

        {job && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-line bg-parchment px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-150 hover:border-muted hover:bg-paper"
          >
            Cancel
          </button>
        )}

        {saved && (
          <p className="flex items-center gap-2 text-sm text-moss">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Job added successfully.
          </p>
        )}
      </div>
    </form>
  );
}

export default JobForm;
