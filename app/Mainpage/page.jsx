

export default function Mainpage() {
  return (
    <>
      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n      }\n      body {\n        font-family: "Geist", sans-serif;\n        background-color: #f8f9ff;\n      }\n      .glass-effect {\n        background: rgba(255, 255, 255, 0.8);\n        backdrop-filter: blur(12px);\n        border: 1px solid rgba(255, 255, 255, 0.3);\n      }\n      .auth-tab-active {\n        color: #0050cb;\n        border-bottom: 2px solid #0050cb;\n      }\n      .input-focus-ring:focus {\n        outline: none;\n        border-color: #0066ff;\n        box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);\n      }\n      .fade-in {\n        animation: fadeIn 0.8s ease-out forwards;\n      }\n      @keyframes fadeIn {\n        from {\n          opacity: 0;\n          transform: translateY(10px);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0);\n        }\n      }\n    ',
          }}
        />
        {/* Background Shader */}
        <main className="w-full max-w-container-max min-h-[90vh] grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-surface-container-lowest shadow-2xl rounded-xl relative">
          {/* Branding Section (Left) */}
          <section className="md:col-span-7 lg:col-span-8 p-xl flex flex-col justify-between relative overflow-hidden bg-on-surface">
            {/* Subtle Overlay Image */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
              data-alt="A sophisticated macro shot of abstract crystalline structures and data nodes interlocking, rendered in a professional deep navy and electric blue color palette. The lighting is cold and precise, reflecting a high-end corporate financial environment. The composition focuses on geometric harmony and clean lines, reinforcing the brand's message of precision and technological advancement."
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuIRKMWMfD4aNYuw_SNPNJu_4Qum4fDhN7eE_xXiLKkGAhLP9QEkyHAxDiihdX7wSs9Y0LtiJ5MHOr9IAeVJ6MW0Iq1T7VI6aT_E5ENo4f-xw6DkZBmj4_uJ4_DEFMfM_9ozLkXbMiZtuqoWSKsLbl05YcWppo3Ib3_rlyg8OIFvTXxzgholST5iOuFUpTWw56j9ufJIfRcqqwVeqaMzq7uTxx8zIFjD79bq4BX8j4cBvW7eGm896")',
              }}
            />
            {/* Brand Header */}
            <div className="z-10">
              <div className="flex items-center gap-sm">
                <span
                  className="material-symbols-outlined text-primary-fixed-dim text-[32px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  analytics
                </span>
                <span className="font-headline-md text-headline-md font-bold text-surface">
                  WealthFlow
                </span>
              </div>
            </div>
            {/* Value Proposition */}
            <div className="z-10 max-w-xl">
              <h1 className="font-headline-xl text-headline-xl text-surface mb-lg leading-tight">
                Elevate your financial trajectory with
                <span className="text-primary-fixed-dim">
                  precision analytics.
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-surface-variant/80 mb-xl">
                Experience the next generation of asset management. Real-time
                insights, automated forecasting, and institutional-grade
                security for the modern investor.
              </p>
              <div className="flex gap-lg mt-xl border-t border-outline-variant/20 pt-xl">
                <div>
                  <div className="font-headline-md text-headline-md text-surface font-bold">
                    1.2s
                  </div>
                  <div className="font-label-md text-label-md text-surface-variant uppercase tracking-widest">
                    Real-time latency
                  </div>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-surface font-bold">
                    99.9%
                  </div>
                  <div className="font-label-md text-label-md text-surface-variant uppercase tracking-widest">
                    Uptime reliability
                  </div>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md text-surface font-bold">
                    256-bit
                  </div>
                  <div className="font-label-md text-label-md text-surface-variant uppercase tracking-widest">
                    Quantum encryption
                  </div>
                </div>
              </div>
            </div>
            {/* Footer Quote */}
            <div className="z-10">
              <p className="font-body-sm text-body-sm text-surface-variant/50">
                © 2024 WealthFlow AI. Precision in every penny. Trusted by over
                50,000 professionals globally.
              </p>
            </div>
          </section>
          {/* Auth Section (Right) */}
          <section className="md:col-span-5 lg:col-span-4 bg-surface p-xl flex flex-col justify-center border-l border-outline-variant/10">
            <div className="w-full max-w-sm mx-auto fade-in">
              {/* Auth Toggle Tabs */}
              <div className="flex gap-lg mb-xl border-b border-outline-variant/30">
                <button
                  className="pb-md font-label-md text-label-md auth-tab-active transition-all cursor-pointer"
                  id="tab-login"
                  onclick="switchAuth('login')"
                >
                  Log In
                </button>
                <button
                  className="pb-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                  id="tab-signup"
                  onclick="switchAuth('signup')"
                >
                  Create Account
                </button>
              </div>
              <div id="auth-content">
                <h2
                  className="font-headline-md text-headline-md text-on-surface font-bold mb-sm"
                  id="auth-title"
                >
                  Welcome back
                </h2>
                <p
                  className="font-body-sm text-body-sm text-on-surface-variant mb-lg"
                  id="auth-subtitle"
                >
                  Enter your credentials to access your terminal.
                </p>
                {/* Social Auth */}
                <div className="grid grid-cols-2 gap-md mb-lg">
                  <button className="flex items-center justify-center gap-sm p-sm border border-outline-variant/50 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors font-label-md text-label-md text-on-surface">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-1.92 5.4-7.84 5.4-5.12 0-9.28-4.24-9.28-9.52S7.36 1.12 12.48 1.12c2.92 0 4.88 1.24 6 2.32l2.6-2.6C19.4 1.04 16.24 0 12.48 0 5.56 0 0 5.56 0 12.5s5.56 12.5 12.48 12.5c7.24 0 12.04-5.08 12.04-12.24 0-.84-.08-1.48-.2-2.24h-11.84z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-sm p-sm border border-outline-variant/50 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors font-label-md text-label-md text-on-surface">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.05 20.28c-.96.95-2.21 1.72-3.71 1.72-2.3 0-4.04-1.57-5.32-3.57-1.44-2.24-2.18-5.35-2.18-7.79 0-2.43.76-4.73 2.21-6.4 1.28-1.5 2.92-2.31 4.71-2.31 1.34 0 2.45.64 3.4 1.22.84.52 1.95 1.25 3.3 1.25 1.35 0 2.46-.73 3.3-1.25.95-.58 2.06-1.22 3.4-1.22 1.79 0 3.43.81 4.71 2.31 1.45 1.67 2.21 3.97 2.21 6.4 0 2.44-.74 5.55-2.18 7.79-1.28 2-3.02 3.57-5.32 3.57-1.5 0-2.75-.77-3.71-1.72-.92-.92-2.09-2.13-3.66-2.13-1.57 0-2.74 1.21-3.66 2.13z" />
                    </svg>
                    Apple
                  </button>
                </div>
                <div className="relative flex items-center justify-center mb-lg">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/30" />
                  </div>
                  <span className="relative bg-surface px-md font-label-md text-label-md text-on-surface-variant">
                    or use email
                  </span>
                </div>
                {/* Auth Form */}
                <form
                  className="space-y-lg"
                  id="auth-form"
                  onsubmit="event.preventDefault()"
                >
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface mb-xs"
                      htmlFor="email"
                    >
                      Professional Email
                    </label>
                    <input
                      className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface input-focus-ring transition-all"
                      id="email"
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-xs">
                      <label
                        className="block font-label-md text-label-md text-on-surface"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <a
                        className="font-label-md text-label-md text-primary hover:underline"
                        href="#"
                        id="forgot-password"
                      >
                        Forgot?
                      </a>
                    </div>
                    <input
                      className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface input-focus-ring transition-all"
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="hidden space-y-lg" id="signup-fields">
                    <div className="flex items-start gap-sm">
                      <input
                        className="mt-xs rounded text-primary focus:ring-primary border-outline-variant"
                        id="terms"
                        type="checkbox"
                      />
                      <label
                        className="font-body-sm text-body-sm text-on-surface-variant"
                        htmlFor="terms"
                      >
                        I agree to the
                        <a className="text-primary hover:underline" href="#">
                          Security Standards
                        </a>
                        and
                        <a className="text-primary hover:underline" href="#">
                          Terms of Service
                        </a>
                        .
                      </label>
                    </div>
                  </div>
                  <button
                    className="w-full py-md bg-primary text-on-primary font-headline-md text-body-md font-bold rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
                    id="submit-btn"
                  >
                    Sign In
                  </button>
                </form>
                <div className="mt-xl pt-lg border-t border-outline-variant/30 text-center">
                  <p
                    className="font-body-sm text-body-sm text-on-surface-variant"
                    id="toggle-hint"
                  >
                    New to WealthFlow?
                    <button
                      className="text-primary font-bold hover:underline"
                      onclick="switchAuth('signup')"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    </>
  );
}
