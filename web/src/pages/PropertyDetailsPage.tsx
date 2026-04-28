import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { InquiryForm } from '@/components/properties/InquiryForm'
import { SavePropertyButton } from '@/components/properties/SavePropertyButton'
import { useCreateInquiryMutation } from '@/hooks/use-create-inquiry-mutation'
import { usePropertyQuery } from '@/hooks/use-property-query'
import { useSavePropertyMutation } from '@/hooks/use-save-property-mutation'
import { useSavedPropertiesQuery } from '@/hooks/use-saved-properties-query'
import { useUnsavePropertyMutation } from '@/hooks/use-unsave-property-mutation'
import { getApiErrorMessage } from '@/lib/api-error'
import { useAuthStore } from '@/store/auth-store'
import type { InquiryFormValues } from '@/types/property'

export function PropertyDetailsPage() {
  const { propertyId = '' } = useParams()
  const propertyQuery = usePropertyQuery(propertyId)
  const user = useAuthStore((state) => state.user)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const savedPropertiesQuery = useSavedPropertiesQuery(Boolean(user))
  const saveMutation = useSavePropertyMutation()
  const unsaveMutation = useUnsavePropertyMutation()
  const inquiryMutation = useCreateInquiryMutation()

  if (propertyQuery.isLoading) {
    return (
      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 text-sm text-slate-300 backdrop-blur">
        Loading property details...
      </section>
    )
  }

  if (propertyQuery.isError) {
    return (
      <section className="rounded-[1.75rem] border border-rose-400/20 bg-rose-500/10 p-6 text-sm text-rose-100 backdrop-blur">
        Unable to load this property. Please return to the list and try again.
      </section>
    )
  }

  if (!propertyQuery.data) {
    return (
      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 text-sm text-slate-300 backdrop-blur">
        Property not found.
      </section>
    )
  }

  const property = propertyQuery.data
  const canEdit =
    user?.role === 'Admin' ||
    (user?.role === 'Agent' && user.id === property.agentId)
  const isSaved = savedPropertiesQuery.data?.some((item) => item.id === property.id)

  async function handleToggleSave() {
    if (isSaved) {
      await unsaveMutation.mutateAsync(property.id)
      return
    }

    await saveMutation.mutateAsync(property.id)
  }

  async function handleInquirySubmit(values: InquiryFormValues) {
    setSuccessMessage(null)
    await inquiryMutation.mutateAsync({
      propertyId: property.id,
      data: values,
    })
    setSuccessMessage('Your message was sent to the agent successfully.')
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/properties"
          className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10"
        >
          Back to properties
        </Link>
        {canEdit ? (
          <Link
            to={`/properties/${property.id}/edit`}
            className="inline-flex rounded-full border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-300/20"
          >
            Edit property
          </Link>
        ) : null}
        <SavePropertyButton
          isSaved={Boolean(isSaved)}
          isPending={saveMutation.isPending || unsaveMutation.isPending}
          onClick={handleToggleSave}
        />
      </div>

      <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">
              {property.propertyType}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-50">
              {property.address}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {property.description}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
              Asking price
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-200">
              ${property.price.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Bedrooms
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-50">
              {property.bedrooms}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Bathrooms
            </p>
            <p className="mt-2 text-2xl font-semibold text-stone-50">
              {property.bathrooms}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Listed on
            </p>
            <p className="mt-2 text-lg font-semibold text-stone-50">
              {new Date(property.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Agent ID
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-stone-50">
              {property.agentId}
            </p>
          </div>
        </div>
      </article>

      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur">
        <div className="mb-6 border-b border-white/10 pb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">
            Inquiry
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-stone-50">
            Contact the listing agent
          </h3>
          <p className="mt-3 text-sm text-slate-300">
            Send a question or request a viewing directly from the property page.
          </p>
        </div>

        <InquiryForm
          initialValues={{
            name: user ? `${user.firstName} ${user.lastName}` : '',
            email: user?.email ?? '',
          }}
          isSubmitting={inquiryMutation.isPending}
          errorMessage={
            inquiryMutation.isError
              ? getApiErrorMessage(
                  inquiryMutation.error,
                  'Unable to send your inquiry right now.',
                )
              : null
          }
          successMessage={successMessage}
          onSubmit={handleInquirySubmit}
        />
      </section>
    </section>
  )
}
