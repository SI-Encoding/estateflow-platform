import { useMutation } from '@tanstack/react-query'
import { updateProperty } from '@/api/properties'
import { queryClient } from '@/api/query-client'
import type { PropertyFormValues } from '@/types/property'

interface UpdatePropertyMutationArgs {
  id: string
  data: PropertyFormValues
}

export function useUpdatePropertyMutation() {
  return useMutation({
    mutationFn: ({ id, data }: UpdatePropertyMutationArgs) =>
      updateProperty(id, data),
    onSuccess: async (property) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['properties'] }),
        queryClient.invalidateQueries({ queryKey: ['property', property.id] }),
      ])
    },
  })
}
