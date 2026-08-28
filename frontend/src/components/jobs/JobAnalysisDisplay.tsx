import type { JobAnalysis } from "../../services/storageService";

interface JobAnalysisDisplayProps {
  analysis: JobAnalysis;
  hidden: boolean;
  onHide: () => void;
  onShow: () => void;
}

function JobAnalysisDisplay({
  analysis,
  hidden,
  onHide,
  onShow,
}: JobAnalysisDisplayProps) {
  if (hidden) {
    return (
      <button
        type="button"
        onClick={onShow}
        className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
      >
        Show Analysis
      </button>
    );
  }

  return (
    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 className="font-semibold text-purple-900">
        AI Job Analysis
      </h4>

      <button
        type="button"
        onClick={onHide}
        className="mt-2 text-sm text-purple-600 hover:text-purple-800"
      >
        Hide Analysis
      </button>

      <div className="mt-3 space-y-4 text-sm text-gray-700">
        <div>
          <h5 className="font-semibold text-gray-900">
            Job Requirements
          </h5>

          {analysis.jobRequirements.length > 0 ? (
            <ul className="mt-1 list-disc list-inside">
              {analysis.jobRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-gray-500">
              No specific requirements identified.
            </p>
          )}
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Matching Qualifications
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysis.matchingQualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Missing Requirements
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysis.missingRequirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Relevant Experience
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysis.relevantExperience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Potential Concerns
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysis.potentialConcerns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Suggestions
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysis.suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobAnalysisDisplay;
