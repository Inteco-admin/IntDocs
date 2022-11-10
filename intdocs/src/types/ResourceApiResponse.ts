export interface ResourceApiResponse<T> {
  data: ResourceApiData<T>
}

export interface ResourceApiData<T> {
  data: T[]
} 