import { useState } from "react";

interface JobImportFormProps {
  onImport: (url: string) => Promise<void>;
  importingJob: boolean;
}

function JobImportForm({
  onImport,
  importingJob,
}: JobImportFormProps) {
  const [importUrl, setImportUrl] = useState("");

  async function handleImport() {
    if (!importUrl.trim()) {
      return;
    }

    await onImport(importUrl.trim());

    setImportUrl("");
  }

  return (
    <section className="border border-line bg-whitewarm p-5 transition-colors duration-200 sm:p-6">
      <div className="border-b border-line pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Quick import
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          Import a job
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Paste a job posting URL and Junction will bring the
          opportunity into your workspace.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          value={importUrl}
          onChange={(event) =>
            setImportUrl(event.target.value)
          }
          placeholder="https://example.com/job-posting"
          disabled={importingJob}
          className="min-w-0 flex-1 border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={handleImport}
          disabled={importingJob || !importUrl.trim()}
          className="border border-copper bg-copper px-4 py-2.5 text-sm font-medium text-whitewarm transition-colors duration-150 hover:bg-copper-dark disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted"
        >
          {importingJob ? "Importing..." : "Import Job"}
        </button>
      </div>
    </section>
  );
}

export default JobImportForm;
