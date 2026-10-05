interface JobActionsProps {
  analyzing: boolean;
  hasAnalysis: boolean;
  generatingCoverLetter: boolean;
  hasCoverLetter: boolean;
  onAnalyze: () => void;
  onShowAnalysis: () => void;
  onGenerateCoverLetter: () => void;
  onDownloadPdf: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function JobActions({
  analyzing,
  hasAnalysis,
  generatingCoverLetter,
  hasCoverLetter,
  onAnalyze,
  onShowAnalysis,
  onGenerateCoverLetter,
  onDownloadPdf,
  onEdit,
  onDelete,
}: JobActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      {hasAnalysis ? (
        <button
          type="button"
          onClick={onShowAnalysis}
          className="w-full border border-moss bg-moss/10 px-3 py-2 text-left text-xs font-medium text-ink transition-colors duration-150 hover:border-moss hover:bg-moss/20"
        >
          ✓ Analysis available · View analysis
        </button>
      ) : (
        <button
          type="button"
          onClick={onAnalyze}
          disabled={analyzing}
          className="w-full border border-copper bg-copper px-3 py-2 text-left text-xs font-medium text-whitewarm transition-colors duration-150 hover:bg-copper-dark disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted"
        >
          {analyzing ? "Analyzing..." : "Analyze Job"}
        </button>
      )}

      <button
        type="button"
        onClick={onGenerateCoverLetter}
        disabled={generatingCoverLetter}
        className="w-full border border-line bg-parchment px-3 py-2 text-left text-xs font-medium text-ink transition-colors duration-150 hover:border-copper hover:text-copper disabled:cursor-not-allowed disabled:opacity-50"
      >
        {generatingCoverLetter
          ? "Generating..."
          : "Generate Cover Letter"}
      </button>

      {hasCoverLetter && (
        <button
          type="button"
          onClick={onDownloadPdf}
          className="w-full border border-line bg-parchment px-3 py-2 text-left text-xs font-medium text-ink transition-colors duration-150 hover:border-copper hover:text-copper"
        >
          Download PDF
        </button>
      )}

      <div className="mt-2 border-t border-line pt-2">
        <button
          type="button"
          onClick={onEdit}
          className="w-full px-3 py-2 text-left text-xs font-medium text-muted transition-colors duration-150 hover:bg-parchment hover:text-ink"
        >
          Edit Job
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="w-full px-3 py-2 text-left text-xs font-medium text-signal transition-colors duration-150 hover:bg-signal/10"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
}

export default JobActions;
