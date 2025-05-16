import Link from "next/link";

export default function SubHeader(){
    return(
        <>
            <header
                className="bg-blue-600 sticky top-0 z-50 shadow px-4 py-3 flex justify-between items-center text-white">
                <Link href="/" className="text-xl font-bold">HIIII</Link>
            </header>
        </>
    )
}