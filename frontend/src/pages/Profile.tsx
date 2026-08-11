import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import {
  getProfilesFromApi,
  saveProfileToApi,
} from "../services/storageService";
import type { UserProfile } from "../types/index";


function Profile() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  useEffect(() => {
    async function loadProfile() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError(
            "No profile was found."
          );
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