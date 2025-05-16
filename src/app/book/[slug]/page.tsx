'use client'
import books from '@/lib/books.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/store/cart'
import { useWishlist } from '@/store/wishlist'

export default function BookDetail({ params }: { params: { slug: string } }) {
    const book = books.find((b) => b.slug === params.slug)
    const { add } = useCart()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const inWishlist = isInWishlist(book?.id || '')

    if (!book) return notFound()

    const handleAddToCart = () => {
        add({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1,
            // image: book.image
        })
    }

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(book.id)
        } else {
            addToWishlist({
                id: book.id,
                title: book.title,
                price: book.price,
                image: book.image,
                // slug: book.slug
            })
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center grid md:grid-cols-2 gap-8 p-6 bg-white rounded-xl shadow-lg">
            {/* Go back link */}
            <Link
                href="/"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold transition duration-200"
                aria-label="Close"
            >
                &times;
            </Link>

            {/* Book cover */}
            <div className="w-full h-auto flex justify-center">
                <Image
                    src={book.image}
                    alt={book.title}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-md object-cover"
                    priority
                />
            </div>

            {/* Book details */}
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
                <p className="text-lg text-gray-600 mb-2 italic">By {book.author}</p>
                <p className="text-2xl font-semibold text-blue-600 mb-6">${book.price}</p>

                <p className="text-gray-700 text-base leading-relaxed mb-6">
                    {book.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleAddToCart}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={handleWishlistToggle}
                        className={`px-6 py-3 rounded-lg transition duration-200 ${
                            inWishlist
                                ? 'bg-red-100 text-red-600 border border-red-400 hover:bg-red-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    )
}
