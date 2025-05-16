import books from '@/lib/books.json';
import BookCard from '@/components/BookCard';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
                    📚 Explore Our Book Collection
                </h1>


                <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
                    Discover a curated selection of books across genres—whether your into
                    thrilling mysteries, inspiring biographies, or timeless classics, we have something for every
                    reader.
                    Dive in and find your next favorite read today.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book}/>
                    ))}
                </div>
            </div>
        </div>
    );
}