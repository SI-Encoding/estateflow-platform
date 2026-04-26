import { useMutation } from '@tanstack/react-query'
import { createProperty } from '@/api/properties'
import { queryClient } from '@/api/query-client'
import type { PropertyFormValues } from '@/types/property'

export function useCreatePropertyMutation() {
  return useMutation({
    mutationFn: (data: PropertyFormValues) => createProperty(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['properties'] })
    },
  })
}
