import { Text } from '~/types/index'
import { Paginated } from '~/types/search'

export interface TextsState {
  items: Paginated<Text>
}
