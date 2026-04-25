import { useQuery } from '@tanstack/react-query'
import { getProperties } from '@/api/properties'
import type { PropertyFilters } from '@/types/property'

export function usePropertiesQuery(filters: PropertyFilters, pageNumber: number) {
  return useQuery({
    queryKey: ['properties', filters, pageNumber],
    queryFn: () =>
      getProperties({
        ...filters,
        pageNumber,
      }),
  })
}
