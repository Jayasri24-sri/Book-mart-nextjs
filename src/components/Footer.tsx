export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-10  ">
            <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between md:items-center">
                {/* Left Section: Brand & Copyright */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-xl font-bold text-white mb-2">BookMart</h2>
                    <p className="text-sm">&copy; 2025 BookMart. All rights reserved.</p>
                </div>

                {/* Middle Section: Useful Links */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Explore</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="/explore" className="hover:text-blue-600 transition-colors">Browse Books</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-blue-600 transition-colors">About Us</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Right Section: Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>


                    <div className="flex space-x-4 mt-6">
                        {/* Social icons */}
                        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 12a10 10 0 10-11.62 9.87v-6.98h-2.83v-2.89h2.83v-2.2c0-2.8 1.66-4.35 4.2-4.35 1.22 0 2.5.22 2.5.22v2.75h-1.4c-1.38 0-1.81.87-1.81 1.77v2.01h3.08l-.49 2.89h-2.59v6.98A10 10 0 0022 12z" />
                            </svg>
                        </a>

                        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14.86 5.48 5.48 0 002.4-3.04 10.7 10.7 0 01-3.45 1.32A5.42 5.42 0 0016.67 2c-3 0-5.42 2.42-5.42 5.42 0 .42.05.82.14 1.21A15.4 15.4 0 013 4.15a5.42 5.42 0 001.68 7.24 5.41 5.41 0 01-2.45-.68v.07c0 2.64 1.87 4.84 4.34 5.34a5.43 5.43 0 01-2.44.09c.69 2.14 2.7 3.7 5.08 3.75A10.87 10.87 0 013 21.54 15.37 15.37 0 008.29 23c9.14 0 14.13-7.58 14.13-14.13 0-.22 0-.43-.02-.64A10.07 10.07 0 0023 3z" />
                            </svg>
                        </a>

                        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 2h8.5a3.75 3.75 0 013.75 3.75v8.5a3.75 3.75 0 01-3.75 3.75h-8.5a3.75 3.75 0 01-3.75-3.75v-8.5A3.75 3.75 0 017.75 4zm8.88 2.88a1.12 1.12 0 11-2.25 0 1.12 1.12 0 012.25 0zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
