import { useState } from "react";
import type { UserProfile } from "../types/index";

interface ProfileFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

function ProfileForm({
  profile,
  onSave,
}: ProfileFormProps) {
  const [name, setName] = useState(profile.name);
  const [summary, setSummary] = useState(profile.summary);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSave({
      ...profile,
      name,
      summary,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div>
        <label className="block font-semibold">
          Name
        </label>

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">
          Professional Summary
        </label>

        <textarea
          value={summary}
          onChange={(event) =>
            setSummary(event.target.value)
          }
          className="mt-2 border rounded p-2 w-full"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
}

export default ProfileForm;