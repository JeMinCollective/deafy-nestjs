import {
  Bell,
  Home,
  MessageCircle,
  Mic,
  Search,
  User,
  Volume2,
} from "lucide-react";

/** Decorative mock home screen for the hero phone frame (replace anytime). */
export function HeroMockAppPrimary() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-50 pt-11 text-[10px] leading-tight text-slate-900">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="ring-primary/30 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-violet-200 to-indigo-300 ring-2" />
          <div className="min-w-0">
            <p className="text-slate-500 truncate">Good morning</p>
            <p className="truncate font-semibold">Alex M.</p>
          </div>
        </div>
        <button
          type="button"
          className="text-slate-600 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-hidden px-3 pt-3 pb-1">
        <div className="from-primary/90 to-indigo-600 relative overflow-hidden rounded-2xl bg-gradient-to-br p-3 text-white shadow-md">
          <p className="text-[9px] font-medium opacity-90">Today</p>
          <p className="mt-1 text-xs font-bold leading-snug">
            Live captions & sign assist
          </p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="bg-white/20 flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm">
              <Volume2 className="h-7 w-7 opacity-95" />
            </div>
            <span className="text-[9px] opacity-80">Tap to start session</span>
          </div>
        </div>

        <div>
          <div className="text-slate-500 mb-1.5 flex items-center justify-between px-0.5">
            <span className="font-semibold text-slate-800">Quick actions</span>
          </div>
          <div className="flex gap-2 overflow-hidden">
            {["Meetings", "Practice", "History"].map((label) => (
              <div
                key={label}
                className="border-slate-200/80 shrink-0 rounded-xl border bg-white px-2.5 py-2 shadow-sm"
              >
                <p className="font-semibold text-slate-800">{label}</p>
                <p className="text-slate-400 mt-0.5 text-[9px]">Open</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
          <p className="text-slate-500 px-0.5 font-semibold text-slate-800">
            Recent
          </p>
          {[
            { t: "Team standup", s: "10:00 AM · Captions on" },
            { t: "Lecture notes", s: "Yesterday · Saved" },
          ].map((row) => (
            <div
              key={row.t}
              className="border-slate-100 flex items-center gap-2 rounded-xl border bg-white px-2.5 py-2 shadow-sm"
            >
              <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Mic className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">{row.t}</p>
                <p className="text-slate-400 truncate text-[9px]">{row.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <nav className="border-slate-100 mt-auto flex shrink-0 items-center justify-around border-t bg-white px-1 py-2">
        {[
          { Icon: Home, label: "Home", active: true },
          { Icon: Search, label: "Search", active: false },
          { Icon: MessageCircle, label: "Chat", active: false },
          { Icon: User, label: "Profile", active: false },
        ].map(({ Icon, label, active }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-0.5 ${active ? "text-primary" : "text-slate-400"}`}
          >
            <Icon className="h-4 w-4" strokeWidth={active ? 2.25 : 1.75} />
            <span className="text-[8px] font-medium">{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

/** Second layered phone — different generic screen. */
export function HeroMockAppSecondary() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white pt-11 text-[10px] leading-tight text-slate-900">
      <div className="shrink-0 border-b border-slate-100 px-3 py-2.5">
        <div className="bg-slate-100 flex items-center gap-2 rounded-full px-3 py-1.5 text-slate-500">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="text-[9px]">Search sessions…</span>
        </div>
      </div>
      <div className="text-slate-500 flex gap-1.5 overflow-x-hidden px-3 pt-2.5 pb-1">
        {["All", "Saved", "Shared"].map((p, i) => (
          <span
            key={p}
            className={`shrink-0 rounded-full px-2.5 py-1 font-medium ${i === 0 ? "bg-slate-900 text-white" : "bg-slate-100"}`}
          >
            {p}
          </span>
        ))}
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-hidden px-3 pt-2">
        <div className="from-slate-100 to-slate-50 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b p-3 shadow-sm">
          <p className="text-primary text-[9px] font-semibold uppercase tracking-wide">
            Featured
          </p>
          <p className="mt-1 text-xs font-bold text-slate-900">
            Gesture practice lab
          </p>
          <p className="text-slate-500 mt-1 text-[9px]">12 min · Beginner</p>
          <div className="mt-2 h-16 w-full rounded-xl bg-gradient-to-r from-violet-200/80 to-indigo-200/80" />
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex gap-2 rounded-xl border border-slate-100 bg-slate-50/80 p-2"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-200/90" />
            <div className="min-w-0 flex-1 py-0.5">
              <p className="truncate font-medium">Drill pack {i}</p>
              <p className="text-slate-400 text-[9px]">Updated this week</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
