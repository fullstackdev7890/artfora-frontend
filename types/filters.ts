import { Filter } from '~/types/index'
import { Paginated } from '~/types/search'

export interface FiltersState {
  items: Paginated<Filter>
}
