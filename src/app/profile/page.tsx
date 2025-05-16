'use client'
import { useState } from 'react'
import { useAuth } from '@/store/auth'
import { useWishlist } from '@/store/wishlist'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
    const { user } = useAuth()
    const { wishlist } = useWishlist() // Get wishlist from store
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState(user?.name || 'John Doe')
    const [email, setEmail] = useState(user?.email || 'johndoe@example.com')

    const toggleEdit = () => setShowEdit(!showEdit)

    const handleSave = () => {
        // TODO: Add logic to update user info via backend/store
        console.log('Updated Name:', name)
        console.log('Updated Email:', email)
        toggleEdit()
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
                {/* Profile Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
                    <p className="text-gray-600 mt-2">Welcome back, {name}! Manage your account, order history, and wishlist.</p>
                </div>

                {/* Profile Info Section */}
                <div className="flex justify-between items-center border-b pb-6 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
                        <p className="text-gray-600">Name: {name}</p>
                        <p className="text-gray-600">Email: {email}</p>
                    </div>
                    <button
                        onClick={toggleEdit}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Order History Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Order History</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">No orders yet</h3>
                        <p className="text-gray-600 mt-2">Once you make a purchase, it will appear here.</p>
                    </div>
                </div>

                {/* Wishlist Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Wishlist</h2>
                    {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {wishlist.map((item) => (
                                <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    {item.image && (
                                        <div className="relative h-40 mb-3">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain rounded"
                                            />
                                        </div>
                                    )}
                                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                                    <p className="text-blue-600 font-semibold mt-1">${item.price}</p>
                                    <Link
                                        href={`/book/${item.id}`} // Adjust this to match your routing
                                        className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800">No items in your wishlist</h3>
                            <p className="text-gray-600 mt-2">Add books to your wishlist and they will appear here.</p>
                        </div>
                    )}
                </div>

                {/* Edit Sidebar (keep existing implementation) */}
                {showEdit && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
                        <div className="w-full max-w-md bg-white h-full p-6 shadow-lg overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                                <button
                                    onClick={toggleEdit}
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full text-black mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full text-black mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        onClick={toggleEdit}
                                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    // ... keep your existing edit sidebar code
                )}
            </div>
        </div>
    )
}
