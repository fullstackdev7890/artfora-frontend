import { User } from '~/types/index'
import { Paginated } from '~/types/search'

export declare interface SearchUsersFilters {
  categories?: number[]
  page?: number
  per_page?: number
  with?: string[]
  desc?: number
}
export interface UsersState {
  users: Paginated<User>
  user: User
  filters: SearchUsersFilters,
  loadingNextPage: boolean,
  pendingCount: number
}