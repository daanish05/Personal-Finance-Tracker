"use client";
import { useState } from "react";
import Link from "next/link";

export default function EditProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const sectionMatches = (section) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.toLowerCase().includes(q) ||
      section.replace(/-/g, " ").toLowerCase().includes(q)
    );
  };
  return (
    <>
      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      body {\n        font-family: "Geist", sans-serif;\n      }\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n      }\n      input:focus,\n      textarea:focus {\n        outline: none;\n        border-color: #0066ff !important;\n        box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);\n      }\n      .custom-glass {\n        background: rgba(255, 255, 255, 0.8);\n        backdrop-filter: blur(12px);\n        border: 1px solid rgba(229, 238, 255, 0.5);\n      }\n    ',
          }}
        />
        {/* SideNavBar Anchor */}
        {/* <aside className="fixed left-0 top-0 h-full w-60 bg-surface-container-low border-r border-outline-variant flex flex-col z-50">
          <div className="px-lg py-xl">
            <span className="font-headline-md text-headline-md font-bold text-primary">
              WealthFlow
            </span>
            <p className="font-label-md text-label-md text-outline">
              Premium Finance
            </p>
          </div>
          <nav className="flex-1 px-md space-y-1">
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-md text-label-md">Dashboard</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="font-label-md text-label-md">Transactions</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">account_balance</span>
              <span className="font-label-md text-label-md">Accounts</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
              <span className="font-label-md text-label-md">Budgets</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">ads_click</span>
              <span className="font-label-md text-label-md">Goals</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">bar_chart</span>
              <span className="font-label-md text-label-md">Reports</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">psychology</span>
              <span className="font-label-md text-label-md">AI Insights</span>
            </a>
          </nav>
          <div className="px-md py-xl border-t border-outline-variant space-y-1">
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-primary font-bold bg-surface-variant"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </a>
            <a
              className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">contrast</span>
              <span className="font-label-md text-label-md">Theme</span>
            </a>
          </div>
        </aside> */}
        {/* TopNavBar Anchor
        <header className="fixed top-0 left-60 right-0 z-40 flex justify-between items-center px-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant max-w-[calc(100%-240px)]">
          <div className="flex items-center gap-lg flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 font-body-sm text-body-sm focus:border-primary transition-all"
                placeholder="Search wealth data..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-md">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
            </button>
            <button className="bg-primary text-white px-md py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
              Quick Add
            </button>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
              <img
                className="w-full h-full object-cover"
                data-alt="A professional headshot of a middle-aged executive with a confident smile, wearing a tailored navy blazer and white shirt. The background is a blurred high-end corporate office with soft, natural morning light coming through large windows. The overall aesthetic is clean, sharp, and reflects a high-status professional environment."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC2EHBbCBt4pTMTCh_UnqkCLQXxwbsX7mMwkcJ_xvEVg34U5p8jdmM5y8JkJkp73jJvWQc7nF8LOyxaPZGMScdinkUXCqZLruTwpg73-r-L5eytNmfDNHAFDC4xNCqTxxsi5l6cRAXAmSyC5sFT0DAdfgyTFITB6RNHdk8a7WFaznPuM3dKfIIRL2qIyDChIXOioIRtkIfkHgifzAuaNxv2busWstRJIDOyu2g3QHCDDk3aE7ZGm_D"
              />
            </div>
          </div>
        </header> */}
        <main className="ml-0 md:ml-60 min-h-screen">
          {/* Top Navbar */}
          <header className="sticky top-0 z-40 flex flex-wrap gap-y-2 justify-between items-center w-full px-lg pl-14 md:pl-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
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
                  // className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm border border-transparent
                  transition-all duration-200
                  hover:border-primary/40 hover:shadow-md
                  focus:ring-2 focus:ring-primary/10 focus:border-primary
                  outline-none"
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
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Quick Add
              </a>
            </div>
          </header>
          {/* Main Content Canvas */}
          <main className="ml-60 mt-20 p-xl min-h-screen">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumbs */}
              <nav className="mb-lg">
                <ol className="flex items-center gap-2 text-on-surface-variant">
                  <li>
                    <a
                      className="font-label-md text-label-md hover:text-primary transition-colors"
                      href="/Settings"
                    >
                      Profile
                    </a>
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
                  Manage your professional presence and personal wealth
                  identity.
                </p>
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
                {/* Profile Picture Management */}
                <section className="lg:col-span-4">
                  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg sticky top-24">
                    <h2 className="font-label-md text-label-md font-bold text-on-surface mb-md">
                      Profile Picture
                    </h2>
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high shadow-sm">
                          <img
                            className="w-full h-full object-cover"
                            data-alt="A close-up professional studio portrait of a business leader against a clean, off-white background. The person has a friendly but determined expression, with soft, directional lighting that creates subtle shadows and emphasizes the texture of their skin and clothes. The high-end minimal corporate vibe matches a premium fintech application aesthetic."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAZpI-9KaV3L-DrhomGLATSfLBFtGcOdgg8nmXPoETTcW--l6saVNG3w-vJHVNLzYQt1gv3pQqqpRiM_j0a9-89GD8aX2Ckzrd8lEtyHQdlJf_BMUwUFcYbEl_aa-ANp2nBUpXWYtsTpAR0SJHNwpTBp_jzbtu4kgmbgdL-4EaytyovJHx3m--V7HLqwIwazDZEuV5TlDr6YOlo7pQWHpZLBjL5ycalcGxl5YjldnMQsrIyGumE_Qy"
                          />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full border-2 border-surface hover:scale-110 transition-transform shadow-lg">
                          <span className="material-symbols-outlined text-[18px]">
                            photo_camera
                          </span>
                        </button>
                      </div>
                      <p className="mt-md font-body-sm text-body-sm text-outline text-center">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                      <div className="w-full mt-lg space-y-2">
                        <button className="w-full py-2 bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors border border-outline-variant">
                          Update Avatar
                        </button>
                        <button className="w-full py-2 text-error font-label-md text-label-md hover:bg-error-container/10 transition-colors rounded-lg">
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Personal Info Form */}
                <section className="lg:col-span-8 space-y-lg">
                  <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-xl">
                    <form className="space-y-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        {/* Full Name */}
                        <div className="space-y-base">
                          <label className="font-label-md text-label-md text-on-surface-variant block">
                            Full Name
                          </label>
                          <input
                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                            type="text"
                            defaultValue="Alexander Sterling"
                          />
                        </div>
                        {/* Email */}
                        <div className="space-y-base">
                          <label className="font-label-md text-label-md text-on-surface-variant block">
                            Email Address
                          </label>
                          <input
                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                            type="email"
                            defaultValue="alex.sterling@wealthflow.com"
                          />
                        </div>
                        {/* Phone */}
                        <div className="space-y-base">
                          <label className="font-label-md text-label-md text-on-surface-variant block">
                            Phone Number
                          </label>
                          <input
                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                            type="tel"
                            defaultValue="+1 (555) 012-3456"
                          />
                        </div>
                        {/* Location */}
                        <div className="space-y-base">
                          <label className="font-label-md text-label-md text-on-surface-variant block">
                            Location
                          </label>
                          <input
                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface"
                            type="text"
                            defaultValue="New York, NY"
                          />
                        </div>
                      </div>
                      {/* Bio */}
                      <div className="space-y-base">
                        <label className="font-label-md text-label-md text-on-surface-variant block">
                          Financial Bio &amp; Goals
                        </label>
                        <textarea
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md text-on-surface resize-none"
                          placeholder="Share your long-term investment philosophy or personal financial goals..."
                          rows={4}
                          defaultValue={
                            "Wealth strategist focusing on sustainable growth and diversified portolio management. Aiming for financial independence by 2030 through aggressive tech investments and real estate."
                          }
                        />
                      </div>
                      {/* Social Links */}
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
                                defaultValue="https://linkedin.com/in/asterling"
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
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Form Actions */}
                      <div className="flex items-center justify-end gap-md pt-xl border-t border-outline-variant mt-xl">
                        <button
                          className="px-xl py-3 border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-all"
                          type="button"
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
                  {/* Additional Security Note (Contextual Bento Item) */}
                  <div className="custom-glass rounded-xl p-lg border border-primary/10 flex items-start gap-lg">
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        verified_user
                      </span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md font-bold text-on-surface">
                        Privacy &amp; Security
                      </h4>
                      <p className="font-body-sm text-body-sm text-outline-variant mt-1">
                        Your personal information is encrypted and never shared
                        with third-party advisors without your explicit
                        permission.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
          {/* Success Toast Notification (Hidden by default) */}
          <div
            className="fixed bottom-lg right-lg translate-y-20 opacity-0 bg-inverse-surface text-inverse-on-surface px-lg py-md rounded-xl flex items-center gap-md shadow-2xl transition-all duration-300 z-[100]"
            id="toast"
          >
            <span className="material-symbols-outlined text-secondary-fixed">
              check_circle
            </span>
            <span className="font-label-md text-label-md">
              Profile updated successfully
            </span>

            <button className="ml-xl hover:opacity-70" onClick="hideToast()">
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
        </main>
      </>
    </>
  );
}
