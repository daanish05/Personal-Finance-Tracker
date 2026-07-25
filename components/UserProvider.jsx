// "use client";
// import { createContext, useContext, useState, useEffect, useCallback } from "react";

// const PROFILE_KEY = "profileData";
// const PREFS_KEY = "settingsPreferences";
// const NOTIF_KEY = "settingsNotifications";

// function userKey(base) {
//   if (typeof window === "undefined") return base;
//   try {
//     const raw = localStorage.getItem("user");
//     if (raw) {
//       const user = JSON.parse(raw);
//       if (user?.email) return `${user.email}_${base}`;
//     }
//   } catch {}
//   return base;
// }

// const defaultProfile = {
//   name: "Alex Sterling",
//   email: "alex.sterling@wealthflow.com",
//   phone: "+1 (555) 012-3456",
//   location: "New York, NY",
//   bio: "Wealth strategist focusing on sustainable growth and diversified portolio management. Aiming for financial independence by 2030 through aggressive tech investments and real estate.",
//   linkedin: "https://linkedin.com/in/asterling",
//   website: "",
//   avatar: "",
// };

// const defaultPrefs = {
//   language: "English (US)",
//   timezone: "(GMT-05:00) Eastern Time",
// };

// const defaultNotifs = {
//   budgetAlerts: { email: true, push: true },
//   billReminders: { email: true, push: false },
//   monthlyReports: { email: true, push: false },
// };

// const UserContext = createContext({
//   profile: defaultProfile,
//   preferences: defaultPrefs,
//   notifications: defaultNotifs,
//   updateProfile: () => {},
//   updatePreferences: () => {},
//   updateNotifications: () => {},
// });

// export function useUser() {
//   return useContext(UserContext);
// }

// export default function UserProvider({ children }) {
//   const [profile, setProfile] = useState(defaultProfile);
//   const [preferences, setPreferences] = useState(defaultPrefs);
//   const [notifications, setNotifications] = useState(defaultNotifs);

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem(userKey(PROFILE_KEY));
//       if (saved) setProfile({ ...defaultProfile, ...JSON.parse(saved) });
//     } catch (e) {}
//     try {
//       const saved = localStorage.getItem(userKey(PREFS_KEY));
//       if (saved) setPreferences({ ...defaultPrefs, ...JSON.parse(saved) });
//     } catch (e) {}
//     try {
//       const saved = localStorage.getItem(userKey(NOTIF_KEY));
//       if (saved) setNotifications({ ...defaultNotifs, ...JSON.parse(saved) });
//     } catch (e) {}
//   }, []);

//   const updateProfile = useCallback((data) => {
//     setProfile((prev) => {
//       const next = { ...prev, ...data };
//       try { localStorage.setItem(userKey(PROFILE_KEY), JSON.stringify(next)); } catch (e) {}
//       return next;
//     });
//   }, []);

//   const updatePreferences = useCallback((data) => {
//     setPreferences((prev) => {
//       const next = { ...prev, ...data };
//       try { localStorage.setItem(userKey(PREFS_KEY), JSON.stringify(next)); } catch (e) {}
//       return next;
//     });
//   }, []);

//   const updateNotifications = useCallback((data) => {
//     setNotifications((prev) => {
//       const next = { ...prev, ...data };
//       try { localStorage.setItem(userKey(NOTIF_KEY), JSON.stringify(next)); } catch (e) {}
//       return next;
//     });
//   }, []);

//   return (
//     <UserContext.Provider value={{ profile, preferences, notifications, updateProfile, updatePreferences, updateNotifications }}>
//       {children}
//     </UserContext.Provider>
//   );
// }


"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const PROFILE_KEY = "profileData";
const PREFS_KEY = "settingsPreferences";
const NOTIF_KEY = "settingsNotifications";

const defaultProfile = {
  name: "Alex Sterling",
  email: "alex.sterling@wealthflow.com",
  phone: "+1 (555) 012-3456",
  location: "New York, NY",
  bio: "Wealth strategist focusing on sustainable growth and diversified portfolio management. Aiming for financial independence by 2030 through aggressive tech investments and real estate.",
  linkedin: "https://linkedin.com/in/asterling",
  website: "",
  avatar: "",
};

const defaultPrefs = {
  language: "English (US)",
  timezone: "(GMT-05:00) Eastern Time",
};

const defaultNotifs = {
  budgetAlerts: {
    email: true,
    push: true,
  },
  billReminders: {
    email: true,
    push: false,
  },
  monthlyReports: {
    email: true,
    push: false,
  },
};

const UserContext = createContext({
  profile: defaultProfile,
  preferences: defaultPrefs,
  notifications: defaultNotifs,
  updateProfile: () => {},
  updatePreferences: () => {},
  updateNotifications: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [preferences, setPreferences] = useState(defaultPrefs);
  const [notifications, setNotifications] = useState(defaultNotifs);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);

      if (savedProfile) {
        setProfile({
          ...defaultProfile,
          ...JSON.parse(savedProfile),
        });
      }

      const savedPrefs = localStorage.getItem(PREFS_KEY);

      if (savedPrefs) {
        setPreferences({
          ...defaultPrefs,
          ...JSON.parse(savedPrefs),
        });
      }

      const savedNotifications = localStorage.getItem(NOTIF_KEY);

      if (savedNotifications) {
        setNotifications({
          ...defaultNotifs,
          ...JSON.parse(savedNotifications),
        });
      }
    } catch (error) {
      console.error("Failed to load user settings:", error);
    }
  }, []);

  const updateProfile = useCallback((data) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save profile to localStorage:", e);
      }
      return updated;
    });
  }, []);

  const updatePreferences = useCallback((data) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save preferences to localStorage:", e);
      }
      return updated;
    });
  }, []);

  const updateNotifications = useCallback((data) => {
    setNotifications((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save notifications to localStorage:", e);
      }
      return updated;
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        preferences,
        notifications,
        updateProfile,
        updatePreferences,
        updateNotifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}