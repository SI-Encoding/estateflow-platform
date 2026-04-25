import { useEffect, useState } from 'react'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { PropertyPagination } from '@/components/properties/PropertyPagination'
import { usePropertiesQuery } from '@/hooks/use-properties-query'
import type { PropertyFilters as PropertyFiltersType } from '@/types/property'

export function PropertyListPage() {
  const [pageNumber, setPageNumber] = useState(1)

  const [filters, setFilters] = useState<PropertyFiltersType>({
    pageSize: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  function handleFiltersChange(nextFilters: PropertyFiltersType) {
    setFilters(nextFilters)
    setPageNumber(1) // ✅ reset page when filters change
  }

  const propertiesQuery = usePropertiesQuery(filters, pageNumber)

  // ✅ Clamp pageNumber if it exceeds totalPages from backend
  useEffect(() => {
    if (propertiesQuery.data) {
      const totalPages = propertiesQuery.data.totalPages || 1

      if (pageNumber > totalPages) {
        setPageNumber(totalPages)
      }
    }
  }, [propertiesQuery.data, pageNumber])

  const totalPages = propertiesQuery.data?.totalPages || 1
  const safePageNumber = Math.min(pageNumber, totalPages)

  return (
    <section className="space-y-5">
      <PropertyFilters filters={filters} onChange={handleFiltersChange} />

      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Properties
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-50">
              Browse active listings
            </h2>
          </div>
          <div className="text-sm text-slate-300">
            Filter by price, location, and property type.
          </div>
        </div>

        {/* Loading */}
        {propertiesQuery.isLoading && (
          <div className="py-12 text-sm text-slate-300">
            Loading properties...
          </div>
        )}

        {/* Error */}
        {propertiesQuery.isError && (
          <div className="mt-5 rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 p-5 text-sm text-rose-100">
            Unable to load properties. Make sure the API is running at{' '}
            <code>http://localhost:5055/api</code>.
          </div>
        )}

        {/* Data */}
        {propertiesQuery.data && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {propertiesQuery.data.totalCount} listings · page{' '}
                {safePageNumber} of {totalPages}
              </span>
              <span>Server state powered by TanStack Query</span>
            </div>

            {/* Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {propertiesQuery.data.items.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Empty state */}
            {propertiesQuery.data.items.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-10 text-center text-sm text-slate-400">
                No properties matched the current filters.
              </div>
            )}

            {/* Pagination */}
            <PropertyPagination
              pageNumber={safePageNumber}
              totalPages={totalPages}
              onPrevious={() =>
                setPageNumber((current) => Math.max(current - 1, 1))
              }
              onNext={() =>
                setPageNumber((current) =>
                  Math.min(current + 1, totalPages)
                )
              }
            />
          </div>
        )}
      </div>
    </section>
  )
}