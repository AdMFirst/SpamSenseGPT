import Link from "next/link";
import React from "react";
import 'tailwindcss/tailwind.css';
import { Ysabeau } from "next/font/google"

const fontY = Ysabeau({subsets: ['latin']});

const Navbar = () => {
    return (
        <div className=" z-50 sticky top-0">
            <header className="bg-[#5FCFFF] z-50 text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-1 md:mb-0">
                        <h1 className={"text-2xl "+ fontY.className}> SpamSenseGPT</h1>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-gray-800 text-center">
                        <Link href={"/"} className="mx-2 hover:underline">Home</Link>
                        <Link href={"/about"} className="mx-2 hover:underline ">About Us</Link>
                        <Link href={"/pricing"} className="mx-2 hover:underline ">Pricing</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}
export default Navbar