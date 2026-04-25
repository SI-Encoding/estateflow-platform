import type { ChangeEvent } from 'react'
import type { PropertyFilters as PropertyFiltersType } from '@/types/property'

interface PropertyFiltersProps {
  filters: PropertyFiltersType
  onChange: (nextFilters: PropertyFiltersType) => void
}

export function PropertyFilters({
  filters,
  onChange,
}: PropertyFiltersProps) {
  const handleTextChange =
    (field: keyof PropertyFiltersType) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({
        ...filters,
        [field]: event.target.value || undefined,
      })
    }

  const handleNumberChange =
    (field: keyof PropertyFiltersType) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      onChange({
        ...filters,
        [field]: value ? Number(value) : undefined,
      })
    }

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Location</span>
            <input
              value={filters.address ?? ''}
              onChange={handleTextChange('address')}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
              placeholder="Main Street"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Property type</span>
            <select
              value={filters.propertyType ?? ''}
              onChange={handleTextChange('propertyType')}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
            >
              <option value="">All</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="House">House</option>
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Min price</span>
            <input
              type="number"
              min="0"
              value={filters.minPrice ?? ''}
              onChange={handleNumberChange('minPrice')}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
              placeholder="300000"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Max price</span>
            <input
              type="number"
              min="0"
              value={filters.maxPrice ?? ''}
              onChange={handleNumberChange('maxPrice')}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
              placeholder="800000"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-slate-300">Page size</span>
            <select
              value={filters.pageSize ?? 6}
              onChange={(event) =>
                onChange({
                  ...filters,
                  pageSize: Number(event.target.value),
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  )
}
