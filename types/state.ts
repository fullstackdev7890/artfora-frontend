import {
  Setting
} from '~/types/index'
import {
  Paginated,
  SearchFilters
} from '~/types/search'

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
