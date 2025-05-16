'use client'
import { useState } from 'react'

export default function BookForm() {
    const [title, setTitle] = useState('')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`Book Added: ${title}`)
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" className="border px-2 py-1 w-full" />
            <button type="submit" className="bg-primary text-white px-4 py-1 rounded">Add Book</button>
        </form>
    )
}