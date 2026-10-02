import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProjectForm from "../components/ProjectForm";
import ProjectSection from "../components/ProjectSection";
import ExperienceForm from "../components/ExperienceForm";
import ExperienceSection from "../components/ExperienceSection";
import {
  createExperienceToApi,
  deleteExperienceFromApi,
  getProfilesFromApi,
  saveProfileToApi,
  createProjectToApi,
  deleteProjectFromApi,
  updateProjectToApi,
} from "../services/storageService";
import type {
  Experience,
  Project,
  UserProfile,
} from "../types/index";

function Profile() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        setProfile(profiles[0]);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setError(
          "Unable to load profile from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function updateProfile(
    updatedProfile: UserProfile
  ) {
    try {
      const savedProfile =
        await saveProfileToApi(
          updatedProfile
        );

      setProfile(savedProfile);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error
      );

      setError(
        "Unable to save profile."
      );
    }
  }

  async function addExperience(
    experience: {
      company: string;
      title: string;
      description: string;
      startDate: string;
      endDate?: string;
    }
  ) {
    if (!profile) {
      return;
    }

    try {
      const newExperience =
        await createExperienceToApi(
          profile.id,
          experience
        );

      setProfile({
        ...profile,
        experience: [
          ...profile.experience,
          newExperience,
        ],
      });

      setError(null);
    } catch (error) {
      console.error(
        "Failed to create experience:",
        error
      );

      setError(
        "Unable to add experience."
      );

      throw error;
    }
  }

  async function deleteExperience(
    experienceId: string
  ) {
    if (!profile) {
      return;
    }

    try {
      await deleteExperienceFromApi(
        experienceId
      );

      setProfile({
        ...profile,
        experience:
          profile.experience.filter(
            (experience) =>
              experience.id !== experienceId
          ),
      });

      setError(null);
    } catch (error) {
      console.error(
        "Failed to delete experience:",
        error
      );

      setError(
        "Unable to delete experience."
      );

      throw error;
    }
  }

  async function addProject(
    project: {
      name: string;
      description: string;
      technologies: string[];
    }
  ) {
    if (!profile) {
      return;
    }

    try {
      const newProject =
        await createProjectToApi(
          profile.id,
          project
        );

      setProfile({
        ...profile,
        projects: [
          ...profile.projects,
          newProject,
        ],
      });

      setError(null);
    } catch (error) {
      console.error(
        "Failed to create project:",
        error
      );

      setError(
        "Unable to add project."
      );

      throw error;
    }
  }

  async function updateProject(
    projectId: string,
    project: {
      name: string;
      description: string;
      technologies: string[];
    }
  ) {
    if (!profile) {
      return;
    }

    try {
      const updatedProject =
        await updateProjectToApi(
          projectId,
          project
        );

      setProfile({
        ...profile,
        projects: profile.projects.map(
          (existingProject) =>
            existingProject.id === projectId
              ? updatedProject
              : existingProject
        ),
      });

      setEditingProject(null);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to update project:",
        error
      );

      setError(
        "Unable to update project."
      );

      throw error;
    }
  }

  async function deleteProject(
    projectId: string
  ) {
    if (!profile) {
      return;
    }

    try {
      await deleteProjectFromApi(
        projectId
      );

      setProfile({
        ...profile,
        projects: profile.projects.filter(
          (project) =>
            project.id !== projectId
        ),
      });

      setError(null);
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error
      );

      setError(
        "Unable to delete project."
      );

      throw error;
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Career Workspace
          </p>

          <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Profile
          </h2>

          <p className="mt-3 text-sm text-muted">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Career Workspace
          </p>

          <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Profile
          </h2>
        </div>

        <div className="mt-6 border border-signal/40 bg-signal/10 px-4 py-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal" />

            <div>
              <p className="font-medium text-ink">
                No profile available
              </p>

              <p className="mt-1 text-muted">
                {error ?? "No profile available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="border-b border-line pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Career Workspace
        </p>

        <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Profile
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          Keep the information behind your applications
          accurate, current, and entirely your own.
        </p>
      </section>

      {error && (
        <div className="mt-6 border border-signal/40 bg-signal/10 px-4 py-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal" />

            <div>
              <p className="font-medium text-ink">
                Something needs attention
              </p>

              <p className="mt-1 text-muted">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <ProfileForm
          profile={profile}
          onSave={updateProfile}
        />
      </div>

      <section className="mt-10 border-t border-line pt-8">
        <div className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Experience
          </p>

          <h3 className="mt-1 font-display text-2xl text-ink">
            Work history
          </h3>
        </div>

        <ExperienceForm
          onSave={addExperience}
        />

        <div className="mt-6">
          <ExperienceSection
            experiences={profile.experience}
            onDelete={deleteExperience}
          />
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <div className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Projects
          </p>

          <h3 className="mt-1 font-display text-2xl text-ink">
            Work you've built
          </h3>
        </div>

        {editingProject ? (
          <ProjectForm
            project={editingProject}
            onSave={(project) =>
              updateProject(
                editingProject.id,
                project
              )
            }
            onCancel={() =>
              setEditingProject(null)
            }
          />
        ) : (
          <ProjectForm
            onSave={addProject}
          />
        )}

        <div className="mt-6">
          <ProjectSection
            projects={profile.projects}
            onDelete={deleteProject}
            onEdit={setEditingProject}
          />
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <div className="border border-line bg-whitewarm p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Profile summary
          </p>

          <h3 className="mt-2 font-display text-2xl text-ink">
            {profile.name}
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            {profile.summary}
          </p>

          <div className="mt-6 border-t border-line pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Skills
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-line bg-parchment px-3 py-1.5 text-xs text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
