"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTransactions, CURRENCIES } from "../../contexts/TransactionContext";
import { useAuth } from "../../contexts/AuthProvider";
import Header from "../../components/Dashboard/Header";
import { processAvatarImage } from "../../lib/processAvatarImage";

export default function Settings() {
  const { defaultCurrency, setDefaultCurrency, transactions } =
    useTransactions();

  const { user } = useAuth();

  const [profile, setProfile] = useState({
     id: null,


    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    linkedin: "",
    website: "",
    avatar: "",
    createdAt: "",

    language: "English (US)",
    timezone: "(GMT+05:30) India Standard Time",

    budgetAlertsEmail: true,
    budgetAlertsPush: true,

    billRemindersEmail: true,
    billRemindersPush: false,

    monthlyReportsEmail: true,
    monthlyReportsPush: false,
  });

  const displayName = profile.name || user?.name || "";
  const displayEmail = profile.email || user?.email || "";

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");

        if (!res.ok) return;

        const data = await res.json();

        setProfile((prev) => ({
          ...prev,
          ...Object.fromEntries(
            Object.entries(data).filter(([, v]) => v != null)
          ),
        }));
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();

    const handleProfileUpdated = () => loadProfile();
    window.addEventListener("profile-updated", handleProfileUpdated);

    return () =>
      window.removeEventListener("profile-updated", handleProfileUpdated);
  }, []);

  const avatarInputRef = useRef(null);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  const handleCurrencyChange = (e) => {
    setDefaultCurrency(e.target.value);
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;

    setProfile((prev) => ({
      ...prev,
      language: value,
    }));
  };

  const handleTimezoneChange = (e) => {
    const value = e.target.value;

    setProfile((prev) => ({
      ...prev,
      timezone: value,
    }));
  };

  const toggleNotif = (field) => {
    setProfile((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await processAvatarImage(file);
      setProfile((prev) => ({
        ...prev,
        avatar: dataUrl,
      }));
    } catch (err) {
      console.error(err);
      showToast("Failed to load image");
    }
  };

  async function saveProfile() {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      showToast("Profile updated successfully");

      window.dispatchEvent(new CustomEvent("profile-updated"));
    } catch (err) {
      console.error(err);
      showToast("Failed to update profile");
    }
  }

  const handleExport = async (format) => {
    try {
      const res = await fetch("/api/transactions");
      const txns = await res.json();

      const data = JSON.stringify(txns, null, 2);

      const blob = new Blob([data], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `wealthflow-export.${format.toLowerCase()}`;

      a.click();

      URL.revokeObjectURL(url);

      showToast(`Data exported as ${format}`);
    } catch {
      showToast("No data to export");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account and all associated data? This cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const res = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      showToast("Failed to delete account");
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      body {\n        font-family: "Geist", sans-serif;\n      }\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n        vertical-align: middle;\n      }\n      .settings-scroll {\n        scroll-behavior: smooth;\n      }\n      .glass-panel {\n        background: rgba(255, 255, 255, 0.8);\n        backdrop-filter: blur(12px);\n        border: 1px solid rgba(114, 118, 135, 0.1);\n      }\n    ',
        }}
      />
      <main className="ml-0 md:ml-60 min-h-screen">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          transactions={transactions}
          defaultCurrency={defaultCurrency}
          placeholder="Search settings..."
        />
        <div className="max-w-container-max mx-auto p-xl flex gap-xl">
          <div className="flex-1 space-y-xl settings-scroll">
            <section
              className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
              id="profile"
              style={{ display: sectionMatches("profile") ? "" : "none" }}
            >
              <div className="flex items-center gap-2 mb-md">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex items-center justify-center p-1 rounded hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_back
                  </span>
                </button>

                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Profile
                </h3>
              </div>
              <div className="flex items-center gap-xl mb-lg">
                <div className="relative group">
                  {profile.avatar ? (
                    <img
                      className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-sm"
                      alt="Profile"
                      src={profile.avatar}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-surface shadow-sm bg-primary/20 flex items-center justify-center text-primary font-bold text-3xl">
                      {displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={avatarInputRef}
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <button
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      photo_camera
                    </span>
                  </button>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-xs px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full mb-2">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      verified
                    </span>
                    <span className="font-label-md text-[10px] uppercase font-bold tracking-widest">
                      Premium Member
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md font-bold">
                    {displayName}
                  </h4>
                  <p className="text-on-surface-variant font-body-sm opacity-100">
                    {displayEmail}
                  </p>
                  <p className="text-on-surface-variant font-body-sm opacity-70">
                    Member since {memberSince}
                  </p>
                </div>
              </div>
              <div
                className="
                mt-lg pt-lg border-t border-outline-variant
                flex flex-col sm:flex-row
                gap-4
                items-stretch sm:items-center
                justify-end"
              >
                <Link href="/EditProfile">
                  <button className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all w-full sm:w-auto">
                    Edit Profile
                  </button>
                </Link>

                <button
                  onClick={saveProfile}
                  className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-label-md hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </section>

            <section
              className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
              id="preferences"
              style={{ display: sectionMatches("preferences") ? "" : "none" }}
            >
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">
                Preferences
              </h3>
              <div className="space-y-lg">
                <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Base Currency
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      All financial totals will be shown in this currency.
                    </p>
                  </div>
                  <select
                    className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all"
                    value={defaultCurrency}
                    onChange={handleCurrencyChange}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Language
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      The language used across the dashboard.
                    </p>
                  </div>
                  <select
                    className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all"
                    value={profile.language}
                    onChange={handleLanguageChange}
                  >
                    <option>English (US)</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Timezone
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      Used for transaction timestamps and reporting.
                    </p>
                  </div>
                  <select
                    className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all"
                    value={profile.timezone}
                    onChange={handleTimezoneChange}
                  >
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT+00:00) UTC</option>
                  </select>
                </div>
              </div>
            </section>

            <section
              className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
              id="notifications"
              style={{ display: sectionMatches("notifications") ? "" : "none" }}
            >
              <div className="flex items-center justify-between mb-md">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Notifications
                </h3>
                <div className="flex gap-lg font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant">
                  <span className="w-12 text-center">Email</span>
                  <span className="w-12 text-center">Push</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Budget Alerts
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      Notify when I reach 80% of my budget limit.
                    </p>
                  </div>
                  <div className="flex gap-lg">
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={profile.budgetAlertsEmail}
                        onChange={() => toggleNotif("budgetAlertsEmail")}
                      />
                      <div
                        className="
                        relative 
                        w-11 h-5.5 
                        bg-outline-variant/30 
                        rounded-full 
                        peer-checked:after:translate-x-[24px]
                        peer-checked:after:border-white 
                        after:content-[''] 
                        after:absolute 
                        after:top-1/2 
                        after:left-[0px] 
                        after:-translate-y-1/2 
                        after:bg-white 
                        after:border-gray-300 
                        after:border 
                        after:rounded-full 
                        after:h-5 after:w-5 
                        after:transition-all 
                        peer-checked:bg-primary"
                      />
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={profile.budgetAlertsPush}
                        onChange={() => toggleNotif("budgetAlertsPush")}
                      />
                      <div
                        className="
                      relative
                      w-11 h-5.5
                      bg-outline-variant/30 
                      rounded-full
                      peer-checked:after:translate-x-[24px] 
                      peer-checked:after:border-white
                      after:content-['']  
                      after:absolute 
                      after:top-1/2
                      after:left-[0px]
                      after:-translate-y-1/2 
                      after:bg-white 
                      after:border-gray-300   
                      after:border 
                      after:rounded-full 
                      after:h-5 after:w-5 
                      after:transition-all 
                      peer-checked:bg-primary"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Bill Reminders
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      Get reminded 3 days before any recurring bills are due.
                    </p>
                  </div>
                  <div className="flex gap-lg">
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={profile.billRemindersEmail}
                        onChange={() => toggleNotif("billRemindersEmail")}
                      />
                      <div
                        className="
                      relative
                      w-11 h-5.5
                      bg-outline-variant/30 
                      rounded-full
                      peer-checked:after:translate-x-[24px] 
                      peer-checked:after:border-white
                      after:content-['']  
                      after:absolute 
                      after:top-1/2
                      after:left-[0px]
                      after:-translate-y-1/2 
                      after:bg-white 
                      after:border-gray-300   
                      after:border 
                      after:rounded-full 
                      after:h-5 after:w-5 
                      after:transition-all 
                      peer-checked:bg-primary"
                      />
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={profile.billRemindersPush}
                        onChange={() => toggleNotif("billRemindersPush")}
                      />
                      <div
                        className="
                      relative
                      w-11 h-5.5
                      bg-outline-variant/30 
                      rounded-full
                      peer-checked:after:translate-x-[24px] 
                      peer-checked:after:border-white
                      after:content-['']  
                      after:absolute 
                      after:top-1/2
                      after:left-[0px]
                      after:-translate-y-1/2 
                      after:bg-white 
                      after:border-gray-300   
                      after:border 
                      after:rounded-full 
                      after:h-5 after:w-5 
                      after:transition-all 
                      peer-checked:bg-primary"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-md">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Monthly Financial Reports
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      A deep dive into your spending habits delivered every 1st.
                    </p>
                  </div>
                  <div className="flex gap-lg">
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={profile.monthlyReportsEmail}
                        onChange={() => toggleNotif("monthlyReportsEmail")}
                      />
                      <div
                        className="
                      relative
                      w-11 h-5.5
                      bg-outline-variant/30 
                      rounded-full
                      peer-checked:after:translate-x-[24px] 
                      peer-checked:after:border-white
                      after:content-['']  
                      after:absolute 
                      after:top-1/2
                      after:left-[0px]
                      after:-translate-y-1/2 
                      after:bg-white 
                      after:border-gray-300   
                      after:border 
                      after:rounded-full 
                      after:h-5 after:w-5 
                      after:transition-all 
                      peer-checked:bg-primary"
                      />
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={profile.monthlyReportsPush}
                        onChange={() => toggleNotif("monthlyReportsPush")}
                      />
                      <div
                        className="
                      relative
                      w-11 h-5.5
                      bg-outline-variant/30 
                      rounded-full
                      peer-checked:after:translate-x-[24px] 
                      peer-checked:after:border-white
                      after:content-['']  
                      after:absolute 
                      after:top-1/2
                      after:left-[0px]
                      after:-translate-y-1/2 
                      after:bg-white 
                      after:border-gray-300   
                      after:border 
                      after:rounded-full 
                      after:h-5 after:w-5 
                      after:transition-all 
                      peer-checked:bg-primary"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
              id="security"
              style={{ display: sectionMatches("security") ? "" : "none" }}
            >
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">
                Security
              </h3>
              <div className="space-y-lg">
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Password
                    </p>
                    <p className="text-on-surface-variant text-body-sm">
                      Last changed 4 months ago.
                    </p>
                  </div>
                  <button
                    className="px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors"
                    onClick={() =>
                      showToast("Password change feature coming soon")
                    }
                  >
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">
                        verified_user
                      </span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">
                        Two-Factor Authentication (2FA)
                      </p>
                      <p className="text-secondary text-body-sm font-medium">
                        Currently Enabled
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-error font-label-md text-label-md hover:underline"
                    onClick={() => {
                      if (
                        window.confirm("Disable two-factor authentication?")
                      ) {
                        showToast("2FA has been disabled");
                      }
                    }}
                  >
                    Disable
                  </button>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold mb-md text-on-surface">
                    Active Sessions
                  </p>
                  <div className="space-y-md">
                    <div className="flex items-center justify-between p-md bg-surface-container-low border border-outline-variant rounded-lg">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline">
                          desktop_windows
                        </span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">
                            Chrome on macOS (Current)
                          </p>
                          <p className="text-[11px] text-on-surface-variant">
                            San Francisco, USA • 192.168.1.1
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold uppercase">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-md bg-surface-container-low border border-outline-variant rounded-lg">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline">
                          smartphone
                        </span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">
                            WealthFlow iOS App
                          </p>
                          <p className="text-[11px] text-on-surface-variant">
                            San Francisco, USA • iPhone 15 Pro
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-on-surface-variant hover:text-error transition-colors"
                        onClick={() => {
                          if (window.confirm("Sign out from this device?")) {
                            showToast("Session signed out");
                          }
                        }}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          logout
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
              id="data"
              style={{ display: sectionMatches("data") ? "" : "none" }}
            >
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">
                Data Management
              </h3>
              <div className="flex flex-col gap-md">
                {/* Export Data */}
                <div className="p-lg border border-outline-variant rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start md:items-center gap-md">
                    <span className="material-symbols-outlined text-primary text-[32px]">
                      download
                    </span>

                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">
                        Export your data
                      </p>
                      <p className="text-on-surface-variant text-body-sm">
                        Download your full history and profile in a portable
                        format.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full md:w-auto gap-sm">
                    <button
                      className="flex-1 md:flex-none px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors"
                      onClick={() => handleExport("CSV")}
                    >
                      CSV
                    </button>

                    <button
                      className="flex-1 md:flex-none px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors"
                      onClick={() => handleExport("JSON")}
                    >
                      JSON
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="p-lg border border-error/30 bg-error-container/10 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-error">
                      Delete Account
                    </p>

                    <p className="text-on-surface-variant text-body-sm">
                      Permanently remove your account and all associated data.
                      This cannot be undone.
                    </p>
                  </div>

                  <button
                    className="w-full md:w-auto px-md py-2 bg-error text-on-error rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </section>

            <div className="h-xl" />
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
