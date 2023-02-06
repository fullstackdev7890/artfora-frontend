import { defineStore } from 'pinia'
import {Media, User} from "~/types";

export const useUserStore = defineStore('user', {

    state: (): User => ({
        first_name: 'Test',
        last_name: 'User',
        role_id: 1,
        media: {
            link: null
        }
    }),

    getters: {
        getUserAvatar: (state) => state.media.link
    }
})