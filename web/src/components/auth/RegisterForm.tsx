import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '@/hooks/use-register-mutation'
import { getApiErrorMessage } from '@/lib/api-error'
import type { RegisterRequest } from '@/types/auth'

const roleOptions = ['Buyer', 'Agent', 'Admin'] as const

export function RegisterForm() {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'Buyer',
    },
  })

  const registerMutation = useRegisterMutation()

  const onSubmit = handleSubmit(async (values) => {
    setSuccessMessage(null)
    await registerMutation.mutateAsync(values)
    setSuccessMessage('Registration successful. Redirecting to login...')
    window.setTimeout(() => {
      navigate('/login', {
        replace: true,
        state: { registeredEmail: values.email },
      })
    }, 800)
  })

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-200" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
            placeholder="Ava"
          />
          {errors.firstName ? (
            <p className="text-sm text-rose-300">{errors.firstName.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-200" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
            placeholder="Stone"
          />
          {errors.lastName ? (
            <p className="text-sm text-rose-300">{errors.lastName.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="registerEmail">
          Email
        </label>
        <input
          id="registerEmail"
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
        <label className="text-sm font-medium text-stone-200" htmlFor="registerPassword">
          Password
        </label>
        <input
          id="registerPassword"
          type="password"
          autoComplete="new-password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="SecurePass123!"
        />
        {errors.password ? (
          <p className="text-sm text-rose-300">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          {...register('role', { required: 'Role is required' })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {registerMutation.isError ? (
        <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {getApiErrorMessage(
            registerMutation.error,
            'Unable to register. Please review your details and try again.',
          )}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {registerMutation.isPending ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-sm text-slate-300">
        Already registered?{' '}
        <Link className="text-amber-300 transition hover:text-amber-200" to="/login">
          Sign in here
        </Link>
        .
      </p>
    </form>
  )
}
