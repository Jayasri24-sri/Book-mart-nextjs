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


import { create } from 'zustand';

type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    // Add other properties as needed
};

type CartStore = {
    items: CartItem[];
    add: (item: CartItem) => void;
    remove: (id: string) => void;
    clear: () => void;
};

export const useCart = create<CartStore>((set) => ({
    items: [],
    add: (item) =>
        set((state) => ({
            items: [...state.items.filter((i) => i.id !== item.id), item],
        })),
    remove: (id) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),
    clear: () => set({ items: [] }),
}));

