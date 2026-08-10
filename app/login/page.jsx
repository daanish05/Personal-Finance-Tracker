"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/Dashboard/ThemeToggle";

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { dark, toggleDark } = useTheme();
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.tailwind = window.tailwind || {};

    window.tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "inverse-primary": "#b3c5ff",
            "tertiary-fixed-dim": "#ffb59d",
            "surface-dim": "#cbdbf5",
            "on-surface": "#0b1c30",
            "on-primary-fixed-variant": "#003fa4",
            outline: "#727687",
            "surface-container-low": "#eff4ff",
            "secondary-container": "#6cf8bb",
            "on-primary-fixed": "#001849",
            tertiary: "#a33200",
            "surface-container-lowest": "#ffffff",
            surface: "#f8f9ff",
            "secondary-fixed-dim": "#4edea3",
            "on-secondary": "#ffffff",
            "inverse-on-surface": "#eaf1ff",
            "inverse-surface": "#213145",
            "on-primary": "#ffffff",
            "primary-fixed": "#dae1ff",
            "on-tertiary": "#ffffff",
            "primary-container": "#0066ff",
            background: "#f8f9ff",
            "surface-container-high": "#dce9ff",
            "surface-container": "#e5eeff",
            "on-secondary-fixed": "#002113",
            "on-error-container": "#93000a",
            "on-error": "#ffffff",
            "on-background": "#0b1c30",
            "primary-fixed-dim": "#b3c5ff",
            "error-container": "#ffdad6",
            error: "#ba1a1a",
            "surface-tint": "#0054d6",
            "outline-variant": "#c2c6d8",
            "tertiary-fixed": "#ffdbd0",
            secondary: "#006c49",
            "on-tertiary-fixed-variant": "#832600",
            "tertiary-container": "#cc4204",
            primary: "#0050cb",
            "on-primary-container": "#f8f7ff",
            "on-tertiary-container": "#fff6f4",
            "secondary-fixed": "#6ffbbe",
            "on-secondary-container": "#00714d",
            "surface-variant": "#d3e4fe",
            "on-surface-variant": "#424656",
            "surface-container-highest": "#d3e4fe",
            "on-secondary-fixed-variant": "#005236",
            "surface-bright": "#f8f9ff",
            "on-tertiary-fixed": "#390c00",
          },

          borderRadius: {
            DEFAULT: "0.25rem",
            lg: "0.5rem",
            xl: "0.75rem",
            full: "9999px",
          },

          spacing: {
            xs: "4px",
            md: "16px",
            lg: "24px",
            gutter: "24px",
            xl: "40px",
            "container-max": "1280px",
            sm: "8px",
            base: "4px",
          },

          fontFamily: {
            "headline-lg-mobile": ["Geist"],
            "label-md": ["Geist"],
            "body-sm": ["Geist"],
            "body-lg": ["Geist"],
            "headline-xl": ["Geist"],
            "mono-data": ["jetbrainsMono"],
            "headline-md": ["Geist"],
            "headline-lg": ["Geist"],
            "body-md": ["Geist"],
          },

          fontSize: {
            "headline-lg-mobile": [
              "24px",
              {
                lineHeight: "1.3",
                fontWeight: "600",
              },
            ],

            "label-md": [
              "12px",
              {
                lineHeight: "1",
                letterSpacing: "0.02em",
                fontWeight: "500",
              },
            ],

            "body-sm": [
              "14px",
              {
                lineHeight: "1.5",
                fontWeight: "400",
              },
            ],

            "body-lg": [
              "18px",
              {
                lineHeight: "1.6",
                fontWeight: "400",
              },
            ],

            "headline-xl": [
              "40px",
              {
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
                fontWeight: "600",
              },
            ],

            "mono-data": [
              "14px",
              {
                lineHeight: "1.5",
                fontWeight: "400",
              },
            ],

            "headline-md": [
              "24px",
              {
                lineHeight: "1.4",
                fontWeight: "500",
              },
            ],

            "headline-lg": [
              "32px",
              {
                lineHeight: "1.25",
                letterSpacing: "-0.02em",
                fontWeight: "600",
              },
            ],

            "body-md": [
              "16px",
              {
                lineHeight: "1.6",
                fontWeight: "400",
              },
            ],
          },
        },
      },
    };
  }, []);

  const isSignup = authMode === "signup";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const endpoint = isSignup ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message);
        return;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.replace("/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .material-symbols-outlined {
              font-variation-settings:
                "FILL" 0,
                "wght" 400,
                "GRAD" 0,
                "opsz" 24;
            }

            body {
              font-family: "Geist", sans-serif;
              background-color: #f8f9ff;
            }

            .glass-effect {
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.3);
            }

            .auth-tab-active {
              color: #0050cb;
              border-bottom: 2px solid #0050cb;
            }

            .dark .auth-tab-active {
              color: #b3c5ff;
              border-bottom: 2px solid #b3c5ff;
            }

            .input-focus-ring:focus {
              outline: none;
              border-color: #0066ff;
              box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
            }

            .dark .input-focus-ring:focus {
              border-color: #72a7ff;
              box-shadow: 0 0 0 4px rgba(114, 167, 255, 0.15);
            }

            .dark body,
            .dark .bg-surface {
              background: #0b1c30;
            }

            .dark .bg-surface-container-lowest {
              background: #0d1e32;
            }

            .dark .text-on-surface {
              color: #eaf1ff;
            }

            .dark .text-on-surface-variant {
              color: #c2c6d8;
            }

            .dark .text-primary {
              color: #b3c5ff;
            }

            .dark .text-error {
              color: #ffb4ab;
            }

            .dark .border-outline-variant\/30 {
              border-color: rgba(194, 198, 216, 0.18);
            }

            .dark .border-outline-variant\/50 {
              border-color: rgba(194, 198, 216, 0.25);
            }

            .dark input::placeholder,
            .dark textarea::placeholder {
              color: rgba(194, 198, 216, 0.65);
              -webkit-text-fill-color: rgba(194, 198, 216, 0.65);
              opacity: 1;
            }

            .dark .bg-primary {
              background: #0054d6;
            }

            .dark .text-on-primary {
              color: #eaf1ff;
            }

            .dark .hover\:bg-primary-container:hover {
              background: #1a3a5f;
            }

            .dark .hover\:bg-surface-container-low:hover {
              background: #1a2a3e;
            }

            .dark .bg-error-container\/20 {
              background: rgba(186, 26, 26, 0.18);
            }

            .dark .border-error\/30 {
              border-color: rgba(255, 180, 171, 0.3);
            }

            .dark .text-surface-variant\/80 {
              color: rgba(194, 198, 216, 0.85);
            }

            .dark .text-surface-variant {
              color: #c2c6d8;
            }

            .dark .text-surface-variant\/50 {
              color: rgba(194, 198, 216, 0.55);
            }

            .dark .hover\:text-primary:hover {
              color: #b3c5ff;
            }

            .fade-in {
              animation: fadeIn 0.8s ease-out forwards;
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
        }}
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-surface p-4 sm:p-6 lg:p-8">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant/50 bg-surface-container-lowest text-on-surface shadow-lg transition-all hover:bg-surface-container-low active:scale-95"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: '"wght" 500' }}
          >
            {dark ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <main
          className="
    mx-auto
    w-full
    max-w-[1600px]
    min-h-screen
    overflow-hidden
    rounded-none
    bg-surface-container-lowest

    sm:min-h-[calc(100vh-32px)]
    sm:rounded-2xl
    sm:shadow-2xl

    grid
    grid-cols-1
    lg:grid-cols-12
  "
        >
          {/* ========================================================= */}
          {/* LEFT / BRANDING SECTION                                   */}
          {/* ========================================================= */}

          <section
            className="
      relative
      overflow-hidden
      bg-on-surface

      lg:col-span-8

      flex
      min-h-[650px]
      flex-col
      justify-between

      px-6
      py-8

      sm:px-8
      sm:py-10

      lg:px-12
      lg:py-14

      xl:px-16
      xl:py-14
    "
          >
            {/* Background Image */}
            <div
              className="
        pointer-events-none
        absolute
        inset-0
        bg-cover
        bg-center
        opacity-10
        mix-blend-overlay
      "
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuIRKMWMfD4aNYuw_SNPNJu_4Qum4fDhN7eE_xXiLKkGAhLP9QEkyHAxDiihdX7wSs9Y0LtiJ5MHOr9IAeVJ6MW0Iq1T7VI6aT_E5ENo4f-xw6DkZBmj4_uJ4_DEFMfM_9ozLkXbMiZtuqoWSKsLbl05YcWppo3Ib3_rlyg8OIFvTXxzgholST5iOuFUpTWw56j9ufJIfRcqqwVeqaMzq7uTxx8zIFjD79bq4BX8j4cBvW7eGm896")',
              }}
            />

            {/* Dark overlay */}
            <div
              className="
        pointer-events-none
        absolute
        inset-0
        bg-gradient-to-br
        from-[#07182b]/20
        via-transparent
        to-[#061528]/30
      "
            />

            {/* ========================================================= */}
            {/* BRAND HEADER                                             */}
            {/* ========================================================= */}

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <span
                  className="
            material-symbols-outlined
            text-primary-fixed-dim
            text-[28px]
            sm:text-[30px]
            lg:text-[32px]
          "
                  style={{
                    fontVariationSettings: '"FILL" 1',
                  }}
                >
                  analytics
                </span>

                <span
                  className="
                  font-headline-md
                  text-headline-md
                  text-surface
                  text-xl
                  font-bold
                  sm:text-2xl "
                >
                  WealthFlow
                </span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* VALUE PROPOSITION                                        */}
            {/* ========================================================= */}

            <div
              className="
        relative
        z-10

        mt-16
        max-w-3xl

        sm:mt-20
        lg:mt-0
      "
            >
              <h1
                className="
          max-w-3xl
          font-headline-xl
          text-surface
          font-semibold
          leading-[1.15]
          tracking-[-0.02em]

          text-4xl
          sm:text-5xl
          lg:text-6xl
          xl:text-[64px]
        "
              >
                Elevate your financial trajectory with{" "}
                <span className="text-primary-fixed-dim">
                  precision analytics.
                </span>
              </h1>

              <p
                className="
          mt-8
          max-w-3xl
          font-body-lg
          text-surface-variant/80
          text-base
          leading-relaxed

          sm:text-lg
          lg:text-xl
        "
              >
                Experience the next generation of asset management. Real-time
                insights, automated forecasting, and institutional-grade
                security for the modern investor.
              </p>

              {/* ========================================================= */}
              {/* METRICS                                                  */}
              {/* ========================================================= */}

              <div
                className="
          mt-10
          grid
          grid-cols-3
          gap-4

          border-t
          border-outline-variant/20
          pt-8

          sm:mt-12
          sm:gap-8
          sm:pt-10

          lg:max-w-3xl
        "
              >
                {/* Metric 1 */}
                <div>
                  <div
                    className="
              font-headline-md
              text-surface
              text-2xl
              font-bold

              sm:text-3xl
            "
                  >
                    1.2s
                  </div>

                  <div
                    className="
              mt-1
              font-label-md
              text-surface-variant
              text-[10px]
              uppercase
              leading-tight
              tracking-widest

              sm:text-xs
            "
                  >
                    Real-time latency
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div
                    className="
              font-headline-md
              text-surface
              text-2xl
              font-bold

              sm:text-3xl
            "
                  >
                    99.9%
                  </div>

                  <div
                    className="
              mt-1
              font-label-md
              text-surface-variant
              text-[10px]
              uppercase
              leading-tight
              tracking-widest

              sm:text-xs
            "
                  >
                    Uptime reliability
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div
                    className="
              font-headline-md
              text-surface
              text-2xl
              font-bold

              sm:text-3xl
            "
                  >
                    256-bit
                  </div>

                  <div
                    className="
              mt-1
              font-label-md
              text-surface-variant
              text-[10px]
              uppercase
              leading-tight
              tracking-widest

              sm:text-xs
            "
                  >
                    Quantum encryption
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* FOOTER                                                    */}
            {/* ========================================================= */}

            <div
              className="
        relative
        z-10
        mt-16
      "
            >
              <p
                className="
          font-body-sm
          text-surface-variant/50
          text-xs
          leading-relaxed
        "
              >
                © 2024 WealthFlow AI. Precision in every penny. Trusted by over
                50,000 professionals globally.
              </p>
            </div>
          </section>

          {/* ========================================================= */}
          {/* RIGHT / AUTH SECTION                                     */}
          {/* ========================================================= */}

          <section
            className="
      bg-surface

      lg:col-span-4

      flex
      min-h-[650px]
      flex-col
      justify-center

      border-t
      border-outline-variant/10

      px-6
      py-10

      sm:px-10
      sm:py-12

      lg:border-l
      lg:border-t-0
      lg:px-10
      xl:px-12
    "
          >
            <div
              className="
        mx-auto
        w-full
        max-w-[440px]
      "
            >
              {/* ======================================================= */}
              {/* AUTH TABS                                               */}
              {/* ======================================================= */}

              <div
                className="
          mb-10
          flex
          gap-8
          border-b
          border-outline-variant/30
        "
              >
                <button
                  type="button"
                  className={`
            pb-4
            font-label-md
            text-label-md
            transition-all
            cursor-pointer

            ${
              !isSignup
                ? "auth-tab-active"
                : "text-on-surface-variant hover:text-primary"
            }
          `}
                  onClick={() => {
                    setAuthMode("login");
                    setError("");
                  }}
                >
                  Log In
                </button>

                <button
                  type="button"
                  className={`
            pb-4
            font-label-md
            text-label-md
            transition-all
            cursor-pointer

            ${
              isSignup
                ? "auth-tab-active"
                : "text-on-surface-variant hover:text-primary"
            }
          `}
                  onClick={() => {
                    setAuthMode("signup");
                    setError("");
                  }}
                >
                  Create Account
                </button>
              </div>

              {/* ======================================================= */}
              {/* AUTH CONTENT                                            */}
              {/* ======================================================= */}

              <div id="auth-content">
                {/* Heading */}
                <div className="mb-8">
                  <h2
                    className="
              font-headline-md
              text-on-surface
              text-2xl
              font-bold
              leading-tight
            "
                  >
                    {isSignup ? "Start your journey" : "Welcome back"}
                  </h2>

                  <p
                    className="
              mt-2
              font-body-sm
              text-on-surface-variant
              text-base
              leading-relaxed
            "
                  >
                    {isSignup
                      ? "Join the elite circle of data-driven investors."
                      : "Enter your credentials to access your terminal."}
                  </p>
                </div>

                {error && (
                  <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error-container/20 p-md">
                    <span className="material-symbols-outlined text-error text-[20px]">
                      error
                    </span>
                    <span className="font-body-sm text-body-sm text-error leading-relaxed">
                      {error}
                    </span>
                  </div>
                )}

                {/* ===================================================== */}
                {/* SOCIAL AUTH                                           */}
                {/* ===================================================== */}

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Google */}
                  <button
                    type="button"
                    className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-outline-variant/50
              bg-surface-container-lowest
              px-4
              font-label-md
              text-label-md
              text-on-surface
              transition-all
              hover:bg-surface-container-low
              active:scale-[0.98]
            "
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-1.92 5.4-7.84 5.4-5.12 0-9.28-4.24-9.28-9.52S7.36 1.12 12.48 1.12c2.92 0 4.88 1.24 6 2.32l2.6-2.6C19.4 1.04 16.24 0 12.48 0 5.56 0 0 5.56 0 12.5s5.56 12.5 12.48 12.5c7.24 0 12.04-5.08 12.04-12.24 0-.84-.08-1.48-.2-2.24h-11.84z"
                        fill="#EA4335"
                      />
                    </svg>

                    <span>Google</span>
                  </button>

                  {/* Apple */}
                  <button
                    type="button"
                    className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-outline-variant/50
              bg-surface-container-lowest
              px-4
              font-label-md
              text-label-md
              text-on-surface
              transition-all
              hover:bg-surface-container-low
              active:scale-[0.98]
            "
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.05 20.28c-.96.95-2.21 1.72-3.71 1.72-2.3 0-4.04-1.57-5.32-3.57-1.44-2.24-2.18-5.35-2.18-7.79 0-2.43.76-4.73 2.21-6.4 1.28-1.5 2.92-2.31 4.71-2.31 1.34 0 2.45.64 3.4 1.22.84.52 1.95 1.25 3.3 1.25 1.35 0 2.46-.73 3.3-1.25.95-.58 2.06-1.22 3.4-1.22 1.79 0 3.43.81 4.71 2.31 1.45 1.67 2.21 3.97 2.21 6.4 0 2.44-.74 5.55-2.18 7.79-1.28 2-3.02 3.57-5.32 3.57-1.5 0-2.75-.77-3.71-1.72-.92-.92-2.09-2.13-3.66-2.13-1.57 0-2.74 1.21-3.66 2.13z" />
                    </svg>

                    <span>Apple</span>
                  </button>
                </div>

                {/* ===================================================== */}
                {/* DIVIDER                                               */}
                {/* ===================================================== */}

                <div className="relative mb-8 flex items-center">
                  <div className="flex-1 border-t border-outline-variant/30" />

                  <span
                    className="
              bg-surface
              px-4
              font-label-md
              text-label-md
              text-on-surface-variant
            "
                  >
                    or use email
                  </span>

                  <div className="flex-1 border-t border-outline-variant/30" />
                </div>

                {/* ===================================================== */}
                {/* FORM                                                  */}
                {/* ===================================================== */}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Signup: Full Name */}
                  {isSignup && (
                    <div>
                      <label
                        className="
                  mb-2
                  block
                  font-label-md
                  text-label-md
                  text-on-surface
                "
                        htmlFor="name"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="
                  input-focus-ring
                  h-12
                  w-full
                  rounded-lg
                  border
                  border-outline-variant/50
                  bg-surface-container-lowest
                  px-4
                  font-body-sm
                  text-body-sm
                  text-on-surface
                  transition-all
                  placeholder:text-on-surface-variant/50
                "
                      />
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label
                      className="
                mb-2
                block
                font-label-md
                text-label-md
                text-on-surface
              "
                      htmlFor="email"
                    >
                      Professional Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      className="
                input-focus-ring
                h-12
                w-full
                rounded-lg
                border
                border-outline-variant/50
                bg-surface-container-lowest
                px-4
                font-body-sm
                text-body-sm
                text-on-surface
                transition-all
                placeholder:text-on-surface-variant/50
              "
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        className="
                  block
                  font-label-md
                  text-label-md
                  text-on-surface
                "
                        htmlFor="password"
                      >
                        Password
                      </label>

                      {!isSignup && (
                        <a
                          href="#"
                          className="
                    font-label-md
                    text-label-md
                    text-primary
                    hover:underline
                  "
                        >
                          Forgot?
                        </a>
                      )}
                    </div>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete={
                        isSignup ? "new-password" : "current-password"
                      }
                      required
                      minLength={isSignup ? 6 : undefined}
                      className="
                input-focus-ring
                h-12
                w-full
                rounded-lg
                border
                border-outline-variant/50
                bg-surface-container-lowest
                px-4
                font-body-sm
                text-body-sm
                text-on-surface
                transition-all
                placeholder:text-on-surface-variant/50
              "
                    />
                  </div>

                  {/* Signup Fields */}
                  {isSignup && (
                    <div>
                      <div className="flex items-start gap-3">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          className="
                    mt-1
                    h-4
                    w-4
                    shrink-0
                    rounded
                    border-outline-variant
                    text-primary
                    focus:ring-primary
                  "
                        />

                        <label
                          className="
                    font-body-sm
                    text-body-sm
                    leading-relaxed
                    text-on-surface-variant
                  "
                          htmlFor="terms"
                        >
                          I agree to{" "}
                          <a href="#" className="text-primary hover:underline">
                            Security Standards
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary hover:underline">
                            Terms of Service
                          </a>
                          .
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
              h-[72px]
              w-full
              rounded-lg
              bg-primary
              px-4
              font-headline-md
              text-body-md
              font-bold
              text-on-primary
              shadow-lg
              shadow-primary/10
              transition-all
              hover:bg-primary-container
              active:scale-[0.98]
              focus:outline-none
              focus:ring-4
              focus:ring-primary/10
              disabled:opacity-50

              sm:h-16
            "
                  >
                    {loading
                      ? isSignup
                        ? "Creating account..."
                        : "Signing in..."
                      : isSignup
                        ? "Create Account"
                        : "Sign In"}
                  </button>
                </form>

                {/* ===================================================== */}
                {/* BOTTOM TOGGLE                                         */}
                {/* ===================================================== */}

                <div
                  className="
            mt-10
            border-t
            border-outline-variant/30
            pt-8
            text-center
          "
                >
                  <p
                    className="
              font-body-sm
              text-body-sm
              text-on-surface-variant
            "
                  >
                    {isSignup ? (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          className="font-bold text-primary hover:underline"
                          onClick={() => {
                            setAuthMode("login");
                            setError("");
                          }}
                        >
                          Log in
                        </button>
                      </>
                    ) : (
                      <>
                        New to WealthFlow?{" "}
                        <button
                          type="button"
                          className="font-bold text-primary hover:underline"
                          onClick={() => {
                            setAuthMode("signup");
                            setError("");
                          }}
                        >
                          Create an account
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
