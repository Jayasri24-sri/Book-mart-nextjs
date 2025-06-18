import React from 'react'
import { BookOpen, Users, CheckCircle } from 'lucide-react'

const About: React.FC = () => {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
            <div className="text-center mb-12">
                <BookOpen className="mx-auto h-12 w-12 text-blue-600 mb-3" />
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                    About <span className="text-blue-600">BookMart</span>
                </h1>
                <p className="mt-3 text-lg text-gray-500">
                    Your one-stop destination for book lovers.
                </p>
            </div>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                    At <strong>BookMart</strong>, our mission is to connect readers with the books they love.
                    We believe in the power of stories to inspire, educate, and entertain. Our platform offers
                    a vast collection of books across genres and authors — making it easier than ever to discover
                    your next favorite read.
                </p>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Users className="text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Who We Are</h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                    <strong>BookMart</strong> was founded by passionate book lovers and tech enthusiasts who
                    wanted to create a seamless online experience for book discovery and shopping. We combine
                    technology with our love for literature to offer an intuitive, user-friendly platform tailored
                    to your reading preferences.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="text-yellow-500" />
                    <h2 className="text-2xl font-bold text-gray-800">Why Choose Us?</h2>
                </div>
                <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-2">
                    <li>📚 Wide selection of books from bestsellers to hidden gems</li>
                    <li>🤖 Personalized recommendations based on your reading history</li>
                    <li>🛒 Easy and secure checkout process</li>
                    <li>🚚 Fast delivery and responsive customer support</li>
                </ul>
            </section>
        </main>
    )
}

export default About
