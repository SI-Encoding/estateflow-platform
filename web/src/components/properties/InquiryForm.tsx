import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { InquiryFormValues } from '@/types/property'

interface InquiryFormProps {
  initialValues?: Partial<InquiryFormValues>
  isSubmitting: boolean
  errorMessage?: string | null
  successMessage?: string | null
  onSubmit: (values: InquiryFormValues) => Promise<void>
}

const defaultValues: InquiryFormValues = {
  name: '',
  email: '',
  message: '',
}

export function InquiryForm({
  initialValues,
  isSubmitting,
  errorMessage,
  successMessage,
  onSubmit,
}: InquiryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  })

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialValues,
    })
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          {...register('name', {
            required: 'Name is required',
          })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="Your name"
        />
        {errors.name ? (
          <p className="text-sm text-rose-300">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
          })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p className="text-sm text-rose-300">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', {
            required: 'Message is required',
          })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="Tell the agent what you're interested in."
        />
        {errors.message ? (
          <p className="text-sm text-rose-300">{errors.message.message}</p>
        ) : null}
      </div>

      {errorMessage ? (
        <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Contact agent'}
      </button>
    </form>
  )
}
