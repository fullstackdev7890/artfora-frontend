import { defineStore } from 'pinia'
import { CategoriesState } from '~/types'

export const useCategoriesStore = defineStore('categories', {
    state: (): CategoriesState => ({
        items: [
            {
                id: 1,
                title: "parent category",
                parent_id: null,
                created_at: "2016-10-20T11:05:00.000000Z",
                updated_at: "2016-10-20T11:05:00.000000Z",
                parent: null,
                children: [
                    {
                        id: 3,
                        title: "children #1",
                        parent_id: 1,
                        created_at: "2016-10-20T11:05:00.000000Z",
                        updated_at: "2016-10-20T11:05:00.000000Z"
                    },
                    {
                        id: 4,
                        title: "children #2",
                        parent_id: 1,
                        created_at: "2016-10-20T11:05:00.000000Z",
                        updated_at: "2016-10-20T11:05:00.000000Z"
                    }
                ]
            },
            {
                id: 2,
                title: "parent category#2",
                parent_id: null,
                created_at: "2016-10-20T11:05:00.000000Z",
                updated_at: "2016-10-20T11:05:00.000000Z",
                parent: null,
                children: [
                    {
                        id: 3,
                        title: "dsfsd",
                        parent_id: 2,
                        created_at: "2016-10-20T11:05:00.000000Z",
                        updated_at: "2016-10-20T11:05:00.000000Z"
                    },
                    {
                        id: 4,
                        title: "sdfdsf",
                        parent_id: 2,
                        created_at: "2016-10-20T11:05:00.000000Z",
                        updated_at: "2016-10-20T11:05:00.000000Z"
                    }
                ]
            }

        ]
    }),

    getters: {
        categories: (state) => state.items
    }
})