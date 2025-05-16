import Image from 'next/image'
import Link from 'next/link'
import { Book } from '@/lib/types'

export default function BookCard({ book }: { book: Book }) {
    return (
        <Link
            href={`/book/${book.slug}`}
            className="block bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition duration-300"
        >
            <Image
                src={book.image}
                alt={book.title}
                width={200}
                height={300}
                className="mx-auto rounded-xl object-cover"
            />
            <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="mt-1 text-blue-600 font-bold">${book.price}</p>
            </div>


        </Link>


    )
}
