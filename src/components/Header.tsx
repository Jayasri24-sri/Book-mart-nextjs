'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/store/cart'
import { useWishlist } from '@/store/wishlist'
import { useAuth } from '@/store/auth'
import { useRouter } from 'next/navigation'

export default function Header() {
    const { items } = useCart()
    const { wishlist } = useWishlist()
    const { user, logout } = useAuth()
    const router = useRouter()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const wishlistCount = wishlist.length

    const handleLogout = async () => {
        await logout()
        router.push('/login')
        setDropdownOpen(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className="bg-blue-600 sticky top-0 z-50 shadow px-4 py-3 flex justify-between items-center text-white">
            <Link href="/" className="text-xl font-bold">
                📚 BookMart
            </Link>
            <nav className="space-x-6 relative flex items-center">
                {user ? (
                    <>
                        {/* Wishlist */}
                        <Link href="/wishlist" className="relative group text-2xl">
                            💟
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-5 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-0.5 rounded shadow transition duration-300 whitespace-nowrap">
                                Wishlist
                            </span>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative group text-2xl">
                            🛒
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-0.5 rounded shadow transition duration-300 whitespace-nowrap">
                                Add to Cart
                            </span>
                        </Link>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-2xl focus:outline-none"
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                                aria-label="User profile menu"
                            >
                                👤
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg py-3 z-50" role="menu">
                                    <div className="flex justify-between items-center px-4 pb-2 border-b">
                                        <h3 className="text-lg font-semibold">Profile</h3>
                                        <button
                                            onClick={() => setDropdownOpen(false)}
                                            aria-label="Close dropdown"
                                            className="text-gray-600 hover:text-gray-900 text-xl font-bold leading-none"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="px-4 py-3 space-y-2">
                                        <div>
                                            <span className="font-semibold">Username: </span>
                                            <span>{user.name}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Email: </span>
                                            <span className="break-all">{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-left py-2 mt-2"
                        >
                            Logout
                        </button>
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
