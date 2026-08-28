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
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold">
        Import Job From URL
      </h3>

      <p className="mt-1 text-sm text-gray-600">
        Paste a job posting URL to automatically import the position.
      </p>

      <div className="mt-4 flex gap-3">
        <input
          type="url"
          value={importUrl}
          onChange={(event) =>
            setImportUrl(event.target.value)
          }
          placeholder="https://example.com/job-posting"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          disabled={importingJob}
        />

        <button
          type="button"
          onClick={handleImport}
          disabled={importingJob}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {importingJob
            ? "Importing..."
            : "Import Job"}
        </button>
      </div>
    </div>
  );
}

export default JobImportForm;
