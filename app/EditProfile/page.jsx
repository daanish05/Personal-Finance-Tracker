"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Link from "next/link";
import { useUser } from "../../components/UserProvider";

export default function EditProfile() {
  const { profile, updateProfile } = useUser();
  const avatarInputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({ ...profile });
  const [savedForm, setSavedForm] = useState({ ...profile });

  const sectionMatches = (section) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.toLowerCase().includes(q) ||
      section.replace(/-/g, " ").toLowerCase().includes(q)
    );
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     updateProfile(form);
  //     setSavedForm({ ...form });
  //     showToast("Profile updated successfully");
  //   };

  //   const handleCancel = () => {
  //     setForm({ ...savedForm });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(form); // Save the profile

    setSavedForm({ ...form });
    showToast("Profile updated successfully");

    router.back(); // Go back after saving
  };

  const handleCancel = () => {
    router.back(); // Discard changes and go back
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProfile({ avatar: ev.target.result });
      showToast("Profile picture updated");
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      body {\n        font-family: "Geist", sans-serif;\n      }\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n      }\n      input:focus,\n      textarea:focus {\n        outline: none;\n        border-color: #0066ff !important;\n        box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);\n      }\n      .custom-glass {\n        background: rgba(255, 255, 255, 0.8);\n        backdrop-filter: blur(12px);\n        border: 1px solid rgba(229, 238, 255, 0.5);\n      }\n    ',
        }}
      />
      <main className="ml-0 md:ml-60 min-h-screen">
        {/* <header className="sticky top-0 z-40 flex flex-wrap gap-y-2 justify-between items-center w-full px-lg pl-14 md:pl-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
          <div className="flex items-center gap-md flex-1 min-w-0">
            <div
              className="relative w-full max-w-full md:max-w-[480px]"
              style={{
                border: "1px solid var(--outline-variant)",
                borderRadius: "8px",
              }}
            >
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm border border-transparent transition-all duration-200 hover:border-primary/40 hover:shadow-md focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                placeholder="Search settings..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-lg">
            <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
            </button>
            <a
              href="/Quickadd"
              className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Quick Add
            </a>
          </div>
        </header> */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link href="/">
              <h1 className="font-headline-md text-headline-md font-bold text-primary">
                WealthFlow
              </h1>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
              </button>

              <a
                href="/Quickadd"
                className="flex items-center gap-1 bg-primary text-on-primary px-3 py-2 rounded-lg"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                <span className="text-sm">Quick Add</span>
              </a>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center w-full px-lg py-md">
            <div className="flex items-center gap-md flex-1 min-w-0">
              <div
                className="relative w-full max-w-[480px]"
                style={{
                  border: "1px solid var(--outline-variant)",
                  borderRadius: "8px",
                }}
              >
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>

                <input
                  className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2"
                  placeholder="Search settings..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-lg">
              <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
              </button>

              <a
                href="/Quickadd"
                className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Quick Add
              </a>
            </div>
          </div>
        </header>
        <div
          className="max-w-container-max mx-auto p-xl flex gap-xl"
          className="p-xl"
        >
          <div className="max-w-4xl mx-auto">
            <nav className="mb-lg">
              <ol className="flex items-center gap-2 text-on-surface-variant">
                <li>
                  <Link
                    className="font-label-md text-label-md hover:text-primary transition-colors"
                    href="/Settings"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                </li>
                <li>
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    Edit Profile
                  </span>
                </li>
              </ol>
            </nav>
            <header className="mb-xl">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Account Settings
              </h1>
              <p className="font-body-md text-body-md text-outline-variant mt-1">
                Manage your professional presence and personal wealth identity.
              </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
              <section
                className="lg:col-span-4"
                style={{ display: sectionMatches("profile") ? "" : "none" }}
              >
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg sticky top-24">
                  <h2 className="font-label-md text-label-md font-bold text-on-surface mb-md">
                    Profile Picture
                  </h2>
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high shadow-sm">
                        {profile.avatar ? (
                          <img
                            className="w-full h-full object-cover"
                            alt="Profile"
                            src={profile.avatar}
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-4xl">
                            {profile.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={avatarInputRef}
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                      <button
                        className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full border-2 border-surface hover:scale-110 transition-transform shadow-lg"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          photo_camera
                        </span>
                      </button>
                    </div>
                    <p className="mt-md font-body-sm text-body-sm text-outline text-center">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                    <div className="w-full mt-lg space-y-2">
                      <button
                        className="w-full py-2 bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors border border-outline-variant"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        Update Avatar
                      </button>
                      <button
                        className="w-full py-2 text-error font-label-md text-label-md hover:bg-error-container/10 transition-colors rounded-lg"
                        onClick={() => {
                          updateProfile({ avatar: "" });
                          showToast("Photo removed");
                        }}
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section
                className="lg:col-span-8 space-y-lg"
                style={{ display: sectionMatches("profile") ? "" : "none" }}
              >
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl">
                  <form className="space-y-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                      <div className="space-y-base">
                        <label className="font-label-md text-label-md text-on-surface-variant block">
                          Full Name
                        </label>
                        <input
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-base">
                        <label className="font-label-md text-label-md text-on-surface-variant block">
                          Email Address
                        </label>
                        <input
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-base">
                        <label className="font-label-md text-label-md text-on-surface-variant block">
                          Phone Number
                        </label>
                        <input
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-base">
                        <label className="font-label-md text-label-md text-on-surface-variant block">
                          Location
                        </label>
                        <input
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                          type="text"
                          value={form.location}
                          onChange={(e) =>
                            updateField("location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-base">
                      <label className="font-label-md text-label-md text-on-surface-variant block">
                        Financial Bio &amp; Goals
                      </label>
                      <textarea
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface resize-none"
                        placeholder="Share your long-term investment philosophy or personal financial goals..."
                        rows={4}
                        value={form.bio}
                        onChange={(e) => updateField("bio", e.target.value)}
                      />
                    </div>
                    <div className="space-y-md border-t border-outline-variant pt-lg mt-xl">
                      <h3 className="font-label-md text-label-md font-bold text-on-surface">
                        Connected Socials
                      </h3>
                      <div className="space-y-md">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary border border-primary/20">
                            <span className="material-symbols-outlined">
                              link
                            </span>
                          </div>
                          <div className="flex-1">
                            <input
                              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-2 font-body-sm text-body-sm text-on-surface"
                              type="url"
                              value={form.linkedin}
                              onChange={(e) =>
                                updateField("linkedin", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary border border-secondary/20">
                            <span className="material-symbols-outlined">
                              public
                            </span>
                          </div>
                          <div className="flex-1">
                            <input
                              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-2 font-body-sm text-body-sm text-on-surface"
                              placeholder="Personal Website"
                              type="url"
                              value={form.website}
                              onChange={(e) =>
                                updateField("website", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-md pt-xl border-t border-outline-variant mt-xl">
                      <button
                        className="px-xl py-3 border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-all"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-xl py-3 bg-primary text-white rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                {/* <div className="custom-glass rounded-xl p-lg border border-primary/10 flex items-start gap-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Privacy &amp; Security</h4>
                    <p className="font-body-sm text-body-sm text-outline-variant mt-1">Your personal information is encrypted and never shared with third-party advisors without your explicit permission.</p>
                  </div>
                </div> */}
              </section>
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-lg right-lg transition-all duration-300 z-[100] ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="bg-inverse-surface text-inverse-on-surface px-lg py-md rounded-xl flex items-center gap-md shadow-2xl">
            <span className="material-symbols-outlined text-secondary-fixed">
              check_circle
            </span>
            <span className="font-label-md text-label-md">{toastMessage}</span>
            <button
              className="ml-xl hover:opacity-70"
              onClick={() => setToastVisible(false)}
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
