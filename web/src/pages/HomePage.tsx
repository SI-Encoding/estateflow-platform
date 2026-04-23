import { useState } from 'react'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { usePropertiesQuery } from '@/hooks/use-properties-query'
import type { PropertyFilters as PropertyFiltersType } from '@/types/property'

export function HomePage() {
  const [filters, setFilters] = useState<PropertyFiltersType>({
    pageNumber: 1,
    pageSize: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  const propertiesQuery = usePropertiesQuery(filters)

  return (
    <section className="space-y-5">
      <PropertyFilters filters={filters} onChange={setFilters} />

      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Inventory
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-50">
              Explore active listings
            </h2>
          </div>
          <div className="text-sm text-slate-300">
            Authenticated requests are ready for protected actions.
          </div>
        </div>

        {propertiesQuery.isLoading ? (
          <div className="py-12 text-sm text-slate-300">Loading properties...</div>
        ) : null}

        {propertiesQuery.isError ? (
          <div className="mt-5 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 p-5 text-sm text-rose-100">
            Unable to load properties. Make sure the API is running at{' '}
            <code>http://localhost:5055/api</code>.
          </div>
        ) : null}

        {propertiesQuery.data ? (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {propertiesQuery.data.totalCount} listings · page{' '}
                {propertiesQuery.data.pageNumber} of{' '}
                {Math.max(propertiesQuery.data.totalPages, 1)}
              </span>
              <span>Server state powered by TanStack Query</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {propertiesQuery.data.items.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {propertiesQuery.data.items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-10 text-center text-sm text-slate-400">
                No properties matched the current filters.
              </div>
            ) : null}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    pageNumber: Math.max((current.pageNumber ?? 1) - 1, 1),
                  }))
                }
                disabled={(filters.pageNumber ?? 1) <= 1}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    pageNumber: (current.pageNumber ?? 1) + 1,
                  }))
                }
                disabled={
                  propertiesQuery.data.totalPages > 0 &&
                  (filters.pageNumber ?? 1) >= propertiesQuery.data.totalPages
                }
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-stone-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
