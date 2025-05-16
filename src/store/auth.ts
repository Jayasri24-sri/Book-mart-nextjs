// store/auth.ts
import { create } from 'zustand'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

type AuthStore = {
    user: User | null
    loading: boolean
    logout: () => Promise<void>
}

export const useAuth = create<AuthStore>((set) => {
    // Listen to auth state changes
    onAuthStateChanged(auth, (user) => {
        set({ user, loading: false })
    })

    return {
        user: null,
        loading: true,
        logout: async () => {
            await signOut(auth)
            set({ user: null })
        }
    }
})
