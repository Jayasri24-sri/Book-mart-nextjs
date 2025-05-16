import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'BookMart',
    description: 'Buy and sell books online',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white shadow">
            <Header/>
        </div>

        {/* Main Content */}
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {children}
        </main>

        {/* Footer */}
        <Footer/>
        </body>
        </html>
    )
}
