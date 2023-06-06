import { Entity } from '~/types/index'
import { Product } from '~/types/products'


export declare interface SubCategory extends Entity {
    title: string
    parent_id: number | null
    products: Product[] | []
}

export declare interface Category extends SubCategory {
    id: number
    has_products: boolean
    parent: null
    children: SubCategory[] | []
}
