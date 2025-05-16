// 'use client'
//
// import { useState } from 'react'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/lib/firebase'
// import { useRouter } from 'next/navigation'
//
// export default function RegisterPage() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [error, setError] = useState('')
//     const router = useRouter()
//
//     const handleRegister = async () => {
//         setError('')
//         if (password !== confirmPassword) {
//             setError("Passwords do not match")
//             return
//         }
//
//         try {
//             await createUserWithEmailAndPassword(auth, email, password)
//             router.push('/')
//         } catch (err: any) {
//             setError(err.message)
//         }
//     }
//
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
//             <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
//                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Create an Account</h1>
//
//                 {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
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
//                     className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={e => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm Password"
//                     className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//
//                 <button
//                     onClick={handleRegister}
//                     className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                     Register
//                 </button>
//
//                 <p className="text-center mt-4 text-sm text-gray-600">
//                     Already have an account?{' '}
//                     <a href="/login" className="text-blue-600 hover:underline">Login</a>
//                 </p>
//             </div>
//         </div>
//     )
// }

"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword, sendEmailVerification
} from "@firebase/auth";
import {auth} from "@/lib/firebase";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            // Temporarily store user data in local storage
            localStorage.setItem("registrationData", JSON.stringify({
                firstName,
                lastName,
                gender,
                email,
            }));
            setMessage("Registration successful! Please check your email for verification");
            // Clear form fields
            setFirstName("");
            setLastName("");
            setGender("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col relative">
            <h2 className="text-2xl font-bold text-center mb-10">Register</h2>
            <div className="p-5 border border-gray-300 rounded">
                <form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName"
                                   className="text-sm font-medium block mb-2 text-gray-300">
                                First Name
                            </label>
                            <input type="text"
                                   id="firstName"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   required
                                   className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blur-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName"
                                   className="text-sm font-medium block mb-2 text-gray-300">
                                Last Name
                            </label>
                            <input type="text"
                                   id="lastName"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   required
                                   className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blur-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gender"
                               className="text-sm font-medium block mb-2 text-gray-300">
                            Gender
                        </label>
                        <select id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                                className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blur-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="text-sm font-medium block mb-2 text-gray-300">
                            Email
                        </label>
                        <input type="email"
                               id="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                               className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blur-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="password"
                                   className="text-sm font-medium block mb-2 text-gray-300">
                                Password
                            </label>
                            <input type="password"
                                   id="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                   className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blur-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="confirmPassword"
                                   className="text-sm font-medium block mb-2 text-gray-300">
                                Confirm Password
                            </label>
                            <input type="password"
                                   id="confirmPassword"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   required
                                   className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blur-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
