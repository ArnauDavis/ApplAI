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
      <div>
        <h2 className="text-2xl font-semibold">
          Profile
        </h2>

        <p className="mt-6 text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Profile
        </h2>

        <div className="mt-6 bg-red-100 text-red-700 p-4 rounded">
          {error ?? "No profile available."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Profile
      </h2>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <ProfileForm
          profile={profile}
          onSave={updateProfile}
        />
      </div>

      <div className="mt-6">
        <ExperienceForm
          onSave={addExperience}
        />
      </div>

      <div className="mt-6">
        <ExperienceSection
          experiences={profile.experience}
          onDelete={deleteExperience}
        />
      </div>

      <div className="mt-6">
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
      </div>

      <div className="mt-6">
        <ProjectSection
          projects={profile.projects}
          onDelete={deleteProject}
          onEdit={setEditingProject}
        />
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">
          Preview
        </h3>

        <p className="mt-2">
          {profile.name}
        </p>

        <p className="mt-2 text-gray-600">
          {profile.summary}
        </p>

        <div className="mt-4">
          <h4 className="font-semibold">
            Skills
          </h4>

          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;