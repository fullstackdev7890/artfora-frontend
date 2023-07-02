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
            const res = await axios.get("/order-item")
            // let totalPrice = 0;
            // let shippingPrice = 0;
            // const storedCarts = JSON.parse(localStorage.getItem("artfora_carts") as string)
            const response = res?.data
            const allCarts = Promise.all(response.map(async (cart: any) => {
                const detailCart = await axios.get(`/products/${cart?.prod_id}`, { params: this.$state.filters });
                return { ...cart, media: detailCart.data?.media };
            }));
            allCarts.then(res => {
                this.$state.carts = res
            })


            let totalPrice = 0;

            response?.map((cart: any) => { return totalPrice += cart?.price * cart?.quantity; })

            this.$state.totalProductsPrice = totalPrice


        },
        async addCart(newItem: CartType) {

            const response = await axios.post("/order-item", newItem)
            const detailCart = await axios.get(`/products/${response.data?.prod_id}`, { params: this.$state.filters });
            this.$state.carts = [...this.$state.carts, { ...response.data, media: detailCart?.data?.media }]
            this.$state.totalProductsPrice += response.data.price


        },
        async deleteCart(prod_id: number) {
            const res = await axios.delete(`/order-item/${prod_id}`, {
                params: { "force": 1 }
            })
            this.$state.carts = this.$state.carts.filter((cart: any) => cart?.prod_id !== prod_id)

        }
    }
})