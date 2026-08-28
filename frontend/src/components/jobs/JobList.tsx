import type { Job } from "../../types/index";
import type { JobAnalysis } from "../../services/storageService";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
  analysisResults: Record<string, JobAnalysis>;
  hiddenAnalysis: Record<string, boolean>;
  analyzingJobId: string | null;
  generatingCoverLetterJobId: string | null;
  downloadingCoverLetterJobId: string | null;
  coverLetters: Record<string, string>;
  onAnalyze: (jobId: string) => void;
  onGenerateCoverLetter: (jobId: string) => void;
  onDownloadPdf: (jobId: string) => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
  onHideAnalysis: (jobId: string) => void;
  onShowAnalysis: (jobId: string) => void;
  onDownloadSavedCoverLetter: (jobId: string) => void;
}

function JobList({
  jobs,
  analysisResults,
  hiddenAnalysis,
  analyzingJobId,
  generatingCoverLetterJobId,
  downloadingCoverLetterJobId,
  coverLetters,
  onAnalyze,
  onGenerateCoverLetter,
  onDownloadPdf,
  onEdit,
  onDelete,
  onHideAnalysis,
  onShowAnalysis,
  onDownloadSavedCoverLetter,
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">
          No jobs added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          analysis={analysisResults[job.id]}
          analysisHidden={hiddenAnalysis[job.id] ?? false}
          analyzing={analyzingJobId === job.id}
          generatingCoverLetter={
            generatingCoverLetterJobId === job.id
          }
          downloadingCoverLetter={
            downloadingCoverLetterJobId === job.id
          }
          hasGeneratedCoverLetter={
            Boolean(coverLetters[job.id])
          }
          onAnalyze={() => onAnalyze(job.id)}
          onGenerateCoverLetter={() =>
            onGenerateCoverLetter(job.id)
          }
          onDownloadPdf={() =>
            onDownloadPdf(job.id)
          }
          onEdit={() => onEdit(job)}
          onDelete={() => onDelete(job.id)}
          onHideAnalysis={() =>
            onHideAnalysis(job.id)
          }
          onShowAnalysis={() =>
            onShowAnalysis(job.id)
          }
          onDownloadSavedCoverLetter={() =>
            onDownloadSavedCoverLetter(job.id)
          }
        />
      ))}
    </div>
  );
}

export default JobList;
