'use client'

import { useState } from 'react'
import books from '@/lib/books.json'
import stationery from '@/lib/stationery.json'
import colors from '@/lib/colors.json'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlist } from '@/store/wishlist'
import { useCart } from '@/store/cart'

const categoryMap = {
    All: [...books, ...stationery, ...colors],
    Books: books,
    Stationery: stationery,
    Colors: colors,
}

const categories = Object.keys(categoryMap)

const sortOptions = [
    { label: 'Relevance', value: 'default' },
    { label: 'Price: Low to High', value: 'priceLowHigh' },
    { label: 'Price: High to Low', value: 'priceHighLow' },
    { label: 'Rating: Low to High', value: 'ratingLowHigh' },
    { label: 'Rating: High to Low', value: 'ratingHighLow' },
]

export default function ExplorePage() {
    const [selected, setSelected] = useState('All')
    const [sortBy, setSortBy] = useState('default')

    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    } = useWishlist()

    const {
        items: cartItems,
        add: addToCart,
        remove: removeFromCart,
    } = useCart()

    // Clone and sort items based on selected filter
    let items = [...categoryMap[selected]]

    switch (sortBy) {
        case 'priceLowHigh':
            items.sort((a, b) => a.price - b.price)
            break
        case 'priceHighLow':
            items.sort((a, b) => b.price - a.price)
            break
        case 'ratingLowHigh':
            items.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0))
            break
        case 'ratingHighLow':
            items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
            break
        default:
            break
    }

    const toggleWishlist = (item) => {
        if (isInWishlist(item.id)) {
            removeFromWishlist(item.id)
        } else {
            addToWishlist({
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
            })
        }
    }

    const addItemToCart = (item) => {
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: 1,
            image: item.image,
        })
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Filter by Category</h2>
                <ul className="space-y-3">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <button
                                onClick={() => setSelected(cat)}
                                className={`w-full text-left px-4 py-2 rounded-lg ${
                                    selected === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {selected === 'All' ? 'All Items' : `${selected} Items`}
                    </h1>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
                            Sort by:
                        </label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item) => {
                        const inWishlist = isInWishlist(item.id)
                        const inCart = cartItems.some((ci) => ci.id === item.id)

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <Link href={`/explore/${item.slug}`}>
                                    <div className="relative w-full h-60 cursor-pointer">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    </div>
                                </Link>

                                <div className="px-4 py-3">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                    {item.author && (
                                        <p className="text-sm text-gray-600">{item.author}</p>
                                    )}
                                    <p className="mt-2 text-blue-600 font-semibold">${item.price}</p>
                                    <p className="text-yellow-500 text-sm mb-3">⭐ {item.rating}</p>

                                    <button
                                        onClick={() => toggleWishlist(item)}
                                        className={`px-3 py-1 text-sm rounded-lg text-white transition ${
                                            inWishlist
                                                ? 'bg-gray-600 hover:bg-gray-700'
                                                : 'bg-pink-500 hover:bg-pink-600'
                                        }`}
                                    >
                                        {inWishlist ? '🗑️ from Wishlist' : 'Add to Wishlist'}
                                    </button>

                                    {inCart ? (
                                        <Link href="/cart" passHref>
                                            <button
                                                className="ml-2 px-3 py-1 text-sm rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                                            >
                                                View Cart
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => addItemToCart(item)}
                                            className="ml-2 px-3 py-1 text-sm rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
                                        >
                                            Add to Cart
                                        </button>
                                    )}

                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
