import type { Experience } from "../types/index";

interface ExperienceSectionProps {
  experiences: Experience[];
  onDelete: (experienceId: string) => Promise<void>;
}

function ExperienceSection({
  experiences,
  onDelete,
}: ExperienceSectionProps) {
  async function handleDelete(experienceId: string) {
    try {
      await onDelete(experienceId);
    } catch (error) {
      console.error(
        "Failed to delete experience:",
        error
      );
    }
  }

  return (
    <section className="border border-line bg-whitewarm p-5 sm:p-6">
      <div className="border-b border-line pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Career history
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          Experience
        </h3>
      </div>

      {experiences.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No experience added yet.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-line">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="py-6 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h4 className="font-display text-xl text-ink">
                    {experience.title}
                  </h4>

                  <p className="mt-1 text-sm font-medium text-muted">
                    {experience.company}
                  </p>

                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {new Date(
                      experience.startDate
                    ).toLocaleDateString("en-US")}{" "}
                    –{" "}
                    {experience.endDate
                      ? new Date(
                          experience.endDate
                        ).toLocaleDateString("en-US")
                      : "Present"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(experience.id)
                  }
                  className="self-start border border-line px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-copper hover:text-copper"
                >
                  Delete
                </button>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExperienceSection;
