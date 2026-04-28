import { PropertyCard } from '@/components/properties/PropertyCard'
import { SavePropertyButton } from '@/components/properties/SavePropertyButton'
import { useSavePropertyMutation } from '@/hooks/use-save-property-mutation'
import { useSavedPropertiesQuery } from '@/hooks/use-saved-properties-query'
import { useUnsavePropertyMutation } from '@/hooks/use-unsave-property-mutation'
import { getApiErrorMessage } from '@/lib/api-error'

export function SavedPropertiesPage() {
  const savedPropertiesQuery = useSavedPropertiesQuery()
  const saveMutation = useSavePropertyMutation()
  const unsaveMutation = useUnsavePropertyMutation()

  async function handleToggleSave(propertyId: string, isSaved: boolean) {
    if (isSaved) {
      await unsaveMutation.mutateAsync(propertyId)
      return
    }

    await saveMutation.mutateAsync(propertyId)
  }

  const errorMessage = savedPropertiesQuery.isError
    ? getApiErrorMessage(
        savedPropertiesQuery.error,
        'Unable to load your saved properties right now.',
      )
    : null

  return (
    <section className="space-y-5">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
        <div className="border-b border-white/10 pb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Favorites
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-50">
            Saved properties
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Keep a shortlist of properties you want to revisit or compare later.
          </p>
        </div>

        {savedPropertiesQuery.isLoading ? (
          <div className="py-12 text-sm text-slate-300">
            Loading saved properties...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="mt-5 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 p-5 text-sm text-rose-100">
            {errorMessage}
          </div>
        ) : null}

        {savedPropertiesQuery.data ? (
          <div className="mt-6 space-y-6">
            <div className="text-sm text-slate-300">
              {savedPropertiesQuery.data.length} saved properties
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {savedPropertiesQuery.data.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  action={
                    <SavePropertyButton
                      isSaved
                      isPending={
                        saveMutation.isPending || unsaveMutation.isPending
                      }
                      onClick={() => handleToggleSave(property.id, true)}
                    />
                  }
                />
              ))}
            </div>

            {savedPropertiesQuery.data.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-10 text-center text-sm text-slate-400">
                You have not saved any properties yet.
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
