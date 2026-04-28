import { Link } from 'react-router-dom'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { useAgentPropertiesQuery } from '@/hooks/use-agent-properties-query'
import { getApiErrorMessage } from '@/lib/api-error'

const dashboardQuery = {
  pageNumber: 1,
  pageSize: 100,
  sortBy: 'createdAt' as const,
  sortOrder: 'desc' as const,
}

export function AgentDashboardPage() {
  const agentPropertiesQuery = useAgentPropertiesQuery(dashboardQuery)

  if (agentPropertiesQuery.isLoading) {
    return (
      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 text-sm text-slate-300 backdrop-blur">
        Loading your dashboard...
      </section>
    )
  }

  if (agentPropertiesQuery.isError) {
    return (
      <section className="rounded-[1.75rem] border border-rose-400/20 bg-rose-500/10 p-6 text-sm text-rose-100 backdrop-blur">
        {getApiErrorMessage(
          agentPropertiesQuery.error,
          'Unable to load your dashboard right now.',
        )}
      </section>
    )
  }

  const response = agentPropertiesQuery.data

  if (!response) {
    return null
  }

  const recentListings = response.items.filter((property) => {
    const createdAt = new Date(property.createdAt).getTime()
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

    return createdAt >= thirtyDaysAgo
  }).length

  return (
    <section className="space-y-5">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Agent dashboard
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-50">
              Manage your active listings
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              A quick view of your inventory, activity, and most recent listings.
            </p>
          </div>

          <Link
            to="/properties/create"
            className="inline-flex rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Create property
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Total listings
            </p>
            <p className="mt-2 text-3xl font-semibold text-stone-50">
              {response.totalCount}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Recent listings
            </p>
            <p className="mt-2 text-3xl font-semibold text-stone-50">
              {recentListings}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Loaded listings
            </p>
            <p className="mt-2 text-3xl font-semibold text-stone-50">
              {response.items.length}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {response.items.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {response.items.length === 0 ? (
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/10 px-5 py-10 text-center text-sm text-slate-400">
            No listings yet. Create your first property to start the pipeline.
          </div>
        ) : null}
      </div>
    </section>
  )
}
