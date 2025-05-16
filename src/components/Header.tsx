'use client'
import Link from 'next/link'
import { useCart } from '@/store/cart'
import { useAuth } from '@/store/auth'
import { useRouter } from 'next/navigation'

export default function Header() {
    const { items } = useCart()
    const { user, logout } = useAuth()
    const router = useRouter()

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

    const handleLogout = async () => {
        await logout()
        router.push('/login')
    }

    return (
        <header className="bg-blue-600 sticky top-0 z-50 shadow px-4 py-3 flex justify-between items-center text-white">
            <Link href="/" className="text-xl font-bold">📚 BookMart</Link>
            <nav className="space-x-6">
                {user ? (
                    <>
                        <Link href="/cart" className="relative">
                            Cart
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                        <Link href="/profile">Profile</Link>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}


