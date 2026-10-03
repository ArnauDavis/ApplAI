import { useState } from "react";
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

  const [descriptionExpanded, setDescriptionExpanded] =
    useState(false);

  return (
    <article
      id={`job-${job.id}`}
      className="border border-line bg-whitewarm transition-colors duration-200"
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper" />

              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {job.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-muted">
                  {job.company}
                </p>
              </div>
            </div>

            {job.description && (
              <div className="mt-5 max-w-3xl">
                <p
                  className={`text-sm leading-6 text-muted ${
                    descriptionExpanded
                      ? ""
                      : "line-clamp-2"
                  }`}
                >
                  {job.description}
                </p>
                
                {job.description.length > 200 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDescriptionExpanded(
                        (expanded) => !expanded
                      )
                    }
                    className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-copper transition-colors hover:text-copper-dark"
                  >
                    {descriptionExpanded
                      ? "Show less"
                      : "Show more"}
                  </button>
                )}
              </div>
            )}


            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center border-b border-copper pb-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-copper transition-colors hover:border-copper-dark hover:text-copper-dark"
              >
                View job posting
              </a>
            )}

            {hasGeneratedCoverLetter && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  Application material
                </p>

                <button
                  type="button"
                  onClick={onDownloadSavedCoverLetter}
                  disabled={downloadingCoverLetter}
                  className="mt-2 border border-line bg-parchment px-3 py-2 text-xs font-medium text-ink transition-colors duration-150 hover:border-copper hover:text-copper disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {downloadingCoverLetter
                    ? "Downloading..."
                    : "Download Cover Letter PDF"}
                </button>
              </div>
            )}

            {analysis && (
              <div className="mt-6 border-t border-line pt-6">
                <JobAnalysisDisplay
                  analysis={analysis}
                  hidden={analysisHidden}
                  onHide={onHideAnalysis}
                  onShow={onShowAnalysis}
                />
              </div>
            )}
          </div>

          <div className="shrink-0 lg:w-48">
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
      </div>
    </article>
  );
}

export default JobCard;
