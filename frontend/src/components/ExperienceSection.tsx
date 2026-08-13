import type { Experience } from "../types/index";

interface ExperienceSectionProps {
  experiences: Experience[];
  onDelete: (experienceId: string) => Promise<void>;
}

function ExperienceSection({
  experiences,
  onDelete,
}: ExperienceSectionProps) {
  async function handleDelete(
    experienceId: string
  ) {
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
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold">
        Experience
      </h3>

      {experiences.length === 0 ? (
        <p className="mt-4 text-gray-600">
          No experience added yet.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="border-b pb-6 last:border-b-0 last:pb-0"
            >
              <h4 className="text-lg font-semibold">
                {experience.title}
              </h4>

              <p className="text-gray-700">
                {experience.company}
              </p>

              <p className="text-sm text-gray-500 mt-1">
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

              <p className="mt-2 text-gray-600">
                {experience.description}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleDelete(experience.id)
                }
                className="mt-4 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExperienceSection;