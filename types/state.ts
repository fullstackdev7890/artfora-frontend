import { Setting } from '~/types/index'
import { Paginated, SearchFilters } from '~/types/search'
import { Product } from '~/types/products'
import { Category } from '~/types/categories'
import { Address } from './auth'

export interface RootState {
  title: string,
  pendingRequestsCount: number
}

export interface AuthState {
  token: string | null,
  emailForTwoFactorAuth: string | null,
  remember_me: boolean
  user_inv_address: Address
  user_sel_address: Address
  user_dev_address: Address
}

export interface SimpleEntityState<T, R> {
  items: Paginated<T>
  item: T
  filters: R
}

export interface SettingsState {
  items: Paginated<Setting>
}
export interface CategoriesState {
  items: Category[],
  filters: {
    all: number
    with: string[]
    only_parents: number
    author: string | null
    username: string | null
  }
}
