export default function Report() {
  return (
    <>
      <>
        {/* Main Content */}
        <main className="ml-60 min-h-screen">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 flex justify-between items-center w-full px-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant">
            <div className="flex items-center gap-md flex-1">
              <div className="relative w-full max-w-[480px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Search goals or metrics..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-lg">
              <a href="/Quickadd" className="bg-primary text-on-primary px-md py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-sm active:scale-95">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                Quick Add
              </a>
              <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A professional studio headshot of a financial executive, clean high-key lighting, soft neutral background, wearing a charcoal suit. The style is polished, high-end corporate minimalism, reflecting trust and expertise in a premium wealth management environment."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqsFYw9n19KwcxpYuXoPIsUrh0vZ8RVuJY0HxCjdxKMWlDhlem0WL2AO0n4r7FQrR5rp2hn3EovvYVud-zI0hDe45xRHZRa9-4PQdropy7dlKF15U99TwHTPuD0IQb6ubLZh3S1iX2fx_FslLKrdmHDN11YZitd32bPUS_uUm10I6ybwRBKyoC2nvMRb2hi3rzva-EJE8wqUKiB90-JAvkp7qDqN8z128GUTPSsHQ2k1SpBEJKezio"
                />
              </div>
            </div>
          </header>
          <div className="p-xl max-w-container-max mx-auto space-y-xl">
            {/* Hero Header Section */}
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Financial Intelligence
                </h2>
                <p className="font-body-md text-body-md text-outline">
                  Deep dive into your spending, cash flow, and net worth
                  trajectory.
                </p>
              </div>
              <div className="flex gap-sm">
                <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    picture_as_pdf
                  </span>
                  PDF
                </button>
                <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    csv
                  </span>
                  CSV
                </button>
                <button className="flex items-center gap-sm px-md py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    table_view
                  </span>
                  Excel
                </button>
              </div>
            </div>
            {/* Dashboard Bento Grid */}
            <div className="grid grid-cols-12 gap-gutter">
              {/* Section 3: Net Worth Growth (Spans 8 columns) */}
              <div className="col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Net Worth Growth
                  </h3>
                  <select className="bg-transparent font-label-md text-label-md text-outline focus:outline-none cursor-pointer">
                    <option>Last 12 Months</option>
                    <option>Last 3 Years</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="h-64 relative w-full flex items-end justify-between px-md border-b border-outline-variant/30 group">
                  {/* Simulated Line Chart with SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 800 240"
                  >
                    <path
                      d="M0,200 L80,180 L160,190 L240,150 L320,140 L400,100 L480,110 L560,70 L640,60 L720,30 L800,40"
                      fill="none"
                      stroke="#0050cb"
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M0,200 L80,180 L160,190 L240,150 L320,140 L400,100 L480,110 L560,70 L640,60 L720,30 L800,40 V240 H0 Z"
                      fill="url(#gradient-line)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient
                        id="gradient-line"
                        x1={0}
                        x2={0}
                        y1={0}
                        y2={1}
                      >
                        <stop offset="0%" stopColor="#0050cb" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Tooltip interaction */}
                  <div className="absolute left-[70%] top-[20%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-on-surface text-surface px-md py-sm rounded-lg glass-panel shadow-xl">
                      <p className="text-label-md font-bold">$1,240,500.00</p>
                      <p className="text-[10px] opacity-70 uppercase tracking-widest">
                        October 2023
                      </p>
                    </div>
                  </div>
                  {/* X-Axis Labels */}
                  <div className="absolute bottom-[-24px] left-0 w-full flex justify-between font-mono-data text-[10px] text-outline px-md">
                    <span>JAN</span>
                    <span>MAR</span>
                    <span>MAY</span>
                    <span>JUL</span>
                    <span>SEP</span>
                    <span>NOV</span>
                  </div>
                </div>
              </div>
              {/* Section 1: Spending by Category (Spans 4 columns) */}
              <div className="col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Spending by Category
                </h3>
                <div className="flex flex-col items-center justify-center space-y-md">
                  {/* Donut Chart */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5eeff"
                        strokeWidth={3}
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#0050cb"
                        strokeDasharray="45, 100"
                        strokeWidth={3}
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#006c49"
                        strokeDasharray="25, 100"
                        strokeDashoffset={-45}
                        strokeWidth={3}
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#cc4204"
                        strokeDasharray="15, 100"
                        strokeDashoffset={-70}
                        strokeWidth={3}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-headline-md text-headline-md text-on-surface">
                        $8,432
                      </span>
                      <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                        Total
                      </span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="w-full space-y-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          Housing
                        </span>
                      </div>
                      <span className="font-mono-data text-label-md text-on-surface">
                        45%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          Investments
                        </span>
                      </div>
                      <span className="font-mono-data text-label-md text-on-surface">
                        25%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          Lifestyle
                        </span>
                      </div>
                      <span className="font-mono-data text-label-md text-on-surface">
                        15%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 2: Monthly Cash Flow (Spans Full Width for emphasis) */}
              <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg space-y-lg transition-all hover:shadow-[0_20px_50px_rgba(0,102,255,0.05)]">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      Monthly Cash Flow
                    </h3>
                    <p className="font-label-md text-label-md text-outline">
                      Income vs Expenses over the current fiscal year
                    </p>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="flex items-center gap-sm">
                      <span className="w-3 h-3 bg-primary rounded-sm" />
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Inflow
                      </span>
                    </div>
                    <div className="flex items-center gap-sm">
                      <span className="w-3 h-3 bg-surface-container-highest rounded-sm" />
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Outflow
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-64 w-full flex items-end justify-between pt-xl px-md gap-4">
                  {/* Bar chart items */}
                  {/* Jan */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[70%] transition-all duration-300 group-hover:h-[75%]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[40%] transition-all duration-300 group-hover:h-[45%]" />
                    </div>
                    <span className="font-label-md text-label-md text-outline">
                      JAN
                    </span>
                  </div>
                  {/* Feb */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[80%] transition-all duration-300 group-hover:h-[85%]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[50%] transition-all duration-300 group-hover:h-[55%]" />
                    </div>
                    <span className="font-label-md text-label-md text-outline">
                      FEB
                    </span>
                  </div>
                  {/* Mar */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[65%] transition-all duration-300 group-hover:h-[70%]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[60%] transition-all duration-300 group-hover:h-[65%]" />
                    </div>
                    <span className="font-label-md text-label-md text-outline">
                      MAR
                    </span>
                  </div>
                  {/* Apr */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[90%] transition-all duration-300 group-hover:h-[95%]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[30%] transition-all duration-300 group-hover:h-[35%]" />
                    </div>
                    <span className="font-label-md text-label-md text-outline">
                      APR
                    </span>
                  </div>
                  {/* May */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[75%] transition-all duration-300 group-hover:h-[80%]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[45%] transition-all duration-300 group-hover:h-[50%]" />
                    </div>
                    <span className="font-label-md text-label-md text-outline">
                      MAY
                    </span>
                  </div>
                  {/* Jun */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[85%] transition-all duration-300 group-hover:h-[90%]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[55%] transition-all duration-300 group-hover:h-[60%]" />
                    </div>
                    <span className="font-label-md text-label-md text-outline">
                      JUN
                    </span>
                  </div>
                  {/* Jul (Active/Current) */}
                  <div className="flex-1 flex flex-col items-center gap-sm group relative">
                    <div className="w-full flex justify-center gap-1 items-end h-48">
                      <div className="w-1/3 bg-primary rounded-t-sm h-[95%] shadow-[0_0_15px_rgba(0,102,255,0.2)]" />
                      <div className="w-1/3 bg-surface-container-highest rounded-t-sm h-[20%]" />
                    </div>
                    <span className="font-label-md text-label-md text-primary font-bold">
                      JUL
                    </span>
                    {/* Value Label on Hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all text-mono-data text-xs bg-on-surface text-surface px-2 py-1 rounded shadow-lg pointer-events-none">
                      +$12.4k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sticky Footer Summary */}
          <footer className="mt-xl border-t border-outline-variant bg-surface-container-low/50 py-lg px-xl">
            <div className="max-w-container-max mx-auto flex justify-between items-center">
              <div className="flex gap-xl">
                <div className="space-y-base">
                  <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    Net Cash Flow
                  </p>
                  <p className="font-headline-md text-headline-md text-secondary">
                    +$14,230.12
                  </p>
                </div>
                <div className="space-y-base">
                  <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    Projected EOY
                  </p>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    $1,350,000.00
                  </p>
                </div>
              </div>
              <button className="bg-primary-container text-on-primary-container px-lg py-3 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all">
                View Comprehensive Tax Report
              </button>
            </div>
          </footer>
        </main>
        {/* Micro-interaction Scripts */}
      </>
    </>
  );
}
