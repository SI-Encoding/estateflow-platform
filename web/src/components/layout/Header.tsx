import { useAuthStore } from '@/store/auth-store'

export function Header() {
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)

  return (
    <header className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-300/80">
            EstateFlow
          </p>
          <div>
            <h1
              className="text-4xl text-stone-50 sm:text-5xl"
              style={{
                fontFamily:
                  '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
              }}
            >
              Property search, tuned for deal flow.
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
              A Vite + React dashboard wired for authenticated API access, cached
              queries, and a reusable frontend structure.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-end">
          {user ? (
            <>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                {user.firstName} {user.lastName} · {user.role}
              </div>
              <button
                type="button"
                onClick={clearSession}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:border-amber-300/40 hover:bg-white/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Not signed in
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
