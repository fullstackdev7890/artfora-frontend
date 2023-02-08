import { Setting } from '~/types/index'
import { Paginated, SearchFilters } from '~/types/search'
import { Product } from '~/types/products'
import { Category } from '~/types/categories'


export interface RootState {
  title: string,
  pendingRequestsCount: number
}

export interface AuthState {
  token: string | null
}

export interface SimpleEntityState<T, R> {
  items: Paginated<T>
  item: T
  filters: R
}

export interface SettingsState {
  items: Paginated<Setting>
}
export interface ProductsState {
  items: Product[]
}
export interface CategoriesState {
  items: Category[]
}
