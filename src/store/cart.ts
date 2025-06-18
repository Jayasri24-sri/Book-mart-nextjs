// import { create } from 'zustand'
//
// export const useCart = create((set) => ({
//     items: [],
//     add: (item) => set((state) => ({
//         items: [...state.items.filter((i) => i.id !== item.id), item],
//     })),
//     remove: (id) => set((state) => ({
//         items: state.items.filter((i) => i.id !== id),
//     })),
//     clear: () => set({ items: [] }),
// }))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
    id: string
    title: string
    price: number
    quantity: number
    image?: string
}

type CartStore = {
    items: CartItem[]
    add: (item: CartItem) => void
    remove: (id: string) => void
    clear: () => void
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            add: (item) => {
                const existing = get().items.find((i) => i.id === item.id)
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    })
                } else {
                    set({ items: [...get().items, item] })
                }
            },

            remove: (id) =>
                set({
                    items: get().items.filter((item) => item.id !== id),
                }),

            clear: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage', // key for localStorage
        }
    )
)
