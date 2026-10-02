import { useEffect, useState } from "react";
import type { Project } from "../types/index";

interface ProjectFormProps {
  project?: Project;
  onSave: (project: {
    name: string;
    description: string;
    technologies: string[];
  }) => Promise<void>;
  onCancel?: () => void;
}

function ProjectForm({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [name, setName] = useState(
    project?.name ?? ""
  );

  const [description, setDescription] =
    useState(project?.description ?? "");

  const [technologies, setTechnologies] =
    useState(
      project?.technologies.join(", ") ?? ""
    );

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    setName(project?.name ?? "");
    setDescription(
      project?.description ?? ""
    );
    setTechnologies(
      project?.technologies.join(", ") ?? ""
    );
    setSaved(false);
  }, [project]);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    setSaving(true);
    setSaved(false);

    try {
      const technologyList =
        technologies
          .split(",")
          .map((technology) =>
            technology.trim()
          )
          .filter(Boolean);

      await onSave({
        name: name.trim(),
        description: description.trim(),
        technologies: technologyList,
      });

      if (!project) {
        setName("");
        setDescription("");
        setTechnologies("");
        setSaved(true);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-whitewarm p-5 sm:p-6"
    >
      <div className="border-b border-line pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {project
            ? "Project details"
            : "Portfolio"}
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          {project
            ? "Edit Project"
            : "Add Project"}
        </h3>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="project-name"
            className="block text-sm font-medium text-ink"
          >
            Project Name
          </label>

          <input
            id="project-name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-copper"
            placeholder="My Project"
            required
          />
        </div>

        <div>
          <label
            htmlFor="project-description"
            className="block text-sm font-medium text-ink"
          >
            Description
          </label>

          <textarea
            id="project-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            className="mt-2 w-full resize-y border border-line bg-paper px-3 py-2.5 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-copper"
            rows={4}
            placeholder="Describe what you built..."
          />
        </div>

        <div>
          <label
            htmlFor="project-technologies"
            className="block text-sm font-medium text-ink"
          >
            Technologies
          </label>

          <input
            id="project-technologies"
            value={technologies}
            onChange={(event) =>
              setTechnologies(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-copper"
            placeholder="React, TypeScript, PostgreSQL"
          />

          <p className="mt-2 text-xs text-muted">
            Separate technologies with commas.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="submit"
            disabled={saving}
            className="border border-copper bg-copper px-4 py-2.5 text-sm font-medium text-whitewarm transition-colors hover:bg-copper-dark disabled:cursor-not-allowed disabled:border-line disabled:bg-parchment disabled:text-muted"
          >
            {saving
              ? "Saving..."
              : project
                ? "Save Changes"
                : "Add Project"}
          </button>

          {project && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="border border-line px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-copper hover:text-ink"
            >
              Cancel
            </button>
          )}
        </div>

        {saved && (
          <div className="border-l-2 border-moss bg-moss/10 px-3 py-2.5 text-sm text-ink">
            Project added successfully.
          </div>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;
