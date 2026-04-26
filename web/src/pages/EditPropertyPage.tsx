import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyForm } from '@/components/properties/PropertyForm'
import { usePropertyQuery } from '@/hooks/use-property-query'
import { useUpdatePropertyMutation } from '@/hooks/use-update-property-mutation'
import { getApiErrorMessage } from '@/lib/api-error'
import type { PropertyFormValues } from '@/types/property'

export function EditPropertyPage() {
  const navigate = useNavigate()
  const { propertyId = '' } = useParams()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const propertyQuery = usePropertyQuery(propertyId)
  const mutation = useUpdatePropertyMutation()

  if (propertyQuery.isLoading) {
    return (
      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 text-sm text-slate-300 backdrop-blur">
        Loading property...
      </section>
    )
  }

  if (propertyQuery.isError || !propertyQuery.data) {
    return (
      <section className="rounded-[1.75rem] border border-rose-400/20 bg-rose-500/10 p-6 text-sm text-rose-100 backdrop-blur">
        Unable to load this property for editing.
      </section>
    )
  }

  const initialValues: PropertyFormValues = {
    price: propertyQuery.data.price,
    address: propertyQuery.data.address,
    description: propertyQuery.data.description,
    bedrooms: propertyQuery.data.bedrooms,
    bathrooms: propertyQuery.data.bathrooms,
    propertyType: propertyQuery.data.propertyType,
  }

  async function handleSubmit(values: PropertyFormValues) {
    setSuccessMessage(null)
    const property = await mutation.mutateAsync({ id: propertyId, data: values })
    setSuccessMessage('Property updated successfully. Redirecting...')
    window.setTimeout(() => {
      navigate(`/properties/${property.id}`, { replace: true })
    }, 800)
  }

  return (
    <section className="space-y-5">
      <Link
        to={`/properties/${propertyId}`}
        className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10"
      >
        Back to details
      </Link>

      <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur">
        <div className="mb-6 border-b border-white/10 pb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">
            Edit
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-50">
            Update property
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Review the existing values, make changes, and save them back to the
            API.
          </p>
        </div>

        <PropertyForm
          initialValues={initialValues}
          submitLabel="Save changes"
          isSubmitting={mutation.isPending}
          errorMessage={
            mutation.isError
              ? getApiErrorMessage(
                  mutation.error,
                  'Unable to update the property right now.',
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
