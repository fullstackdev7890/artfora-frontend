// @ts-ignore
import { defineStore } from 'pinia'
import { CartType, CartsState } from '~/types/products';
import axios from "axios"
export const useCartStore = defineStore({
    id: 'cart', // or any other string value
    persist: true,
    state: (): CartsState => (
        {
            carts: [],
            totalShippingPrice: 0,
            totalProductsPrice: 0,
            filters: {
                per_page: 20,
                page: 1,
                with: ['user', 'media', 'categories.parent'],
                desc: 1,
                author: null
            },
        }),

    actions: {

        async getCarts() {
            const res = await axios.get("/cart-item")
            const response = res?.data
            this.$state.carts = response
            return this.getTotalPrice()
        },
        async addCart(newItem: CartType) {


            const response = await axios.post("/cart-item", newItem)
            const result = this.$state?.carts?.filter(cart => cart?.id === response.data?.id)
            console.log(result, "result")
            if (result.length > 0) {
                const result1 = this.$state?.carts?.map(cart => cart?.id === response.data?.id ? response.data : cart)
                this.$state.carts = result1
            }
            else {
                this.$state.carts = [...this.$state.carts, response.data]
            }

            return this.getTotalPrice()


        },
        async getTotalPrice() {
            let totalPrice = 0;
            this.$state.carts?.map((cart: any) => { return totalPrice += cart?.product?.price_in_euro * cart?.quantity; })
            this.$state.totalProductsPrice = totalPrice
        },
        async deleteCart(prod_id: number) {
            const res = await axios.delete(`/cart-item/${prod_id}`, {
                params: { "force": 1 }
            })
            this.$state.carts = this.$state.carts.filter((cart: any) => cart?.prod_id !== prod_id)
            return this.getTotalPrice()


        }
    }
})