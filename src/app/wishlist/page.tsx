'use client'
import { useWishlist } from '@/store/wishlist'
import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon, XIcon } from 'lucide-react'

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">


                {wishlist.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="absolute top-2 right-2 z-10 flex space-x-1">
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="bg-white p-1 rounded-full hover:bg-red-50 transition"
                                    >
                                        <XIcon className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>

                                {item.image ? (
                                    <div className="relative h-48 w-full bg-gray-50">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                        <HeartIcon className="w-12 h-12 text-gray-300" />
                                    </div>
                                )}

                                <div className="p-4 flex flex-col justify-between h-40">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-blue-600 font-bold">${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <HeartIcon className="mx-auto mb-4 w-16 h-16 text-gray-300" />
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Your wishlist is empty
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Browse our catalog and add your favorite books to your wishlist.
                        </p>
                        <Link
                            href="/explore"
                            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
                        >
                            Explore Books
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
