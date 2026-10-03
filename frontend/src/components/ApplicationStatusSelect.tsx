import type { ApplicationStatus } from "../types/index";

interface ApplicationStatusSelectProps {
  status: ApplicationStatus;
  onChange: (status: ApplicationStatus) => void;
}

const statuses: ApplicationStatus[] = [
  "Saved",
  "Reviewing",
  "Preparing",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

function ApplicationStatusSelect({
  status,
  onChange,
}: ApplicationStatusSelectProps) {
  return (
    <div className="relative">
      <select
        value={status}
        onChange={(event) =>
          onChange(event.target.value as ApplicationStatus)
        }
        aria-label="Application status"
        className="min-w-32 appearance-none border border-line bg-parchment px-3 py-2 pr-8 font-mono text-[10px] uppercase tracking-[0.12em] text-ink outline-none transition-colors hover:border-muted focus:border-copper focus:ring-2 focus:ring-copper/20 dark:bg-whitewarm"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted"
      >
        ↓
      </span>
    </div>
  );
}

export default ApplicationStatusSelect;
