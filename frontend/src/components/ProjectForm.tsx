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
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h3 className="text-xl font-semibold">
        {project
          ? "Edit Project"
          : "Add Project"}
      </h3>

      <div>
        <label className="block font-semibold">
          Project Name
        </label>

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
          placeholder="My Project"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
          rows={4}
          placeholder="Describe what you built..."
        />
      </div>

      <div>
        <label className="block font-semibold">
          Technologies
        </label>

        <input
          value={technologies}
          onChange={(event) =>
            setTechnologies(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
          placeholder="React, TypeScript, PostgreSQL"
        />

        <p className="mt-1 text-sm text-gray-500">
          Separate technologies with commas.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
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
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>

      {saved && (
        <p className="text-green-600 font-medium">
          Project added successfully.
        </p>
      )}
    </form>
  );
}

export default ProjectForm;