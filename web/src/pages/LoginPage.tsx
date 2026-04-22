import { LoginForm } from '@/components/auth/LoginForm'
import { useAuthStore } from '@/store/auth-store'

export function LoginPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur">
      <div className="mb-6 space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">
          Authentication
        </p>
        <h2 className="text-2xl font-semibold text-stone-50">
          Connect the dashboard to your API
        </h2>
        <p className="text-sm text-slate-300">
          The auth store keeps the JWT token in Zustand persistence and the API
          client automatically attaches it to requests.
        </p>
      </div>

      {user ? (
        <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-100">
          Signed in as {user.firstName} {user.lastName} ({user.role}).
        </div>
      ) : (
        <LoginForm />
      )}
    </section>
  )
}
