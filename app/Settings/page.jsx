export default function Settings() {
  return (
    <>
      <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      body {\n        font-family: "Geist", sans-serif;\n      }\n      .material-symbols-outlined {\n        font-variation-settings:\n          "FILL" 0,\n          "wght" 400,\n          "GRAD" 0,\n          "opsz" 24;\n        vertical-align: middle;\n      }\n      .settings-scroll {\n        scroll-behavior: smooth;\n      }\n      .glass-panel {\n        background: rgba(255, 255, 255, 0.8);\n        backdrop-filter: blur(12px);\n        border: 1px solid rgba(114, 118, 135, 0.1);\n      }\n    ',
          }}
        />
        {/* Sidebar Navigation */}
        {/* <aside className="fixed left-0 top-0 h-full w-60 bg-surface-container-low dark:bg-inverse-surface border-r border-outline-variant dark:border-outline flex flex-col z-50">
          <div className="p-lg flex flex-col gap-xs">
            <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary tracking-tight">
              WealthFlow
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
              Premium Finance
            </p>
          </div>
          <nav className="flex-1 px-md py-sm space-y-1">
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                dashboard
              </span>
              Dashboard
            </a>
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                receipt_long
              </span>
              Transactions
            </a>
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                account_balance
              </span>
              Accounts
            </a>
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                account_balance_wallet
              </span>
              Budgets
            </a>
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                ads_click
              </span>
              Goals
            </a>
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                bar_chart
              </span>
              Reports
            </a>
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                psychology
              </span>
              AI Insights
            </a>
          </nav>
          <div className="mt-auto p-md space-y-1">
            <a
              className="flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-primary dark:text-inverse-primary font-bold bg-surface-variant/50"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                settings
              </span>
              Settings
            </a>
            <button className="w-full flex items-center gap-sm px-md py-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                contrast
              </span>
              Theme
            </button>
            <div className="pt-md mt-sm border-t border-outline-variant flex items-center gap-sm">
              <img
                className="w-8 h-8 rounded-full object-cover"
                data-alt="A professional headshot of a senior financial analyst in a modern office, soft bokeh background with natural lighting, corporate minimalist style, neutral tones."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGl91ZyJH-93vEl1MY310EO1lx92EKyfnfa89LZ7DLcQVLeJNgvQkhHxUJTA84RHua39PLnaNyfQmfesMVpTCFIdaX-ca7L8E6QqyRWoM88S2UEAqx3WEJcdLmtqZPwARImv22Snk_-vIk9fwq4nHwf0cWOIvxxb6kVaPgVnD0TBoF6mNkB_N-Aj577hfMmJAFiXgkLYqKrNS-6k1zaVC_zf7xaF_c9448cy2MTP3sPtRTm6YQc_Vo"
              />
              <div className="overflow-hidden">
                <p className="font-label-md text-label-md font-bold truncate">
                  Alex Sterling
                </p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold text-primary">
                  Premium Member
                </p>
              </div>
            </div>
          </div>
        </aside> */}
        {/* Main Content Area */}
        <main className="ml-60 min-h-screen">
          {/* Top Navbar */}
          <header className="sticky top-0 z-40 flex justify-between items-center w-full px-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
            <div className="flex items-center gap-md">
              {/* <h2 className="font-headline-md text-headline-md font-black text-primary">
                Settings
              </h2> */}
              <div className="h-6 w-[1px] bg-outline-variant mx-sm" />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                  search
                </span>
                <input
                  className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all w-64"
                  placeholder="Search settings..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-lg">
              <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
              </button>
              <button className="bg-primary text-on-primary px-md py-2 rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm">
                Quick Add
              </button>
            </div>
          </header>
          <div className="max-w-container-max mx-auto p-xl flex gap-xl">
            {/* Content Sidebar */}
            <nav className="w-64 flex-shrink-0 sticky top-24 self-start space-y-1">
              <a
                className="flex items-center justify-between group px-md py-sm rounded-lg hover:bg-surface-container transition-colors text-primary font-bold"
                href="#profile"
              >
                <span className="font-label-md">Profile</span>
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </a>
              <a
                className="flex items-center justify-between group px-md py-sm rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                href="#preferences"
              >
                <span className="font-label-md">Preferences</span>
                <span className="material-symbols-outlined text-[18px]">
                  tune
                </span>
              </a>
              <a
                className="flex items-center justify-between group px-md py-sm rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                href="#notifications"
              >
                <span className="font-label-md">Notifications</span>
                <span className="material-symbols-outlined text-[18px]">
                  notifications_active
                </span>
              </a>
              <a
                className="flex items-center justify-between group px-md py-sm rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                href="#security"
              >
                <span className="font-label-md">Security</span>
                <span className="material-symbols-outlined text-[18px]">
                  shield
                </span>
              </a>
              <a
                className="flex items-center justify-between group px-md py-sm rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                href="#data"
              >
                <span className="font-label-md">Data Management</span>
                <span className="material-symbols-outlined text-[18px]">
                  database
                </span>
              </a>
            </nav>
            {/* Settings Content */}
            <div className="flex-1 space-y-xl settings-scroll">
              {/* Profile Section */}
              <section
                className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
                id="profile"
              >
                <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">
                  Profile
                </h3>
                <div className="flex items-center gap-xl mb-lg">
                  <div className="relative group">
                    <img
                      className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-sm"
                      data-alt="A clean, professional studio portrait of a man with short hair wearing a navy blue blazer, high-end corporate photography style, bright minimalist background, sharp focus."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVtfTwxnGkRqocwLRsW7zs34SrW1Ow9DQdHvZcW5nDsSdillB3tbh3B4O7tuJoKU_7HK44Skl4V_WXTy2loKOLfXH7ntjNihnHhf_G69ktFES3IeX1W46uYRWLCQOpNtcmN6nBnr-VOd8ECgwRvn1CQMwO7gVIZa22Yjb1Q8GdHQ-z42tf0DUfSR5w2u5oYUVelJ81qXJuHp_dUKmUwme7SMF4z-I03GbDQHvKeGiBjXLrNfMu5Yux"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform">
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
                      Alex Sterling
                    </h4>
                    <p className="text-on-surface-variant font-body-sm opacity-70">
                      Member since January 2023
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-lg">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      className="w-full px-md py-2.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                      type="text"
                      defaultValue="Alex Sterling"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">
                      Email Address
                    </label>
                    <input
                      className="w-full px-md py-2.5 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                      type="email"
                      defaultValue="alex.sterling@wealthflow.com"
                    />
                  </div>
                </div>
                <div className="mt-lg pt-lg border-t border-outline-variant flex justify-end">
                  <button className="bg-primary text-on-primary px-xl py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all">
                    Save Changes
                  </button>
                </div>
              </section>
              {/* Preferences Section */}
              <section
                className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
                id="preferences"
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
                    <select className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
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
                    <select className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all">
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
                    <select className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md outline-none focus:border-primary transition-all">
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) UTC</option>
                    </select>
                  </div>
                </div>
              </section>
              {/* Notifications Section */}
              <section
                className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
                id="notifications"
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
                  {/* Notification Item */}
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
                          defaultChecked=""
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-10 h-5 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                        <input
                          defaultChecked=""
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-10 h-5 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </div>
                  </div>
                  {/* Notification Item */}
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
                          defaultChecked=""
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-10 h-5 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-10 h-5 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </div>
                  </div>
                  {/* Notification Item */}
                  <div className="flex items-center justify-between py-md">
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">
                        Monthly Financial Reports
                      </p>
                      <p className="text-on-surface-variant text-body-sm">
                        A deep dive into your spending habits delivered every
                        1st.
                      </p>
                    </div>
                    <div className="flex gap-lg">
                      <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                        <input
                          defaultChecked=""
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-10 h-5 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer w-12 justify-center">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-10 h-5 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              {/* Security Section */}
              <section
                className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl"
                id="security"
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
                    <button className="px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors">
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
                    <button className="text-error font-label-md text-label-md hover:underline">
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
                        <button className="text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[20px]">
                            logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Data Management Section */}
              <section
                className="p-lg bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
                id="data"
              >
                <h3 className="font-headline-md text-headline-md font-bold mb-md text-on-surface">
                  Data Management
                </h3>
                <div className="flex flex-col gap-md">
                  <div className="p-lg border border-outline-variant rounded-lg bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-md">
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
                    <div className="flex gap-sm">
                      <button className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center gap-xs">
                        CSV
                      </button>
                      <button className="px-md py-2 bg-surface-container-low text-on-surface border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center gap-xs">
                        JSON
                      </button>
                    </div>
                  </div>
                  <div className="p-lg border border-error/30 bg-error-container/10 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-label-md text-label-md font-bold text-error">
                        Delete Account
                      </p>
                      <p className="text-on-surface-variant text-body-sm">
                        Permanently remove your account and all associated data.
                        This cannot be undone.
                      </p>
                    </div>
                    <button className="px-md py-2 bg-error text-on-error rounded-lg font-label-md text-label-md hover:opacity-90 transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </section>
              {/* Footer spacer */}
              <div className="h-xl" />
            </div>
          </div>
        </main>
      </>
    </>
  );
}
