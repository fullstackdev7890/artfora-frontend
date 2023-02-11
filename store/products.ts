import { defineStore } from 'pinia'
import { ProductsState } from '~/types/state'

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [
            {
                id: 1,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                media: [{
                    id: 1,
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
                    name: ''
                },
                {
                    id: 1,
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com,https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test, https://codepen.io/pen/?editors=0012,https://bandcamp.com/,https://nuxtjs.org/docs/features/nuxt-components/',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 2,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                media: [{
                    id: 1,
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674755641397-9038ed42636c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com,https://www.twitch.com,https://www.patreon.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 3,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                media: [{
                    deleted_at: null,
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    link: 'https://images.unsplash.com/photo-1674763671434-22b2671c863b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 4,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    link: 'https://images.unsplash.com/photo-1674754666581-4e6657392655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 5,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674766322500-8280bbbda97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1285&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 6,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://plus.unsplash.com/premium_photo-1664285182704-edf1458ef76e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 7,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674756142722-14266beb51d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 8,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674590818982-f38fd684a36e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 9,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674787433572-37ae9a76555a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3053&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 10,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674813878273-71d20543554a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 11,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://plus.unsplash.com/premium_photo-1670359037518-95e2d90acb06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2164&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 12,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674780550722-922aefa6fa15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 13,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674816568560-e5a11db85f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 14,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674820166222-6fd353bd0177?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1284&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 15,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674821503660-9445aab3d662?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 16,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674718061623-2d1902f6889d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 17,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674788052100-77e2aa1f0e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 18,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [
                  {
                    id: 34,
                    deleted_at: null,
                    link: 'https://plus.unsplash.com/premium_photo-1672192166287-af9bb2c4b979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
                    name: ''
                  },
                  {
                    id: 34,
                    deleted_at: null,
                    link: 'https://plus.unsplash.com/premium_photo-1672192166287-af9bb2c4b979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
                    name: ''
                  }
                ],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
            {
                id: 19,
                title: 'Il Dono Supreme',
                author: 'Test Author',
                price: 213,
                width: 100,
                height: 34,
                weight: 2,
                description: 'lorem ipsum well you know',
                media: [{
                    deleted_at: null,
                    link: 'https://images.unsplash.com/photo-1674769021687-63263e148cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    name: ''
                }],
                user: {
                    external_link: 'https://www.youtube.com/,https://chat.openai.com,https://twitch.com',
                    id: 1,
                    username: 'test_author',
                    tagname: '@test_author',
                    background_image: 'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png',
                    media: {
                        deleted_at: null,
                        link: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                    }
                }
            },
    ],
    item: {
      id: 1,
      title: '',
      author: '',
      media: {
        id: 1,
        deleted_at: null,
        created_at: '',
        link: '',
        name: ''
      },
      user: {
        external_link: null,
        id: 1,
        username: '',
        tagname: '',
        background_image: '',
        media: {
            id: 1,
            deleted_at: null,
            created_at: '',
            link: '',
            name: ''
        }
      }
    },
  }),

  actions: {
    fetch(id: string) {
      // @ts-ignore
      this.item = this.items.find(el => el.id == id as unknown as number)
    }
  }
})



