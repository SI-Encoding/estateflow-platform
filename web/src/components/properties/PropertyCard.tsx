import type { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
            {property.propertyType}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-50">
            {property.address}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Price
          </p>
          <p className="text-2xl font-semibold text-emerald-300">
            ${property.price.toLocaleString()}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {property.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-stone-200">
        <span className="rounded-full bg-white/6 px-3 py-1">
          {property.bedrooms} bd
        </span>
        <span className="rounded-full bg-white/6 px-3 py-1">
          {property.bathrooms} ba
        </span>
        <span className="rounded-full bg-white/6 px-3 py-1">
          Added {new Date(property.createdAt).toLocaleDateString()}
        </span>
      </div>
    </article>
  )
}
