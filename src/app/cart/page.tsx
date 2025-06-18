'use client'
import { useCart } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
    const { items, remove, clear } = useCart()
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        mobile: '',
        address: '',
        paymentMethod: 'cod',
    })
    const router = useRouter()

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setOrderDetails((prev) => ({ ...prev, [name]: value }))
    }

    const handleOrderSubmit = (e: FormEvent) => {
        e.preventDefault()
        setOrderPlaced(true)
        clear()
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h1>

                {orderPlaced ? (
                    <div className="bg-green-100 border border-green-300 p-6 rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-green-700">Order placed successfully!</h2>
                        <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
                        <button
                            onClick={() => router.push('/explore')}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Continue Purchasing
                        </button>
                    </div>
                ) : (
                    <>
                        {items.length > 0 ? (
                            <>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                            <div className="flex items-center space-x-4">
                                                {item.image && (
                                                    <div className="relative w-20 h-20">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            fill
                                                            className="object-contain rounded"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                                                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                                    <p className="text-blue-600 font-semibold">${item.price}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => remove(item.id)}
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-between items-center">
                                    <p className="text-xl font-bold text-gray-800">
                                        Total: ${totalPrice.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => setShowOrderForm(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Order Now
                                    </button>
                                </div>

                                {showOrderForm && (
                                    <div className="relative mt-6 bg-gray-100 p-6 rounded-lg space-y-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowOrderForm(false)}
                                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                                            aria-label="Close"
                                        >
                                            &times;
                                        </button>

                                        <form onSubmit={handleOrderSubmit} className="space-y-4">
                                            <h2 className="text-xl font-semibold text-gray-700">Enter Your Details</h2>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={orderDetails.name}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    required
                                                    value={orderDetails.mobile}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                                <textarea
                                                    name="address"
                                                    required
                                                    value={orderDetails.address}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                                <div className="space-y-2">
                                                    {['cod', 'credit', 'upi'].map((method) => (
                                                        <label key={method} className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                name="paymentMethod"
                                                                value={method}
                                                                checked={orderDetails.paymentMethod === method}
                                                                onChange={handleChange}
                                                            />
                                                            <span className="capitalize">{method}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Place Order
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800">Your cart is empty</h3>
                                <p className="text-gray-600 mt-2">Add some books to your cart.</p>
                                <Link href="/explore" className="mt-4 inline-block text-blue-500 hover:underline text-sm">
                                    Browse Books
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
