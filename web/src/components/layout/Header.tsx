import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'

export function Header() {
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)
  const navigate = useNavigate()
  const canManageProperties = user?.role === 'Agent' || user?.role === 'Admin'

  function handleSignOut() {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <header className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-300/80">
            EstateFlow
          </p>
          <div>
            <Link to="/" className="inline-block">
              <h1
                className="text-4xl text-stone-50 sm:text-5xl"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
                }}
              >
                Property search, tuned for deal flow.
              </h1>
            </Link>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
              A Vite + React dashboard wired for authenticated API access, cached
              queries, and a reusable frontend structure.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 self-start md:items-end md:self-end">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-amber-300 text-slate-950'
                    : 'border border-white/10 bg-white/5 text-stone-100 hover:bg-white/10'
                }`
              }
            >
              Properties
            </NavLink>
            {user ? (
              <NavLink
                to="/saved-properties"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition ${
                    isActive
                      ? 'bg-amber-300 text-slate-950'
                      : 'border border-white/10 bg-white/5 text-stone-100 hover:bg-white/10'
                  }`
                }
              >
                Saved
              </NavLink>
            ) : null}
            {canManageProperties ? (
              <NavLink
                to="/agent-dashboard"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition ${
                    isActive
                      ? 'bg-amber-300 text-slate-950'
                      : 'border border-white/10 bg-white/5 text-stone-100 hover:bg-white/10'
                  }`
                }
              >
                Dashboard
              </NavLink>
            ) : null}
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 transition ${
                      isActive
                        ? 'bg-amber-300 text-slate-950'
                        : 'border border-white/10 bg-white/5 text-stone-100 hover:bg-white/10'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 transition ${
                      isActive
                        ? 'bg-amber-300 text-slate-950'
                        : 'border border-white/10 bg-white/5 text-stone-100 hover:bg-white/10'
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            ) : null}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                  {user.firstName} {user.lastName} · {user.role}
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
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
      </div>
    </header>
  )
}
