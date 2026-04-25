import { useQuery } from '@tanstack/react-query'
import { getPropertyById } from '@/api/properties'

export function usePropertyQuery(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
    enabled: Boolean(id),
  })
}
