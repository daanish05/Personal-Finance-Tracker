"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useTransactions, CURRENCIES } from "../../contexts/TransactionContext";
import { useUser } from "../../components/UserProvider";

export default function Settings() {
  const { defaultCurrency, setDefaultCurrency } = useTransactions();
  const { profile, updateProfile, preferences, updatePreferences, notifications, updateNotifications } = useUser();
  const avatarInputRef = useRef(null);

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

  const handleProfileSave = () => {
    const name = document.getElementById("profile-name")?.value || profile.name;
    const email = document.getElementById("profile-email")?.value || profile.email;
    updateProfile({ name, email });
    showToast("Profile saved successfully");
  };

  const handleCurrencyChange = (e) => {
    setDefaultCurrency(e.target.value);
  };

  const handleLanguageChange = (e) => {
    updatePreferences({ language: e.target.value });
  };

  const handleTimezoneChange = (e) => {
    updatePreferences({ timezone: e.target.value });
  };

  const toggleNotif = (section, channel) => {
    const next = {
      ...notifications,
      [section]: {
        ...notifications[section],
        [channel]: !notifications[section][channel],
      },
    };
    updateNotifications(next);
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

  const handleExport = (format) => {
    try {
      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      const data = JSON.stringify(transactions, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wealthflow-export.${format.toLowerCase()}`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Data exported as ${format}`);
    } catch (e) {
      showToast("No data to export");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account and all associated data? This cannot be undone.")) {
      localStorage.clear();
      window.location.href = "/";
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
        <header className="sticky top-0 z-40 flex flex-wrap gap-y-2 justify-between items-center w-full px-lg pl-14 md:pl-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
          <div className="flex items-center gap-md flex-1 min-w-0">
            <div className="relative w-full max-w-full md:max-w-[480px]" style={{ border: "1px solid var(--outline-variant)", borderRadius: "8px" }}>
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
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
            <a href="/Quickadd" className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Quick Add
            </a>
          </div>
        </header>
        <div className="max-w-container-max mx-auto p-xl flex gap-xl">
          <div className="flex-1 space-y-xl settings-scroll">
            <section
              className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
              id="profile"
              style={{ display: sectionMatches("profile") ? "" : "none" }}
            >
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">Profile</h3>
              <div className="flex items-center gap-xl mb-lg">
                <div className="relative group">
                  {profile.avatar ? (
                    <img className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-sm" alt="Profile" src={profile.avatar} />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-surface shadow-sm bg-primary/20 flex items-center justify-center text-primary font-bold text-3xl">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                  <input type="file" accept="image/*" ref={avatarInputRef} className="hidden" onChange={handleAvatarUpload} />
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform" onClick={() => avatarInputRef.current?.click()}>
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-xs px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full mb-2">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                    <span className="font-label-md text-[10px] uppercase font-bold tracking-widest">Premium Member</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md font-bold">{profile.name}</h4>
                  <p className="text-on-surface-variant font-body-sm opacity-70">Member since January 2023</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-lg">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
                  <input
                    id="profile-name"
                    className="w-full px-md py-2.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    type="text"
                    defaultValue={profile.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                  <input
                    id="profile-email"
                    className="w-full px-md py-2.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    type="email"
                    defaultValue={profile.email}
                  />
                </div>
              </div>
              <div className="mt-lg pt-lg border-t border-outline-variant flex justify-end" style={{ gap: "1rem", alignItems: "center" }}>
                <Link href="/EditProfile">
                  <button className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all">Edit Profile</button>
                </Link>
                <button
                  className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
                  onClick={handleProfileSave}
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
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">Preferences</h3>
              <div className="space-y-lg">
                <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Base Currency</p>
                    <p className="text-on-surface-variant text-body-sm">All financial totals will be shown in this currency.</p>
                  </div>
                  <select
                    className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all"
                    value={defaultCurrency}
                    onChange={handleCurrencyChange}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Language</p>
                    <p className="text-on-surface-variant text-body-sm">The language used across the dashboard.</p>
                  </div>
                  <select
                    className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all"
                    value={preferences.language}
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
                    <p className="font-label-md text-label-md font-bold text-on-surface">Timezone</p>
                    <p className="text-on-surface-variant text-body-sm">Used for transaction timestamps and reporting.</p>
                  </div>
                  <select
                    className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all"
                    value={preferences.timezone}
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
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Notifications</h3>
                <div className="flex gap-lg font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant">
                  <span className="w-12 text-center">Email</span>
                  <span className="w-12 text-center">Push</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Budget Alerts</p>
                    <p className="text-on-surface-variant text-body-sm">Notify when I reach 80% of my budget limit.</p>
                  </div>
                  <div className="flex gap-lg">
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={notifications.budgetAlerts.email}
                        onChange={() => toggleNotif("budgetAlerts", "email")}
                      />
                      <div className="relative w-10 h-5 bg-outline-variant/30 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[4px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={notifications.budgetAlerts.push}
                        onChange={() => toggleNotif("budgetAlerts", "push")}
                      />
                      <div className="
                      relative
                      w-10 h-5 
                      bg-outline-variant/30 
                      rounded-full 
                      peer-checked:after:translate-x-full 
                      peer-checked:after:border-white 
                      after:content-[''] 
                      after:absolute 
                      after:top-1/2
                      after:left-[4px] 
                      after:-translate-y-1/2 
                      after:bg-white 
                      after:border-gray-300 
                      after:border 
                      after:rounded-full 
                      after:h-4 after:w-4 
                      after:transition-all 
                      peer-checked:bg-primary" />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Bill Reminders</p>
                    <p className="text-on-surface-variant text-body-sm">Get reminded 3 days before any recurring bills are due.</p>
                  </div>
                  <div className="flex gap-lg">
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={notifications.billReminders.email}
                        onChange={() => toggleNotif("billReminders", "email")}
                      />
                      <div className="relative w-10 h-5 bg-outline-variant/30 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[4px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={notifications.billReminders.push}
                        onChange={() => toggleNotif("billReminders", "push")}
                      />
                      <div className="relative w-10 h-5 bg-outline-variant/30 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[4px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-md">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Monthly Financial Reports</p>
                    <p className="text-on-surface-variant text-body-sm">A deep dive into your spending habits delivered every 1st.</p>
                  </div>
                  <div className="flex gap-lg">
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={notifications.monthlyReports.email}
                        onChange={() => toggleNotif("monthlyReports", "email")}
                      />
                      <div className="relative w-10 h-5 bg-outline-variant/30 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[4px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                      <input
                        className="sr-only peer"
                        type="checkbox"
                        checked={notifications.monthlyReports.push}
                        onChange={() => toggleNotif("monthlyReports", "push")}
                      />
                      <div className="relative w-10 h-5 bg-outline-variant/30 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:left-[4px] after:-translate-y-1/2 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
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
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">Security</h3>
              <div className="space-y-lg">
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Password</p>
                    <p className="text-on-surface-variant text-body-sm">Last changed 4 months ago.</p>
                  </div>
                  <button
                    className="px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors"
                    onClick={() => showToast("Password change feature coming soon")}
                  >
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between py-md border-b border-outline-variant/30">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">Two-Factor Authentication (2FA)</p>
                      <p className="text-secondary text-body-sm font-medium">Currently Enabled</p>
                    </div>
                  </div>
                  <button
                    className="text-error font-label-md text-label-md hover:underline"
                    onClick={() => {
                      if (window.confirm("Disable two-factor authentication?")) {
                        showToast("2FA has been disabled");
                      }
                    }}
                  >
                    Disable
                  </button>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold mb-md text-on-surface">Active Sessions</p>
                  <div className="space-y-md">
                    <div className="flex items-center justify-between p-md bg-surface-container-low border border-outline-variant rounded-lg">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline">desktop_windows</span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Chrome on macOS (Current)</p>
                          <p className="text-[11px] text-on-surface-variant">San Francisco, USA • 192.168.1.1</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold uppercase">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-md bg-surface-container-low border border-outline-variant rounded-lg">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline">smartphone</span>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">WealthFlow iOS App</p>
                          <p className="text-[11px] text-on-surface-variant">San Francisco, USA • iPhone 15 Pro</p>
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
                        <span className="material-symbols-outlined text-[20px]">logout</span>
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
              <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">Data Management</h3>
              <div className="flex flex-col gap-md">
                <div className="p-lg border border-outline-variant rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-primary text-[32px]">download</span>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">Export your data</p>
                      <p className="text-on-surface-variant text-body-sm">Download your full history and profile in a portable format.</p>
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    <button
                      className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center gap-xs"
                      onClick={() => handleExport("CSV")}
                    >
                      CSV
                    </button>
                    <button
                      className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center gap-xs"
                      onClick={() => handleExport("JSON")}
                    >
                      JSON
                    </button>
                  </div>
                </div>
                <div className="p-lg border border-error/30 bg-error-container/10 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-label-md font-bold text-error">Delete Account</p>
                    <p className="text-on-surface-variant text-body-sm">Permanently remove your account and all associated data. This cannot be undone.</p>
                  </div>
                  <button
                    className="px-md py-2 bg-error text-on-error rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
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
            <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
            <span className="font-label-md text-label-md">{toastMessage}</span>
            <button className="ml-xl hover:opacity-70" onClick={() => setToastVisible(false)}>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
