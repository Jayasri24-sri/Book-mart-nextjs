// app/page.tsx or wherever your HomePage is
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css'
import 'swiper/css/pagination'

export default function HomePage() {
    return (
        <div className="relative min-h-screen">
            {/* Carousel */}
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                className="w-full h-screen"
            >
                {[1, 2, 3].map((i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-screen">
                            <Image
                                src={`/banners/banner${i}.webp`}
                                alt={`Slide ${i}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay + Explore Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white z-10">
                <h1 className="text-4xl font-bold mb-4 text-center">
                    Welcome to Our Bookstore 📚
                </h1>
                <p className="max-w-xl text-center mb-6 text-lg">
                    Explore our collection of handpicked titles and discover your next favorite read.
                </p>
                <Link
                    href="/explore"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold"
                >
                    Explore Books
                </Link>
            </div>
        </div>
    )
}
