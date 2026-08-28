interface JobActionsProps {
  jobId: string;
  analyzing: boolean;
  generatingCoverLetter: boolean;
  hasCoverLetter: boolean;
  onAnalyze: () => void;
  onGenerateCoverLetter: () => void;
  onDownloadPdf: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function JobActions({
  analyzing,
  generatingCoverLetter,
  hasCoverLetter,
  onAnalyze,
  onGenerateCoverLetter,
  onDownloadPdf,
  onEdit,
  onDelete,
}: JobActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onAnalyze}
        disabled={analyzing}
        className="text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50"
      >
        {analyzing
          ? "Analyzing..."
          : "Analyze"}
      </button>

      <button
        type="button"
        onClick={onGenerateCoverLetter}
        disabled={generatingCoverLetter}
        className="text-green-600 hover:text-green-800 font-medium disabled:opacity-50"
      >
        {generatingCoverLetter
          ? "Generating..."
          : "Cover Letter"}
      </button>

      {hasCoverLetter && (
        <button
          type="button"
          onClick={onDownloadPdf}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Download PDF
        </button>
      )}

      <button
        type="button"
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        Delete
      </button>
    </div>
  );
}

export default JobActions;
