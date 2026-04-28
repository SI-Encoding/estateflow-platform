import { useQuery } from '@tanstack/react-query'
import { getMyProperties } from '@/api/properties'
import type { PropertyFilters } from '@/types/property'

export function useAgentPropertiesQuery(filters: PropertyFilters) {
  return useQuery({
    queryKey: ['agent-properties', filters],
    queryFn: () => getMyProperties(filters),
  })
}
