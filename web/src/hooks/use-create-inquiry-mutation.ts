import { useMutation } from '@tanstack/react-query'
import { createInquiry } from '@/api/properties'
import type { InquiryFormValues } from '@/types/property'

interface CreateInquiryPayload {
  propertyId: string
  data: InquiryFormValues
}

export function useCreateInquiryMutation() {
  return useMutation({
    mutationFn: ({ propertyId, data }: CreateInquiryPayload) =>
      createInquiry(propertyId, data),
  })
}
