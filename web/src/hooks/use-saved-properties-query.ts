import { useQuery } from '@tanstack/react-query'
import { getSavedProperties } from '@/api/properties'

export function useSavedPropertiesQuery(enabled = true) {
  return useQuery({
    queryKey: ['saved-properties'],
    queryFn: getSavedProperties,
    enabled,
  })
}
