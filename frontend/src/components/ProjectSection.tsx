import type { Project } from "../types/index";

interface ProjectSectionProps {
  projects: Project[];
  onDelete: (projectId: string) => Promise<void>;
  onEdit: (project: Project) => void;
}

function ProjectSection({
  projects,
  onDelete,
  onEdit,
}: ProjectSectionProps) {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold">
        Projects
      </h3>

      {projects.length === 0 ? (
        <p className="mt-4 text-gray-600">
          No projects added yet.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-b pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">
                    {project.name}
                  </h4>

                  <p className="mt-2 text-gray-600">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(project.id)
                    }
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectSection;