import JobForm from "../JobForm";
import type { Job } from "../../types/index";

interface JobFormSectionProps {
  editingJob: Job | null;
  onSave: (
    job: {
      title: string;
      company: string;
      description: string;
      url?: string;
    }
  ) => Promise<void>;
  onCancel: () => void;
}

function JobFormSection({
  editingJob,
  onSave,
  onCancel,
}: JobFormSectionProps) {
  if (editingJob) {
    return (
      <JobForm
        job={editingJob}
        onSave={(job) =>
          onSave(job)
        }
        onCancel={onCancel}
      />
    );
  }

  return (
    <JobForm
      onSave={onSave}
    />
  );
}

export default JobFormSection;
