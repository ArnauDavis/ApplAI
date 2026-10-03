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
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-copper transition-colors hover:text-copper-dark focus:outline-none focus:ring-2 focus:ring-copper/30"
      >
        Show analysis →
      </button>
    );
  }

  return (
    <div className="mt-6 border border-line bg-parchment">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Evidence review
          </p>

          <h4 className="mt-1 font-display text-2xl text-ink">
            Job analysis
          </h4>
        </div>

        <button
          type="button"
          onClick={onHide}
          className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-copper-dark focus:outline-none focus:ring-2 focus:ring-copper/30"
        >
          Hide
        </button>
      </div>

      <div className="divide-y divide-line">
        <section className="px-5 py-5 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            Requirements
          </p>

          <h5 className="mt-1 font-medium text-ink">
            What the role asks for
          </h5>

          {analysis.jobRequirements.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {analysis.jobRequirements.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-muted"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">
              No specific requirements identified.
            </p>
          )}
        </section>

        <section className="px-5 py-5 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-moss">
            Match
          </p>

          <h5 className="mt-1 font-medium text-ink">
            Matching qualifications
          </h5>

          {analysis.matchingQualifications.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {analysis.matchingQualifications.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-moss"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">
              No matching qualifications identified.
            </p>
          )}
        </section>

        <section className="px-5 py-5 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
            Gap
          </p>

          <h5 className="mt-1 font-medium text-ink">
            Missing requirements
          </h5>

          {analysis.missingRequirements.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {analysis.missingRequirements.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-signal"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">
              No missing requirements identified.
            </p>
          )}
        </section>

        <section className="px-5 py-5 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-moss">
            Evidence
          </p>

          <h5 className="mt-1 font-medium text-ink">
            Relevant experience
          </h5>

          {analysis.relevantExperience.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {analysis.relevantExperience.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-moss"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">
              No relevant experience identified.
            </p>
          )}
        </section>

        <section className="px-5 py-5 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
            Concern
          </p>

          <h5 className="mt-1 font-medium text-ink">
            Potential concerns
          </h5>

          {analysis.potentialConcerns.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {analysis.potentialConcerns.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-signal"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">
              No potential concerns identified.
            </p>
          )}
        </section>

        <section className="bg-whitewarm px-5 py-5 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-copper">
            Suggestion
          </p>

          <h5 className="mt-1 font-medium text-ink">
            Consider next
          </h5>

          {analysis.suggestions.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {analysis.suggestions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-copper"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">
              No suggestions available.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default JobAnalysisDisplay;
