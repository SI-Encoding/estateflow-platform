import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/api/query-client'
import { saveProperty } from '@/api/properties'

export function useSavePropertyMutation() {
  return useMutation({
    mutationFn: (propertyId: string) => saveProperty(propertyId),
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
