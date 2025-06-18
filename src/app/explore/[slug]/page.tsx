'use client'

import books from '@/lib/books.json'
import stationery from '@/lib/stationery.json'
import colors from '@/lib/colors.json'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState } from 'react'

const allItems = [...books, ...stationery, ...colors]

export default function ItemDetail({ params }: { params: { slug: string } }) {
    const item = allItems.find((i) => i.slug === params.slug)

    if (!item) return notFound()

    const [inCart, setInCart] = useState(false)
    const [inWishlist, setInWishlist] = useState(false)

    const handleCartToggle = () => setInCart(prev => !prev)
    const handleWishlistToggle = () => setInWishlist(prev => !prev)

    const suggestions = allItems
        .filter(i => i.genre === item.genre && i.slug !== item.slug)
        .slice(0, 3)

    return (
        <div className="min-h-screen p-10 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden relative">
                <Link
                    href="/explore"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    title="Close"
                >
                    ×
                </Link>
                <div className="md:flex">
                    <div className="md:w-1/2 relative h-96">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.title}</h1>
                        {item.author && (
                            <p className="text-gray-600 mb-1">By {item.author}</p>
                        )}
                        <p className="text-gray-600 mb-2">{item.genre}</p>
                        <p className="text-yellow-500 text-sm mb-2">⭐ {item.rating}</p>
                        <p className="text-lg text-blue-600 font-semibold mb-2">${item.price}</p>
                        <p className="text-green-600 font-medium mb-4">In Stock – Ships in 2 days</p>
                        <p className="text-gray-700 mb-6">{item.description}</p>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={handleCartToggle}
                                className={`px-4 py-2 rounded-lg transition text-white ${
                                    inCart ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {inCart ? 'Remove from Cart' : 'Add to Cart'}
                            </button>

                            <button
                                onClick={handleWishlistToggle}
                                className={`px-4 py-2 rounded-lg transition text-white ${
                                    inWishlist ? 'bg-gray-600 hover:bg-gray-700' : 'bg-pink-500 hover:bg-pink-600'
                                }`}
                            >
                                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>

                        {/* Reviews */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">User Reviews:</h2>
                            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                                <li>"Amazing product quality!"</li>
                                <li>"Worth the price. Fast delivery too."</li>
                                <li>"Highly recommended for everyday use."</li>
                            </ul>
                        </div>

                        {/* Share Buttons */}
                        <div className="mb-6">
                            <h2 className="text-sm text-gray-500 mb-2">Share this item :</h2>
                            <div className="flex space-x-4 text-sm">
                                <button className="text-blue-600 hover:underline">Facebook</button>
                                <button className="text-blue-600 hover:underline">Twitter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
