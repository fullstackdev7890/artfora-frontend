// @ts-ignore
import { defineStore } from 'pinia'
import { CartType, CartsState } from '~/types/products';

export const useCartStore = defineStore({
    id: 'cart', // or any other string value
    persist: true,
    state: (): CartsState => (
        {
            carts: [],
            totalShippingPrice: 0,
            totalProductsPrice: 0,
        }),

    actions: {

        async getCarts() {
            let totalPrice = 0;
            let shippingPrice = 0;
            const storedCarts = JSON.parse(localStorage.getItem("artfora_carts") as string)
            this.$state.carts = storedCarts
            storedCarts?.map((cart: any) => { return totalPrice += cart?.price_in_euro * cart?.quantity; })
            storedCarts?.map((cart: any) => { return shippingPrice += cart?.shippingPrice ?? 0; })
            this.$state.totalShippingPrice = shippingPrice
            this.$state.totalProductsPrice = totalPrice
            return ({ totalProductsPrice: totalPrice, totalShippingPrice: shippingPrice })

        },
        async addCart(newItem: CartType) {
            const artforaCarts = ref((JSON.parse(localStorage?.getItem("artfora_carts") as string)) ?? []);

            const isDuplictatedCart = artforaCarts.value?.filter(function (cart: any) {
                return cart?.id === newItem.id;
            })
            if (isDuplictatedCart.length > 0) {
                const updatedCarts = artforaCarts.value?.map(function (cart: any) {
                    return cart?.id === newItem.id ? { ...cart, quantity: (cart?.quantity || 0) + 1 } : cart;
                })
                localStorage.setItem('artfora_carts', JSON.stringify(updatedCarts));
                this.$state.carts = updatedCarts
            }
            else {

                const updatedCarts = [...artforaCarts.value, newItem];
                localStorage.setItem('artfora_carts', JSON.stringify(updatedCarts));
                this.$state.carts = updatedCarts
            }

        },
        async deleteCart(id: number) {
            const storedCarts = JSON.parse(localStorage.getItem("artfora_carts") as string)
            const result = storedCarts.filter((cart: any) => cart?.id !== id)
            localStorage.setItem('artfora_carts', JSON.stringify(result));

        }
    }
})