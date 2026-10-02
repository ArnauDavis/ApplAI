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
    <section className="border border-line bg-whitewarm p-5 sm:p-6">
      <div className="border-b border-line pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Portfolio
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          Projects
        </h3>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No projects added yet.
        </p>
      ) : (
        <div className="mt-6 divide-y divide-line">
          {projects.map((project) => (
            <div
              key={project.id}
              className="py-6 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h4 className="font-display text-xl text-ink">
                    {project.name}
                  </h4>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="border border-line bg-parchment px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 gap-4">
                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="text-xs font-medium text-muted transition-colors hover:text-copper"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(project.id)
                    }
                    className="text-xs font-medium text-muted transition-colors hover:text-copper"
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
