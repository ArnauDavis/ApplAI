import { useState } from "react";
import { mockProfile } from "../data/mockData";
import ProfileForm from "../components/ProfileForm";
import type { UserProfile } from "../types/index";

function Profile() {
  const [profile, setProfile] =
    useState<UserProfile>(mockProfile);

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Profile
      </h2>

      <div className="mt-6">
        <ProfileForm
          profile={profile}
          onSave={setProfile}
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