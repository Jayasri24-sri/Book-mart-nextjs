'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Loader2, CheckCircle } from 'lucide-react'

const SERVICE_ID = 'your_service_id'
const TEMPLATE_ID = 'your_template_id'
const PUBLIC_KEY = 'your_public_key'

const Contact: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
            .then(() => {
                setSubmitted(true)
                setForm({ name: '', email: '', message: '' })
            })
            .catch((error) => {
                console.error('EmailJS error:', error)
                alert('Something went wrong. Please try again.')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full">
                <div className="text-center mb-8">
                    <Mail className="mx-auto mb-2 h-10 w-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
                    <p className="text-gray-500 mt-1">We’d love to hear from you</p>
                </div>

                {submitted ? (
                    <div className="flex items-center justify-center flex-col gap-3 text-green-600 text-center">
                        <CheckCircle className="h-10 w-10" />
                        <p className="text-lg font-semibold">Message sent successfully!</p>
                        <p className="text-sm text-gray-600">We'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2 outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2 outline-none"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2 outline-none resize-none"
                                placeholder="Write your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </main>
    )
}

export default Contact
