import Link from "next/link";
import React from "react";
import 'tailwindcss/tailwind.css';

const Navbar = () => {
    return (
        <div className="bg-blue-500 z-50 sticky top-0">
            <header className="bg-blue-500 z-50 text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="w-56 text-center text-black text-2xl font-normal">SpamSenseGPT</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link href={"/#home"} className="mr-5 hover:text-blue-900">Home</Link>
                        <Link href={"/#about"} className="mr-5 hover:text-blue-900">About Us</Link>
                        <Link href={"/#pricing"} className="mr-5 hover:text-blue-900">Pricing</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}
export default Navbar