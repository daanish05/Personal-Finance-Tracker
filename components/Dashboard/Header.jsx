export default function Header() {
  return (
    <>
      {/* <header className="h-16 flex items-center justify-between px-xl sticky top-0 z-40 bg-surface/80 backdrop-blur-md"> */}
      <header
        className=" sticky top-0 z-40 flex justify-between items-center w-full px-lg py-md bg-surface/80 backdrop-blur-md border-b border-outline-variant" >
        {/* className=" sticky top-0 z-40 h-16 flex items-center justify-between px-8 bg-white/75 backdrop-blur-xl border-b border-slate-200/80 shadow-sm" > */}
        {/* <div className="flex items-center bg-surface-container-low border border-outline-variant/50 rounded-lg px-md h-10 w-96 gap-sm">
          <span className="material-symbols-outlined text-outline text-[20px] leading-none">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder:text-outline/60 h-full outline-none"
            placeholder="Search transactions, accounts..."
            type="text"
          />
        </div> */}
        <div className="flex items-center gap-md flex-1">
          <div className="relative w-full max-w-[480px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 font-body-sm text-body-sm focus:ring-2 focus:ring-primary/10 transition-all"
              placeholder="Search, accounts, transactions..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-lg">
          <button className="relative text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">
              notifications
            </span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface" />
          </button>
          <div className="h-8 w-[1px] bg-outline-variant/50" />

          <a
            href="/Quickadd"
            className="flex items-center gap-sm bg-primary text-on-primary px-lg py-2 rounded-lg font-label-md hover:opacity-90 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Quick Add
          </a>
          <div className="flex items-center gap-sm cursor-pointer group">
            <div className="text-right">
              <p className="font-label-md text-on-surface font-bold">
                Alex Sterling
              </p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                Premium Member
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-surface-variant overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="User avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDobLtNGEJ9IlwFaTG64cOqzLMgyQePG3ljFEKoYSOmT1LecjsBWpoWXkhYWfS3eF0MORWzGqohppjalpUGIxaboO5CdZoT6WQGEYhqBo0-iAlgyBvo3AagJVqaJ_VCuzZTXu-RFDVpxm47wFZJsSORT3ajmchqpydg2gQ63j5WDI63IUlDH-VT-7JuqqJaHES_hEFARM9ecXDl63vx7JxIoGVRUOri4B2s_kPN426fU5YbsvNo2uk6"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
