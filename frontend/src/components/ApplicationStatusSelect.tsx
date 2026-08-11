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
    <select
      value={status}
      onChange={(event) =>
        onChange(event.target.value as ApplicationStatus)
      }
      className="border rounded p-2"
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default ApplicationStatusSelect;