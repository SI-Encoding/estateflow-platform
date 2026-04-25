import { apiClient } from '@/api/client'
import type { PagedResult, Property, PropertyFilters } from '@/types/property'

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
