import type { Job } from "../../types/index";
import type { JobAnalysis } from "../../services/storageService";
import JobAnalysisDisplay from "./JobAnalysisDisplay";
import JobActions from "./JobActions";

interface JobCardProps {
  job: Job;
  analysis: JobAnalysis | undefined;
  analysisHidden: boolean;
  analyzing: boolean;
  generatingCoverLetter: boolean;
  downloadingCoverLetter: boolean;
  hasGeneratedCoverLetter: boolean;
  onAnalyze: () => void;
  onGenerateCoverLetter: () => void;
  onDownloadPdf: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onHideAnalysis: () => void;
  onShowAnalysis: () => void;
  onDownloadSavedCoverLetter: () => void;
}

function JobCard({
  job,
  analysis,
  analysisHidden,
  analyzing,
  generatingCoverLetter,
  downloadingCoverLetter,
  hasGeneratedCoverLetter,
  onAnalyze,
  onGenerateCoverLetter,
  onDownloadPdf,
  onEdit,
  onDelete,
  onHideAnalysis,
  onShowAnalysis,
  onDownloadSavedCoverLetter,
}: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {job.title}
          </h3>

          <p className="text-gray-600">
            {job.company}
          </p>

          <p className="mt-3">
            {job.description}
          </p>

          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              View Job
            </a>
          )}

          {job.coverLetter && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onDownloadSavedCoverLetter}
                disabled={downloadingCoverLetter}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {downloadingCoverLetter
                  ? "Downloading..."
                  : "Download Cover Letter PDF"}
              </button>
            </div>
          )}

          {analysis && (
            <JobAnalysisDisplay
              analysis={analysis}
              hidden={analysisHidden}
              onHide={onHideAnalysis}
              onShow={onShowAnalysis}
            />
          )}
        </div>

        <JobActions
          analyzing={analyzing}
          generatingCoverLetter={generatingCoverLetter}
          hasCoverLetter={hasGeneratedCoverLetter}
          onAnalyze={onAnalyze}
          onGenerateCoverLetter={onGenerateCoverLetter}
          onDownloadPdf={onDownloadPdf}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default JobCard;
