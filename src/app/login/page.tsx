// 'use client'
// import { useState } from 'react'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/lib/firebase'
// import { useRouter } from 'next/navigation'
//
// export default function LoginPage() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState('')
//     const router = useRouter()
//
//     const handleLogin = async () => {
//         setError('')
//         try {
//             await signInWithEmailAndPassword(auth, email, password)
//             router.push('/')
//         } catch (err: any) {
//             setError('Invalid email or password')
//         }
//     }
//
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
//             <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
//                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome Back</h1>
//
//                 {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
//
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     placeholder="Email"
//                     className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     placeholder="Password"
//                     className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//
//                 <button
//                     onClick={handleLogin}
//                     className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Login
//                 </button>
//
//                 <p className="text-center mt-4 text-sm text-gray-600">
//                     Don't have an account?{' '}
//                     <a href="/register" className="text-blue-600 hover:underline">Register</a>
//                 </p>
//             </div>
//         </div>
//     )
// }
//

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import Link from "next/link";
import {auth,firestore, googleProvider} from "@/lib/firebase";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                const registrationData = localStorage.getItem("registrationData");
                const { firstName = "", lastName = "", gender = "" } = registrationData ? JSON.parse(registrationData) : {};

                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (!userDoc.exists()) {
                    await setDoc(doc(firestore, "users", user.uid), {
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });
                }

                router.push("/");
            } else {
                setError("Please verify your email before logging in.");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(firestore, "users", user.uid), {
                    firstName: user.displayName?.split(" ")[0] || "",
                    lastName: user.displayName?.split(" ")[1] || "",
                    gender: "", // Optional, or fetch later
                    email: user.email,
                });
            }

            router.push("/");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Google Sign-In failed");
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col">
            <h2 className="text-4xl font-medium text-white mb-10">Login</h2>
            <div className="p-5 border border-gray-300 rounded">
                <form onSubmit={handleLogin} className="space-y-6 px-6 pb-4">
                    <div className="mb-15">
                        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                               className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                               className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
                        Login
                    </button>
                </form>

                <div className="text-center my-4">
                    <p className="text-white mb-2">OR</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center py-2 px-4 border border-gray-400 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600">
                        Sign in with Google
                    </button>
                </div>

                <p className="text-sm font-medium text-gray-300 text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-700 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
