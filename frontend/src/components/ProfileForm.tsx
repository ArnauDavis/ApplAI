import { useState } from "react";
import type { UserProfile } from "../types/index";

interface ProfileFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => Promise<void>;
}

function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [name, setName] = useState(profile.name);
  const [summary, setSummary] = useState(profile.summary);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);
    setSaved(false);

    try {
      await onSave({
        ...profile,
        name,
        summary,
      });

      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-whitewarm p-5 transition-colors duration-200 sm:p-6"
    >
      <div className="border-b border-line pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Personal information
        </p>

        <h3 className="mt-1 font-display text-2xl text-ink">
          Your profile
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Keep the information here accurate. Your profile
          provides the foundation for job analysis and
          application materials.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="profile-name"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Name
          </label>

          <input
            id="profile-name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
          />
        </div>

        <div>
          <label
            htmlFor="profile-summary"
            className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            Professional summary
          </label>

          <textarea
            id="profile-summary"
            value={summary}
            onChange={(event) =>
              setSummary(event.target.value)
            }
            rows={6}
            className="mt-2 w-full resize-y border border-line bg-paper px-3 py-3 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-muted focus:border-copper focus:ring-1 focus:ring-copper/30"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saving}
          className="border border-copper bg-copper px-4 py-2.5 text-sm font-medium text-whitewarm transition-colors duration-150 hover:bg-copper-dark disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        {saved && (
          <p className="flex items-center gap-2 text-sm text-moss">
            <span className="h-1.5 w-1.5 rounded-full bg-moss" />
            Profile saved successfully.
          </p>
        )}
      </div>
    </form>
  );
}

export default ProfileForm;
