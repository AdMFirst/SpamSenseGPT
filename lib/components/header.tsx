import Link from "next/link";
import React from "react";
import { Ysabeau } from "next/font/google"

const fontY = Ysabeau({subsets: ['latin']});

const Header: React.FC = () => {

    return (
    <div className="relative z-10">
        <header className="header-container fixed flex items-center w-full justify-between px-4 md:px-12 py-3 bg-blue-300 text-black">
            <div className="logo">
                <h1 className={"text-2xl "+ fontY.className}> SpamSenseGPT</h1>
            </div>
            <nav className="head ">
                <ul className="flex space-x-5 md:space-x-12">
                <li>
                    <Link href="/" className='lg:text-[23px] md:text-[19px] text-[10px] text-base hover:underline'>Home</Link>
                </li>
                <li>
                    <Link href="/about" className='lg:text-[23px] md:text-[19px] text-[10px] text-base hover:underline'>About Us</Link>
                </li>
                <li>
                    <Link href="/pricing" className='lg:text-[23px] md:text-[19px] text-[10px] text-base hover:underline'>Pricing</Link>
                </li>
                </ul>
            </nav>
        </header>
        </div>
    )
}

export default Header