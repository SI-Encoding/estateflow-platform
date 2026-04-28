import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/api/query-client'
import { unsaveProperty } from '@/api/properties'

export function useUnsavePropertyMutation() {
  return useMutation({
    mutationFn: (propertyId: string) => unsaveProperty(propertyId),
    onSuccess: async (_, propertyId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['saved-properties'] }),
        queryClient.invalidateQueries({ queryKey: ['properties'] }),
        queryClient.invalidateQueries({ queryKey: ['property', propertyId] }),
        queryClient.invalidateQueries({ queryKey: ['agent-properties'] }),
      ])
    },
  })
}
