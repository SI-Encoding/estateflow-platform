import { apiClient } from '@/api/client'
import type {
  InquiryFormValues,
  InquiryResponse,
  PagedResult,
  Property,
  PropertyFilters,
  PropertyFormValues,
} from '@/types/property'

export async function getProperties(
  filters: PropertyFilters,
): Promise<PagedResult<Property>> {
  const response = await apiClient.get<PagedResult<Property>>('/property', {
    params: filters,
  })

  return response.data
}

export async function getPropertyById(id: string): Promise<Property> {
  const response = await apiClient.get<Property>(`/property/${id}`)
  return response.data
}

export async function createProperty(
  data: PropertyFormValues,
): Promise<Property> {
  const response = await apiClient.post<Property>('/property', data)
  return response.data
}

export async function updateProperty(
  id: string,
  data: PropertyFormValues,
): Promise<Property> {
  const response = await apiClient.put<Property>(`/property/${id}`, data)
  return response.data
}

export async function getMyProperties(
  filters: PropertyFilters,
): Promise<PagedResult<Property>> {
  const response = await apiClient.get<PagedResult<Property>>('/property/mine', {
    params: filters,
  })

  return response.data
}

export async function saveProperty(propertyId: string): Promise<void> {
  await apiClient.post(`/property/${propertyId}/save`)
}

export async function unsaveProperty(propertyId: string): Promise<void> {
  await apiClient.delete(`/property/${propertyId}/save`)
}

export async function getSavedProperties(): Promise<Property[]> {
  const response = await apiClient.get<Property[]>('/property/saved')
  return response.data
}

export async function createInquiry(
  propertyId: string,
  data: InquiryFormValues,
): Promise<InquiryResponse> {
  const response = await apiClient.post<InquiryResponse>(
    `/property/${propertyId}/inquiries`,
    data,
  )

  return response.data
}
