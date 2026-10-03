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
      <div className="border border-copper/40 bg-copper/5">
        <div className="flex flex-col gap-3 border-b border-copper/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-copper" />

              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-copper">
                Editing opportunity
              </p>
            </div>

            <h3 className="mt-2 font-display text-2xl text-ink">
              {editingJob.title}
            </h3>

            <p className="mt-1 text-sm text-muted">
              {editingJob.company}
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="self-start font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-copper-dark sm:self-auto"
          >
            Cancel editing
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <JobForm
            job={editingJob}
            onSave={(job) =>
              onSave(job)
            }
            onCancel={onCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <JobForm
      onSave={onSave}
    />
  );
}

export default JobFormSection;
