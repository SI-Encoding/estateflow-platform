import { useQuery } from '@tanstack/react-query'
import { getProperties } from '@/api/properties'
import type { PropertyFilters } from '@/types/property'

export function usePropertiesQuery(filters: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => getProperties(filters),
  })
}
