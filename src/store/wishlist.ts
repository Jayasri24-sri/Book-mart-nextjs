// // store/wishlist.ts
// import { create } from 'zustand';
//
// interface WishlistItem {
//     id: number;
//     title: string;
//     price: number;
// }
//
// interface WishlistState {
//     items: WishlistItem[];
//     addToWishlist: (item: WishlistItem) => void;
//     removeFromWishlist: (id: number) => void;
//     isInWishlist: (id: number) => boolean;
// }
//
// export const useWishlist = create<WishlistState>((set, get) => ({
//     items: [],
//     addToWishlist: (item) =>
//         set((state) =>
//             get().isInWishlist(item.id) ? state : { items: [...state.items, item] }
//         ),
//     removeFromWishlist: (id) =>
//         set((state) => ({
//             items: state.items.filter((item) => item.id !== id),
//         })),
//     isInWishlist: (id) => get().items.some((item) => item.id === id),
// }));

// @/store/wishlist.ts
import { create } from 'zustand'

type WishlistItem = {
    id: string
    title: string
    price: number
    image?: string // Add this if you want to display images in profile
}

type WishlistState = {
    wishlist: WishlistItem[]
    addToWishlist: (item: WishlistItem) => void
    removeFromWishlist: (id: string) => void
    isInWishlist: (id: string) => boolean
}

export const useWishlist = create<WishlistState>((set, get) => ({
    wishlist: [],
    addToWishlist: (item) =>
        set((state) => ({
            wishlist: [...state.wishlist, item]
        })),
    removeFromWishlist: (id) =>
        set((state) => ({
            wishlist: state.wishlist.filter(item => item.id !== id)
        })),
    isInWishlist: (id) =>
        get().wishlist.some(item => item.id === id)
}))
