import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PropertyForm } from '@/components/properties/PropertyForm'
import { useCreatePropertyMutation } from '@/hooks/use-create-property-mutation'
import { getApiErrorMessage } from '@/lib/api-error'
import type { PropertyFormValues } from '@/types/property'

export function CreatePropertyPage() {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const mutation = useCreatePropertyMutation()

  async function handleSubmit(values: PropertyFormValues) {
    setSuccessMessage(null)
    const property = await mutation.mutateAsync(values)
    setSuccessMessage('Property created successfully. Redirecting...')
    window.setTimeout(() => {
      navigate(`/properties/${property.id}`, { replace: true })
    }, 800)
  }

  return (
    <section className="space-y-5">
      <Link
        to="/properties"
        className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10"
      >
        Back to properties
      </Link>

      <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur">
        <div className="mb-6 border-b border-white/10 pb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">
            Create
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-50">
            Add a new property
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Create a listing as an Agent or Admin. The property list will refresh
            automatically after save.
          </p>
        </div>

        <PropertyForm
          submitLabel="Create property"
          isSubmitting={mutation.isPending}
          errorMessage={
            mutation.isError
              ? getApiErrorMessage(
                  mutation.error,
                  'Unable to create the property right now.',
                )
              : null
          }
          successMessage={successMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}
