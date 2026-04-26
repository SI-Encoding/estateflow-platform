import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { PropertyFormValues } from '@/types/property'

interface PropertyFormProps {
  initialValues?: PropertyFormValues
  isSubmitting: boolean
  submitLabel: string
  errorMessage?: string | null
  successMessage?: string | null
  onSubmit: (values: PropertyFormValues) => Promise<void>
}

const defaultValues: PropertyFormValues = {
  price: 0,
  address: '',
  description: '',
  bedrooms: 0,
  bathrooms: 0,
  propertyType: '',
}

export function PropertyForm({
  initialValues,
  isSubmitting,
  submitLabel,
  errorMessage,
  successMessage,
  onSubmit,
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    defaultValues: initialValues ?? defaultValues,
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-200" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            {...register('price', {
              valueAsNumber: true,
              required: 'Price is required',
              validate: (value) => value > 0 || 'Price must be greater than 0',
            })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          />
          {errors.price ? (
            <p className="text-sm text-rose-300">{errors.price.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-stone-200"
            htmlFor="propertyType"
          >
            Property type
          </label>
          <select
            id="propertyType"
            {...register('propertyType', {
              required: 'Property type is required',
            })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          >
            <option value="">Select type</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="House">House</option>
          </select>
          {errors.propertyType ? (
            <p className="text-sm text-rose-300">{errors.propertyType.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-200" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          {...register('address', {
            required: 'Address is required',
          })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="123 Main Street"
        />
        {errors.address ? (
          <p className="text-sm text-rose-300">{errors.address.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-stone-200"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          placeholder="Describe the property"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-200" htmlFor="bedrooms">
            Bedrooms
          </label>
          <input
            id="bedrooms"
            type="number"
            min="0"
            {...register('bedrooms', {
              valueAsNumber: true,
              validate: (value) =>
                value >= 0 || 'Bedrooms must be 0 or greater',
            })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          />
          {errors.bedrooms ? (
            <p className="text-sm text-rose-300">{errors.bedrooms.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-stone-200"
            htmlFor="bathrooms"
          >
            Bathrooms
          </label>
          <input
            id="bathrooms"
            type="number"
            min="0"
            {...register('bathrooms', {
              valueAsNumber: true,
              validate: (value) =>
                value >= 0 || 'Bathrooms must be 0 or greater',
            })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/70"
          />
          {errors.bathrooms ? (
            <p className="text-sm text-rose-300">{errors.bathrooms.message}</p>
          ) : null}
        </div>
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
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
