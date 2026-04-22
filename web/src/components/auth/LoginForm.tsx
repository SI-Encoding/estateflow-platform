
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/hooks/use-login-mutation'
import type { LoginRequest } from '@/types/auth'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: 'ava@example.com',
      password: 'SecurePass123!',
    },
  })

  const loginMutation = useLoginMutation()

  const onSubmit = handleSubmit(async (values) => {
    await loginMutation.mutateAsync(values)
  })

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', { required: 'Email is required' })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="agent@example.com"
        />
        {errors.email ? (
          <p className="text-sm text-rose-300">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-stone-200"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="SecurePass123!"
        />
        {errors.password ? (
          <p className="text-sm text-rose-300">{errors.password.message}</p>
        ) : null}
      </div>

      {loginMutation.isError ? (
        <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          Unable to sign in. Check the backend API and your credentials.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign in to API'}
      </button>
    </form>
  )
}
