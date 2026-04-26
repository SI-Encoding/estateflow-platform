export interface Property {
  id: string
  price: number
  address: string
  description: string
  bedrooms: number
  bathrooms: number
  propertyType: string
  createdAt: string
  agentId: string
}

export interface PropertyFormValues {
  price: number
  address: string
  description: string
  bedrooms: number
  bathrooms: number
  propertyType: string
}

export interface PropertyFilters {
  minPrice?: number
  maxPrice?: number
  address?: string
  propertyType?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface PagedResult<T> {
  items: T[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}
